import { useState } from "react";
import "./Inscription.css";
import { SIGN_UP_SUCCESS_MSG, SIGN_UP_ERROR_MSG } from "../utils/messages";

import CryptoJs from "crypto-js";
import fetch from "node-fetch";

function Inscription() {
    const [firstname, setFirstName] = useState("");
    const [name, setName] = useState("");
    const [checkedVegetarien, setCheckedVegetarien] = useState(false);
    const [telephone, setTelephone] = useState("");
    const [adresse, setAdresse] = useState("");
    const [role, setRole] = useState("membre");

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        const encryptedPassword = CryptoJs.SHA1(password).toString();

        const fetchCoworkerCredentials = await fetch(
            "/.netlify/functions/registerCoworkerCredentials",
            {
                method: "POST",
                body: JSON.stringify({
                    login: login,
                    password: encryptedPassword,
                    firstname: firstname,
                    name: name,
                }),
            }
        );

        const responseBody = await fetchCoworkerCredentials.json();
        const resultSaveCredentials =
            responseBody.data.insertcoworker_password_list.applied;
        console.log(resultSaveCredentials);

        if (resultSaveCredentials) {
            const fetchCoworkerInfos = await fetch(
                "/.netlify/functions/registerCoworkerInfos",
                {
                    method: "POST",
                    body: JSON.stringify({
                        firstname: firstname,
                        name: name,
                        vegetarien: checkedVegetarien,
                        telephone: telephone,
                        adresse: adresse,
                        role: role,
                    }),
                }
            );

            const responseBody = await fetchCoworkerInfos.json();
            console.log(responseBody.data.insertcoworker_list.value);
            if (responseBody.data.insertcoworker_list.applied) {
                setMessage(SIGN_UP_SUCCESS_MSG);
            } else {
                setMessage(SIGN_UP_ERROR_MSG);
            }
        } else {
            setMessage(SIGN_UP_ERROR_MSG);
        }
    }

    return (
        <>
            <form className="inscription-form" onSubmit={handleSubmit}>
                <label>
                    Prénom
                    <input
                        type="text"
                        name="firstname"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>

                <label>
                    Nom
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>

                <label>
                    Vegetarien
                    <input
                        type="checkbox"
                        name="vegetarien"
                        checked={checkedVegetarien}
                        onChange={() =>
                            setCheckedVegetarien(!checkedVegetarien)
                        }
                    />
                </label>

                <label>
                    Adresse
                    <input
                        type="text"
                        name="adresse"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                    />
                </label>

                <label>
                    Téléphone
                    <input
                        type="text"
                        name="telephone"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                    />
                </label>

                <label>
                    Login
                    <input
                        type="text"
                        name="login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                </label>

                <label>
                    Mot de passe
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <label>
                    Role
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        disabled
                    >
                        <option value="membre">Membre</option>
                        <option value="admin">Administrateur</option>
                    </select>
                </label>

                <input type="submit" value="Valider" />
            </form>
            <p className="sign-up-message">{message}</p>
        </>
    );
}

export default Inscription;
