function Star({ marked, starId }) {
    const classe = marked ? "fas" : "far";
    return (
        <i
            className={`${classe} fa-star`}
            role="button"
            data-star-id={starId}
        ></i>
    );
}

export default Star;
