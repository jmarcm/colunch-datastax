const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    const url = process.env.ASTRA_GRAPHQL_ENDPOINT;

    const body = JSON.parse(event.body);
    console.log(body);

    const login = JSON.stringify(body.login);
    const password = JSON.stringify(body.password);
    const firstname = JSON.stringify(body.firstname);
    const name = JSON.stringify(body.name);

    const query = `
        mutation registerCoworker {
            insertcoworker_password_list(
                value: {
                    login: ${login}
                    password: ${password}
                    firstname: ${firstname}
                    name: ${name}
                }
            ) {
                applied, value {firstname name}
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
