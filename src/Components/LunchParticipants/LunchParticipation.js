/**
 * Cet élément est créé après un clic sur une date.
 * Affiche un formulaire d'inscription au co-lunch si la date n'est pas passée.
 * Autrement affiche le choix du coworker ; le restaurant choisié
 */
import fetch from "node-fetch";
import { useEffect, useState } from "react";

import DisplayPastParticipationStatus from "./DisplayParticipationStatus";

const { setDisplayedLongDate, isUpcomingDate } = require("../../utils/dates");

function LunchParticipation({ user, selectedLunchDate }) {
    const [checked, setChecked] = useState(false);
    const [updateErrorMessage, setUpdateErrorMessage] = useState("");

    useEffect(() => {
        fetchGetUserParticipation();
    }, [selectedLunchDate]);

    const displayedDate = setDisplayedLongDate(selectedLunchDate);
    const isUpcomingLunch = isUpcomingDate(selectedLunchDate);
    const updateErrorMessageDefault =
        "Nous n'avons pas pu traiter votre demande";

    function handleChange() {
        setChecked(!checked);
    }

    function handleClick(e) {
        e.preventDefault();
        if (checked) {
            fetchInscription();
        } else {
            fetchCancelInscription();
        }
    }

    async function fetchGetUserParticipation() {
        const response = await fetch(
            "/.netlify/functions/getCoworkerParticipation",
            {
                method: "POST",
                body: JSON.stringify({ user: user, date: selectedLunchDate }),
            }
        );
        const responseBody = await response.json();

        const isParticipant =
            responseBody.data.participants_list.values.length === 1;

        setChecked(isParticipant);
    }

    /**
     * Add coworker inscription in DB
     */
    async function fetchInscription() {
        const response = await fetch(
            "/.netlify/functions/registerCoworkerParticipation",
            {
                method: "POST",
                body: JSON.stringify({ date: selectedLunchDate, user: user }),
            }
        );
        const responseBody = await response.json();

        const result = responseBody.data.insertparticipants_list.applied;
        if (!result) {
            setChecked(true);
            setUpdateErrorMessage(updateErrorMessageDefault);
        }
    }

    /**
     * Remove coworker inscription in DB
     */
    async function fetchCancelInscription() {
        const response = await fetch(
            "/.netlify/functions/unregisterCoworkerParticipation",
            {
                method: "POST",
                body: JSON.stringify({ date: selectedLunchDate, user: user }),
            }
        );
        const responseBody = await response.json();

        const result = responseBody.data.deleteparticipants_list.applied;
        if (!result) {
            setChecked(true);
            setUpdateErrorMessage(updateErrorMessageDefault);
        }
    }

    return (
        <>
            {isUpcomingLunch ? (
                <form>
                    <label>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={handleChange}
                        />
                        Je participerai au colunch du {displayedDate}
                    </label>

                    <input
                        type="submit"
                        onClick={handleClick}
                        value="Valider"
                    />
                </form>
            ) : (
                <DisplayPastParticipationStatus
                    registered={checked}
                    displayedDate={displayedDate}
                />
            )}
            {updateErrorMessage ?? <div>{updateErrorMessage}</div>}
        </>
    );
}

export default LunchParticipation;
