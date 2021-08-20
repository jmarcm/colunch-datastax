const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    const url = process.env.ASTRA_GRAPHQL_ENDPOINT;

    const body = JSON.parse(event.body);
    console.log(body);

    const selectedLunchDate = JSON.stringify(body.selectedLunchDate);
    console.log(selectedLunchDate);

    const query = `
        query getParticipants {
            participant_list(value: {date: ${selectedLunchDate}}) {
                values {
                    date
                    voters{key, value}
                }
            }
        }
    `;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-cassandra-token": process.env.ASTRA_DB_APPLICATION_TOKEN,
        },
        body: JSON.stringify({ query }),
    });

    try {
        const responseBody = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(responseBody),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify(e),
        };
    }
};
