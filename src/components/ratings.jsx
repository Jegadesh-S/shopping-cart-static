import useRatings from "@customHooks/useRatings";

function Ratings({ rating, customerCount }) {
  const { computeWidthInPercentage } = useRatings(rating);

  return (
    <>
      <small data-testid="product-rating">
        <b>{rating}</b>
      </small>{" "}
      <div
        data-testid="prodcut-rating-stars"
        className="rating-container d-flex"
      >
        <div
          className="apply-rating-color"
          style={{ width: computeWidthInPercentage(rating) }}
        >
          {[1, 2, 3, 4, 5].map((index) => (
            <img
              key={`star_${index + 1}`}
              src="../../src/assets/star.svg"
              width={"15px"}
              height={"15px"}
            ></img>
          ))}
        </div>
      </div>
      <small data-testid="product-customers-count">
        {customerCount} global ratings
      </small>
    </>
  );
}

export default Ratings;
