import { Redirect } from "react-router-dom";

import "./Restaurants.css";

import DisplayRestaurants from "../Components/DisplayRestaurants/DisplayRestaurants";
import AddRestaurantForm from "../Components/AddRestaurantForm/AddRestaurantForm";
import { useState, useEffect } from "react";

const { sortArrayOfObjects } = require("../utils/objects");

function Restaurants({ user }) {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetchGetAllRestaurants();
    }, []);

    async function fetchGetAllRestaurants() {
        const response = await fetch("/.netlify/functions/getAllRestaurants");

        const responseBody = await response.json();

        const allRestaurants = sortArrayOfObjects(
            responseBody.data.restaurant_list.values
        );
        setRestaurants(allRestaurants);
    }

    if (!user) {
        return <Redirect to="/" push={true} />;
    }

    return (
        <div className="gestion-restaurants">
            <h1>Gestion des restaurants</h1>
            <DisplayRestaurants restaurants={restaurants} />
            <AddRestaurantForm
                user={user}
                _fetchGetAllRestaurants={fetchGetAllRestaurants}
            />
        </div>
    );
}

export default Restaurants;
