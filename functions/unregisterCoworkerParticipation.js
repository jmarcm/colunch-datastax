const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    const url = process.env.ASTRA_GRAPHQL_ENDPOINT;

    const body = JSON.parse(event.body);
    console.log(body);

    const date = JSON.stringify(body.date);
    console.log(date);

    const user = body.user;

    const firstname = JSON.stringify(user.firstname);
    const name = JSON.stringify(user.name);
    const vegetarien = JSON.stringify(user.vegetarien);

    console.log(firstname);

    const query = `
    mutation unregisterCoworker {
        deleteparticipants_list(
            value: {
                date: ${date}
                firstname: ${firstname}
                name: ${name}
                vegetarien: ${vegetarien}
            }
            ifExists: true
        ) {
            value {
                date
                firstname
                name
            }
            applied
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
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify(e),
        };
    }
};
