function DisplayParticipants({ lunchParticipants }) {
    return (
        <>
            <h3>Liste des participants</h3>
            <div className="participants">
                {lunchParticipants.map((participant, index) => (
                    <p key={index}>{participant.firstname}</p>
                ))}
            </div>
        </>
    );
}

export default DisplayParticipants;
