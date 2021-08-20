import LoginForm from "../Components/LoginForm/LoginForm";

function Home({ user, connectUser }) {
    return (
        <>
            <h1>Home</h1>
            {!user && <LoginForm connectUser={connectUser} />}

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
