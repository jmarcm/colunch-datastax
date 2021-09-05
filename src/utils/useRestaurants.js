import { useContext, useEffect } from "react";
import { RestaurantsContext } from "../contexts/RestaurantsContext";

function useRestaurants() {
    const [state, setState] = useContext(RestaurantsContext);

    useEffect(() => {
        fetchGetAllRestaurants();
    }, []);

    async function fetchGetAllRestaurants() {
        const response = await fetch("/.netlify/functions/getAllRestaurants");

        const responseBody = await response.json();

        const allRestaurants = sortArrayOfObjects(
            responseBody.data.restaurant_list.values
        );
        setState(allRestaurants);
    }

    return {
        fetchGetAllRestaurants,
    };
}
