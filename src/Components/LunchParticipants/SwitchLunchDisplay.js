/**
 * Permet d'afficher un élément sleon le rôle de la personne connectée
 */

import LunchParticipants from "./LunchParticipants";
import LunchParticipation from "./LunchParticipation";

function SwitchLunchDisplay({ user, selectedLunchDate }) {
    if (user.role === "admin") {
        return <LunchParticipants selectedLunchDate={selectedLunchDate} />;
    } else {
        return (
            <LunchParticipation
                user={user}
                selectedLunchDate={selectedLunchDate}
            />
        );
    }
}

export default SwitchLunchDisplay;
