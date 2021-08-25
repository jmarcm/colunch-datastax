import { useState } from "react";
import LoginMessage from "./LoginMessage";
import CryptoJs from "crypto-js";

function LoginForm({ connectUser }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(null);

    function handleLoginChange(e) {
        setLogin(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    async function handleSubmitForm(e) {
        e.preventDefault();

        const encryptedPassword = CryptoJs.SHA1(password).toString();

        // Si correspondance login-password récupère le prénom et le nom du coworker
        const response = await fetch("/.netlify/functions/checkPassword", {
            method: "POST",
            body: JSON.stringify({ login: login, password: encryptedPassword }),
        });
        const responseBody = await response.json();

        const coworkerData = responseBody.data.coworker_password_list.values;
        console.log(coworkerData);
        if (coworkerData.length === 1) {
            setSuccess(true);

            connectUser(coworkerData);
        } else {
            setSuccess(false);
        }
    }

    return (
        <>
            <form className="login-form" onSubmit={handleSubmitForm}>
                <label>
                    Login :
                    <input
                        type="text"
                        name="name"
                        value={login}
                        onChange={handleLoginChange}
                    />
                </label>

                <label>
                    Mot de passe :
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </label>

                <input type="submit" value="Valider" />
            </form>
            <LoginMessage success={success} />
        </>
    );
}

export default LoginForm;
