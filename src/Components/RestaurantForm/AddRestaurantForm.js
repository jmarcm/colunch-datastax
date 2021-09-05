import { useState } from "react";
import "./RestaurantForm.css";

import StarsRating from "../StarsRating/StarsRating";
import fetch from "node-fetch";

function AddRestaurantForm({ user, _fetchGetAllRestaurants }) {
    const [restaurantName, setRestaurantName] = useState("");
    const [hasMenuVegetarien, setHasMenuVegetarien] = useState(false);
    const [restaurantAddress, setRestaurantAddress] = useState("");
    const [restaurantTelephone, setRestaurantTelephone] = useState("");
    const [restaurantRating, setRestaurantRating] = useState("");
    const [comment, setComment] = useState("");
    const [livraison, setLivraison] = useState(false);
    const proposedBy = `${user.firstname} ${user.name}`;

    function updateRestaurantRating(newRating) {
        setRestaurantRating(newRating);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const fetchAddSuggestedRestaurant = await fetch(
            "/.netlify/functions/addRestaurant",
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

        const response = await fetchAddSuggestedRestaurant.json();

        if (response.data.insertrestaurant_list.applied) {
            _fetchGetAllRestaurants();
        }
    }

    return (
        <div className="proposition-restaurant">
            <h2>Proposition de restaurant</h2>
            <form className="suggest-restaurant" onSubmit={handleSubmit}>
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
            <p>{hasMenuVegetarien}</p>
        </div>
    );
}

export default AddRestaurantForm;
