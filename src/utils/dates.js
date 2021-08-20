function setDisplayedLongDate(date) {
    const rawDate = new Date(date);

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
    };

    return rawDate.toLocaleString("fr-FR", options);
}

/**
 * Compare deux dates
 * @param {string} selectedLunchDate
 * @returns boolean
 */
function isUpcomingDate(selectedLunchDate) {
    const now = new Date();
    const lunchDate = new Date(selectedLunchDate);

    if (now.getYear() > lunchDate.getYear()) {
        return false;
    }

    if (now.getMonth() > lunchDate.getMonth()) {
        return false;
    }

    if (now.getDate() > lunchDate.getDate()) {
        return false;
    }

    return true;
}

module.exports = { setDisplayedLongDate, isUpcomingDate };
