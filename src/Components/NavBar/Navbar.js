import "./Navbar.css";

function Navbar({ user }) {
    return (
        <div className="navbar">
            <div className="logo">Co Lunch</div>
            <ul>
                <li>Accueil</li>
                <li>Choix des restaurants</li>
                {user && <li>{user.firstname}</li>}
            </ul>
        </div>
    );
}

export default Navbar;
