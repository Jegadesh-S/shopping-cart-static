import { useEffect, useState } from "react";

function useRatings(rating) {
  const [ratings, setRatings] = useState([]);

  const applyRatings = (rate) => {
    var ratingArray = [];
    for (let i = 1; i <= 5; i++) {
      ratingArray.push({
        className: i < rate ? "filled" : "un-filled",
      });
    }
    setRatings(ratingArray);
  };

  const computeWidthInPercentage = (rating) => {
    return `${(rating / 5) * 100}%`;
  };

  useEffect(() => {
    applyRatings(rating);
  }, [rating]);

  return {
    applyRatings,
    ratings,
    computeWidthInPercentage,
  };
}
export default useRatings;
