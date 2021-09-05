import fetch from "node-fetch";
import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";

import "./Lunch.css";

import DateButton from "../Components/DateButton/DateButton";
import SwitchLunchDisplay from "../Components/LunchParticipants/SwitchLunchDisplay";
import DisplayRestaurantsForVote from "../Components/DisplayRestaurantsForVote/DisplayRestaurantsForVote";
import { RestaurantsContext } from "../contexts/RestaurantsContext";

const { parseDates } = require("../utils/arrays");

function Lunch({ user }) {
    const [lunchDates, setLunchDates] = useState([]);
    const [selectedLunchDate, setSelectedLunchDate] = useState("");
    const [newDate, setNewDate] = useState("");
    const [restaurants] = useContext(RestaurantsContext);

    console.log("restaurants", restaurants);

    const [dateErrorMessage, setDateErrorMessage] = useState("");

    async function fetchLunchDates() {
        const response = await fetch("/.netlify/functions/getLunchDates");
        const responseBody = await response.json();
        const rawDates = responseBody.data.participant_list.values;

        const dates = parseDates(rawDates);
        setLunchDates(dates);
    }

    useEffect(() => {
        fetchLunchDates();
    }, []);

    async function addLunchDate() {
        const response = await fetch("/.netlify/functions/addLunchDate", {
            method: "POST",
            body: JSON.stringify({ newDate: newDate }),
        });

        const responseBody = await response.json();
        const result = responseBody.data.insertparticipant_list.applied;

        // Met à jour le tableau des dates
        if (result) {
            updateLunchDates();
        }

        setSelectedDate(newDate);
    }

    function setSelectedDate(selectedLunchDate) {
        setSelectedLunchDate(selectedLunchDate);
    }

    function updateLunchDates() {
        const found = lunchDates.includes(newDate);

        if (!found) {
            const updatedDates = [...lunchDates, newDate];
            updatedDates.sort();
            setLunchDates(updatedDates);
        }
    }

    function handleDateChange(e) {
        setNewDate(e.target.value);
    }

    function handleAddDateClick(e) {
        const inputDate = new Date(newDate);

        if (isNaN(inputDate.valueOf())) {
            setDateErrorMessage("La date n'est pas valide");
        } else {
            setDateErrorMessage("");
            // on ajoute la date dans la BDD
            addLunchDate(newDate);
        }
    }

    if (!user) {
        return <Redirect to="/" push={true} />;
    }

    return (
        <>
            <h1>Organisation des lunchs</h1>
            <div id="lunch-history">
                <h2>Historique des lunchs</h2>
                <div className="lunch-dates">
                    {lunchDates.map((lunchDate, index) => {
                        return (
                            <DateButton
                                key={index}
                                lunchDate={lunchDate}
                                _onLunchDateClick={setSelectedDate}
                            />
                        );
                    })}
                </div>
            </div>
            {user?.role === "admin" && (
                <div id="lunch-proposition">
                    <h2>Proposer un lunch</h2>
                    <input
                        type="text"
                        placeholder="Nouvelle date"
                        onChange={handleDateChange}
                        value={newDate}
                    />
                    <input
                        type="button"
                        onClick={handleAddDateClick}
                        value="Valider"
                    />
                    <p>Indiquer la date au format "aaaa-mm-jj"</p>
                    <p>{dateErrorMessage}</p>
                </div>
            )}
            {selectedLunchDate && (
                // affiche un formulaire pour indiquer la participation
                // ou la liste des participants
                <>
                    <SwitchLunchDisplay
                        user={user}
                        selectedLunchDate={selectedLunchDate}
                    />
                    <DisplayRestaurantsForVote />
                </>
            )}
        </>
    );
}

export default Lunch;
