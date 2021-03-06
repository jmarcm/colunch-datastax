import fetch from "node-fetch";
import { useEffect, useState } from "react";
import { setDisplayedLongDate } from "../../utils/dates";

function LunchParticipants({ selectedLunchDate }) {
    const [lunchParticipants, setLunchParticipants] = useState([]);

    const displayedDate = setDisplayedLongDate(selectedLunchDate);

    useEffect(() => {
        fetchLunchParticipants();
    }, [selectedLunchDate]);

    async function fetchLunchParticipants() {
        const response = await fetch(
            "/.netlify/functions/getLunchParticipants",
            {
                method: "POST",
                body: JSON.stringify({ selectedLunchDate: selectedLunchDate }),
            }
        );
        const responseBody = await response.json();

        const participants = responseBody.data.participants_list.values;
        console.log(participants);
        // function
        // const voters = votes[0].voters || [];

        // const participants = [];
        // for (const voter of voters) {
        //     const participant = {};

        //     voter.map((entry) => (participant[entry.key] = entry.value));

        //     participants.push(participant);
        // }

        setLunchParticipants(participants);
    }

    return (
        <div id="lunch-votes">
            <h2>Résultats des votes</h2>
            <div className="lunch-date">{displayedDate}</div>

            {lunchParticipants.length !== 0 && (
                <>
                    <h3>Liste des participants</h3>
                    <div className="participants">
                        <ol>
                            {lunchParticipants.map((participant, index) => (
                                <li key={index}>
                                    {participant.firstname} {participant.name}
                                </li>
                            ))}
                        </ol>
                    </div>
                </>
            )}
        </div>
    );
}

export default LunchParticipants;
