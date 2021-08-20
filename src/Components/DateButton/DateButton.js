import "./DateButton.css";

function DateButton({ lunchDate, onLunchDateClick }) {
    const rawDate = new Date(lunchDate);
    const options = {
        weekday: "short",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    const displayedDate = rawDate.toLocaleString("fr-FR", options);

    function handleClick(e) {
        onLunchDateClick(e.target.dataset.value);
    }

    return (
        <input
            type="button"
            onClick={handleClick}
            data-value={lunchDate}
            value={displayedDate}
        />
    );
}

export default DateButton;
