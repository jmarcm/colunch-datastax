import StarsRatingDisplay from "../StarsRating/StarsRatingDisplay";

function Restaurant({ restaurant, user, _onClickRestaurantAction }) {
    function handleClickUpdate(e) {
        const action = "udpate-restaurant";
        _onClickRestaurantAction(action, restaurant);
    }

    function handleClickDelete(e) {
        console.log("delete");
    }
    return (
        <div className="restaurant">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.adresse}</p>
            <p>{restaurant.telephone}</p>
            <p>{restaurant.commentaire}</p>
            <p>
                Menu végétarien :{" "}
                {restaurant.menu_vegetarien ? (
                    <i className="far fa-check-circle"></i>
                ) : (
                    <i className="fas fa-ban"></i>
                )}
            </p>
            <p>
                Livraison :{" "}
                {restaurant.livraison ? (
                    <i className="far fa-check-circle"></i>
                ) : (
                    <i className="fas fa-ban"></i>
                )}
            </p>
            <p>Proposé par : {restaurant.propose_par}</p>
            <StarsRatingDisplay value={restaurant.avis} readOnly={true} />

            {user?.role === "admin" && (
                <>
                    <button onClick={handleClickUpdate}>Modifier</button>
                    <button onClick={handleClickDelete}>Effacer</button>
                </>
            )}
        </div>
    );
}

export default Restaurant;
