import React from "react";
import Review from "./Review";
import AddrReview from "./AddrReview";

export default function Reviews({ reviews }) {
  return (
    <div className="reviews-page">
      <div className="reviews-title-add">
        <div>
          <h1>Reviews:</h1>
          <p>Number of reviews: {reviews.length}</p>
        </div>
        <AddrReview />
      </div>
      {reviews.map((review,index) => {
        return (
          <React.Fragment key={index}>
            <hr></hr>
            <Review  review={review} />
          </React.Fragment>
        );
      })}
    </div>
  );
}
