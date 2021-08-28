import { NavLink, Redirect } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, updateUser }) {
    function handleLogout() {
        updateUser(null);
        return <Redirect to="/" push={true} />;
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
                                Gérer les restaurants
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/lunch">Lunches</NavLink>
                        </li>

                        <li>
                            <button onClick={handleLogout}>Déconnexion</button>
                        </li>

                        <li>
                            {user.role === "admin" && (
                                <i className="fas fa-crown"></i>
                            )}
                            {user.firstname} {user.name}
                        </li>
                    </>
                )}

                {/* {user && <li>{user.firstname}</li>} */}

                {!user && (
                    <>
                        {/* <li>
                            <NavLink to="/connexion">Connexion</NavLink>
                        </li> */}
                        <li>
                            <NavLink to="/inscription">Inscription</NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
}

export default Navbar;
