import { Redirect } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import "./Restaurants.css";

import DisplayRestaurants from "../Components/DisplayRestaurants/DisplayRestaurants";
import AddRestaurantForm from "../Components/RestaurantForm/AddRestaurantForm";
import UpdateRestaurantForm from "../Components/RestaurantForm/UpdateRestaurantForm";

import { RestaurantsContext } from "../contexts/RestaurantsContext";

const { sortArrayOfObjects } = require("../utils/objects");

function Restaurants({ user, fetchGetAllRestaurants }) {
    const defaultAction = "add-restaurant";
    // const [restaurants, setRestaurants] = useState([]);
    const [restaurants, setRestaurants] = useContext(RestaurantsContext);
    const [action, setAction] = useState(defaultAction);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    console.log(action);
    console.log("restaurants", restaurants);

    // useEffect(() => {
    //     fetchGetAllRestaurants();
    // }, []);

    // async function fetchGetAllRestaurants() {
    //     const response = await fetch("/.netlify/functions/getAllRestaurants");

    //     const responseBody = await response.json();

    //     const allRestaurants = sortArrayOfObjects(
    //         responseBody.data.restaurant_list.values
    //     );
    //     setRestaurants(allRestaurants);
    // }

    function updateAction(newAction, restaurant) {
        setAction(newAction || defaultAction);
        setSelectedRestaurant(restaurant);
    }

    function switchDisplay() {
        switch (action) {
            case "add-restaurant":
                return (
                    <>
                        <DisplayRestaurants
                            restaurants={restaurants}
                            user={user}
                            _onClickRestaurantAction={updateAction}
                        />
                        <AddRestaurantForm
                            user={user}
                            fetchGetAllRestaurants={fetchGetAllRestaurants}
                        />
                    </>
                );

            case "udpate-restaurant":
                return (
                    <UpdateRestaurantForm
                        selectedRestaurant={selectedRestaurant}
                        user={user}
                        _onClickBack={updateAction}
                    />
                );
            default:
                break;
        }
    }

    if (!user) {
        return <Redirect to="/" push={true} />;
    }

    return (
        <div className="gestion-restaurants">
            <h1>Gestion des restaurants</h1>
            <p>{action}</p>

            {switchDisplay()}
        </div>
    );
}

export default Restaurants;
