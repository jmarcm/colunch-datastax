const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    const url = process.env.ASTRA_GRAPHQL_ENDPOINT;

    const body = JSON.parse(event.body);

    const user = body.user;
    const firstname = JSON.stringify(user.firstname);
    const name = JSON.stringify(user.name);

    const date = JSON.stringify(body.date);

    const query = `
    query getParticipants {
        participants_list(
            value: {
                date: ${date},
                firstname: ${firstname},
                name: ${name}
            }
        ) {
          values {
              date
              firstname
              name
              vegetarien
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
        console.log(e);
        return {
            statusCode: 500,
            body: JSON.stringify(e),
        };
    }
};
