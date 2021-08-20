/**
 * Transforme le tableau des dates d'un array d'object à un array de strings
 * @param {array} rawDates Dates from BDD
 * @returns array
 */
function parseDates(rawDates) {
    const dates = [];

    for (var rawDate of rawDates) {
        dates.push(rawDate.date);
    }
    dates.sort();
    return dates;
}

module.exports = { parseDates };
