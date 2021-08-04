import { useState } from "react";

import Navbar from "../Components/NavBar/Navbar";
import LoginForm from "../Components/LoginForm/LoginForm";

function Home() {
    const [user, setUser] = useState(null);

    function connectUser(userData) {
        if (userData.length === 1) {
            // on récupère toutes les infos de l'utiliateur
            const coworker = userData[0];

            getCoworkerData(coworker);
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
        <>
            <Navbar user={user} />
            <h1>Home</h1>
            <LoginForm connectUser={connectUser} />
            {user && (
                <div className="message">
                    <p>
                        Bienvenue {user.firstname} {user.name}
                    </p>
                    <p>Téléphone: {user.telephone}</p>
                </div>
            )}
        </>
    );
}

export default Home;
