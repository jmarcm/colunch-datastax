import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, updateUser }) {
    function handleLogout() {
        updateUser(null);
    }

    return (
        <div className="navbar">
            <div className="logo">
                <NavLink to="/">Co Lunch</NavLink>
            </div>
            <ul>
                {user && (
                    <>
                        <li>
                            <NavLink to="/restaurant">
                                Choix des restaurants
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/lunch">Lunches</NavLink>
                        </li>
                        <li>
                            <button onClick={handleLogout}>Déconnexion</button>
                        </li>
                    </>
                )}
                {user && <li>{user.firstname}</li>}
            </ul>
        </div>
    );
}

export default Navbar;
