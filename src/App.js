import React, { useEffect, useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";

import "./App.css";

import Home from "./Pages/Home";
import Restaurants from "./Pages/Restaurants";
import Connexion from "./Pages/Connexion";
import Inscription from "./Pages/Inscription";
import Lunch from "./Pages/Lunch";
import Navbar from "./Components/NavBar/Navbar";

import { RestaurantsProvider } from "./contexts/RestaurantsContext";

const { sortArrayOfObjects } = require("./utils/objects");

function App() {
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || null
    );

    const [restaurants, setRestaurants] = useState([]);
    console.log(restaurants);
    useEffect(() => {
        sessionStorage.setItem("user", JSON.stringify(user));
        // fetchGetAllRestaurants();
    }, [user]);

    function connectUser(userData) {
        if (userData.length === 1) {
            // on récupère toutes les infos de l'utiliateur
            const coworker = userData[0];

            getCoworkerData(coworker);
        }
    }

    function updateUser(user) {
        setUser(user);
        if (user === null) {
            <Redirect to="/" push={true} />;
        }
    }

    async function getCoworkerData(user) {
        const response = await fetch("/.netlify/functions/getCoworker", {
            method: "POST",
            body: JSON.stringify({
                firstname: user.firstname,
                name: user.name,
            }),
        });
        const responseBody = await response.json();

        const userData = responseBody.data.coworker_list.values[0];

        setUser(userData);
    }

    // async function fetchGetAllRestaurants() {
    //     const response = await fetch("/.netlify/functions/getAllRestaurants");

    //     const responseBody = await response.json();

    //     const allRestaurants = sortArrayOfObjects(
    //         responseBody.data.restaurant_list.values
    //     );
    //     setRestaurants(allRestaurants);
    // }

    return (
        <RestaurantsProvider value={[restaurants, setRestaurants]}>
            <HashRouter>
                <Navbar user={user} updateUser={updateUser} />
                <Switch>
                    <Route
                        path="/restaurant"
                        render={(props) => (
                            <Restaurants {...props} user={user} />
                        )}
                    />

                    <Route
                        path="/lunch"
                        render={(props) => (
                            <Lunch
                                {...props}
                                user={user}
                                // _fetchGetAllRestaurants={fetchGetAllRestaurants}
                            />
                        )}
                    />

                    <Route path="/connexion" component={Connexion} />
                    <Route path="/inscription" component={Inscription} />
                    <Route
                        path="/"
                        render={(props) => (
                            <Home
                                {...props}
                                user={user}
                                connectUser={connectUser}
                            />
                        )}
                    />
                </Switch>
            </HashRouter>
        </RestaurantsProvider>
    );
}

export default App;
