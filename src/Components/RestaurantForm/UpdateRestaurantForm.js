import { useState } from "react";
import { useHistory } from "react-router-dom";
import fetch from "node-fetch";

import "./RestaurantForm.css";

import StarsRating from "../StarsRating/StarsRating";

function UpdateRestaurantForm({ selectedRestaurant, user, _onClickBack }) {
    const [restaurantName, setRestaurantName] = useState(
        selectedRestaurant.name
    );
    const [hasMenuVegetarien, setHasMenuVegetarien] = useState(
        selectedRestaurant.menu_vegetarien
    );
    const [restaurantAddress, setRestaurantAddress] = useState(
        selectedRestaurant.adresse
    );
    const [restaurantTelephone, setRestaurantTelephone] = useState(
        selectedRestaurant.telephone
    );
    const [restaurantRating, setRestaurantRating] = useState(
        selectedRestaurant.avis
    );
    const [comment, setComment] = useState(selectedRestaurant.commentaire);
    const [livraison, setLivraison] = useState(selectedRestaurant.livraison);
    const proposedBy = `${user.firstname} ${user.name}`;

    const history = useHistory();

    function updateRestaurantRating(newRating) {
        setRestaurantRating(newRating);
    }

    /** Valide la modification d'un restaurant */
    async function handleSubmit(e) {
        e.preventDefault();

        const fetchUupdateRestaurant = await fetch(
            "/.netlify/functions/updateRestaurant",
            {
                method: "POST",
                body: JSON.stringify({
                    restaurantName: restaurantName,
                    hasMenuVegetarien: hasMenuVegetarien,
                    restaurantAddress: restaurantAddress,
                    restaurantTelephone: restaurantTelephone,
                    restaurantRating: restaurantRating,
                    comment: comment,
                    proposedBy: proposedBy,
                    livraison: livraison,
                }),
            }
        );

        const response = await fetchUupdateRestaurant.json();
        console.log(response.data);
        // if (response.data.insertrestaurant_list.applied) {
        //     // _fetchGetAllRestaurants();
        // }
    }

    function handleClick() {
        _onClickBack(null, {});
    }

    return (
        <div className="proposition-restaurant">
            <h2>Proposition de restaurant</h2>
            <form className="update-restaurant" onSubmit={handleSubmit}>
                <label>
                    Nom
                    <input
                        type="text"
                        name="restaurant-name"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                    />
                </label>
                <label>
                    Menu végétarien
                    <input
                        type="checkbox"
                        name="hasMenuVegetarien"
                        checked={hasMenuVegetarien}
                        onChange={(e) =>
                            setHasMenuVegetarien(!hasMenuVegetarien)
                        }
                    />
                </label>
                <label>
                    Adresse
                    <input
                        type="text"
                        name="restaurant-address"
                        value={restaurantAddress}
                        onChange={(e) => setRestaurantAddress(e.target.value)}
                    />
                </label>
                <label>
                    Téléphone
                    <input
                        type="text"
                        value={restaurantTelephone}
                        onChange={(e) => setRestaurantTelephone(e.target.value)}
                    />
                </label>
                <label>
                    Avis
                    <input
                        type="hidden"
                        name="restaurant-rating"
                        value={restaurantRating}
                        onChange={(e) => setRestaurantRating(e.target.value)}
                    />
                    <StarsRating
                        value={restaurantRating}
                        _updateRestaurantRating={updateRestaurantRating}
                    />
                </label>
                <label>
                    Commentaire
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                </label>
                <label>
                    Livraison
                    <input
                        type="checkbox"
                        name="livraison"
                        checked={livraison}
                        onChange={(e) => setLivraison(!livraison)}
                    />
                </label>
                <label>
                    Proposé par
                    <input
                        type="text"
                        name="proposed-by"
                        value={proposedBy}
                        readOnly
                    />
                </label>
                <input type="submit" value="Valider" />
            </form>
            <button onClick={handleClick}>Retour</button>
        </div>
    );
}

export default UpdateRestaurantForm;
