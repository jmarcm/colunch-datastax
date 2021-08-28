import Star from "./Star";

function StarsRatingDisplay({ value }) {
    return (
        <div className="stars stars-readonly">
            {Array.from({ length: 5 }, (v, index) => (
                <Star
                    key={index + 1}
                    starId={index + 1}
                    marked={value >= index + 1}
                />
            ))}
        </div>
    );
}

export default StarsRatingDisplay;
