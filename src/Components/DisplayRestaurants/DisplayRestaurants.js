import "./DisplayRestaurants.css";
import Restaurant from "./Restaurant";

function DisplayRestaurants({ restaurants, user, _onClickRestaurantAction }) {
    return (
        <div className="restaurants">
            <h2>Restaurants</h2>

            <div className="restaurants-wrapper">
                {restaurants.length === 0 ? (
                    <div className="fa-waiting-icon fa-3x">
                        <i className="fas fa-spinner fa-pulse"></i>
                    </div>
                ) : (
                    restaurants.map((restaurant, index) => (
                        <Restaurant
                            key={index}
                            restaurant={restaurant}
                            user={user}
                            _onClickRestaurantAction={_onClickRestaurantAction}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

export default DisplayRestaurants;
