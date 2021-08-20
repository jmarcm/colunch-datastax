function DisplayPastParticipationStatus({ registered, displayedDate }) {
    return registered ? (
        <>
            <i className="fas fa-smile"></i>
            <span>Je me suis inscrit au colunch du {displayedDate}</span>
        </>
    ) : (
        <>
            <i className="fas fa-sad-tear"></i>
            <span>Je ne me suis pas inscrit au colunch du {displayedDate}</span>
        </>
    );
}

export default DisplayPastParticipationStatus;
