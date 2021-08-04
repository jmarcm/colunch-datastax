function LoginMessage({ success }) {

    if (success === null) {
        
        return (
            <div id="login-message"></div>
        )
    } else if (success === false) {
        
        return (
            <div id="login-message" className="error">
                Erreur, votre login et votre mot de passe n'ont pas été
                    reconnus
            </div>
        )
    } else {
        
        return (
            <div id="login-message" className="success">
                Connexion réussie
            </div>
        )
    }
}

export default LoginMessage;
