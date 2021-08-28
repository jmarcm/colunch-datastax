import { useState } from "react";
import Star from "./Star";

function StarsRating({ value, _updateRestaurantRating, readOnly }) {
    const [rating, setRating] = useState(parseInt(value) || 0);
    const [selection, setSelection] = useState(0);

    function handleMouseOver(e) {
        if (readOnly) {
            return;
        }
        let val = 0;
        if (e && e.target && e.target.getAttribute("data-star-id")) {
            val = e.target.getAttribute("data-star-id");
        }
        setSelection(val);
    }

    function handleClick(e) {
        const newRating = e.target.getAttribute("data-star-id");

        console.log(typeof _updateRestaurantRating);
        if (typeof _updateRestaurantRating == "function") {
            setRating(newRating);
            _updateRestaurantRating(newRating);
        }
    }

    return (
        <div
            className="stars stars-dynamic"
            onMouseOver={handleMouseOver}
            onMouseOut={() => handleMouseOver(null)}
            onClick={handleClick}
        >
            {Array.from({ length: 5 }, (v, index) => (
                <Star
                    key={index + 1}
                    starId={index + 1}
                    marked={
                        selection ? selection >= index + 1 : rating >= index + 1
                    }
                />
            ))}
        </div>
    );
}

export default StarsRating;
