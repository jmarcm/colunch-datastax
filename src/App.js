import React, { useEffect, useState } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Redirect } from "react-router";

import "./App.css";

import Home from "./Pages/Home";
import Restaurant from "./Pages/Restaurant";
import Lunch from "./Pages/Lunch";
import Navbar from "./Components/NavBar/Navbar";

function App() {
    const [user, setUser] = useState(
        JSON.parse(sessionStorage.getItem("user")) || null
    );

    useEffect(() => {
        sessionStorage.setItem("user", JSON.stringify(user));
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

    return (
        <HashRouter>
            <Navbar user={user} updateUser={updateUser} />
            <Switch>
                <Route path="/restaurant" component={Restaurant} />

                <Route
                    path="/lunch"
                    render={(props) => <Lunch {...props} user={user} />}
                />

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
    );
}

export default App;
