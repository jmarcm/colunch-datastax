import { createContext, useEffect, useState } from "react";

const { sortArrayOfObjects } = require("../utils/objects");

const RestaurantsContext = createContext([{}, () => {}]);

function RestaurantsProvider({ children }) {
    const [state, setState] = useState([]);

    // useEffect(() => {
    //     fetchGetAllRestaurants();
    // }, []);

    // async function fetchGetAllRestaurants() {
    //     const response = await fetch("/.netlify/functions/getAllRestaurants");

    //     const responseBody = await response.json();

    //     const allRestaurants = sortArrayOfObjects(
    //         responseBody.data.restaurant_list.values
    //     );
    //     setState(allRestaurants);
    // }

    // console.log("state", state);

    return (
        <RestaurantsContext.Provider value={[state, setState]}>
            {children}
        </RestaurantsContext.Provider>
    );
}

export { RestaurantsContext, RestaurantsProvider };
