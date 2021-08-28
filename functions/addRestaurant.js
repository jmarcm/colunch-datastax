const fetch = require("node-fetch");

exports.handler = async function (event, context) {
    const url = process.env.ASTRA_GRAPHQL_ENDPOINT;

    const body = JSON.parse(event.body);
    console.log(body);

    const restaurantName = JSON.stringify(body.restaurantName);
    const hasMenuVegetarien = JSON.stringify(body.hasMenuVegetarien);
    const restaurantAddress = JSON.stringify(body.restaurantAddress);
    const restaurantTelephone = JSON.stringify(body.restaurantTelephone);
    const restaurantRating = Number(body.restaurantRating);
    const comment = JSON.stringify(body.comment);
    const proposedBy = JSON.stringify(body.proposedBy);
    const livraison = JSON.stringify(body.livraison);

    console.log(body.restaurantRating);
    console.log(restaurantRating);

    const query = `
        mutation insertRestaurants {
            insertrestaurant_list(
                value: {
                    name: ${restaurantName}
                    menu_vegetarien: ${hasMenuVegetarien}
                    adresse: ${restaurantAddress}
                    telephone: ${restaurantTelephone}
                    avis: ${restaurantRating}
                    commentaire: ${comment}
                    propose_par: ${proposedBy}
                    livraison: ${livraison}
                }
            ) {
                applied,
                value {
                    name
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
