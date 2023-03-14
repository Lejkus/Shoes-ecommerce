import React from "react";

export default function Review({ review }) {
  const { name, rating, createdAt, comment } = review;
  const stars = [];
  for (let i = 0; i < rating; i++) {
    stars.push(<i className="fa fa-star fa-lg" key={i} aria-hidden="true"></i>);
  }

  return (
    <div className="single-review">
      <p className="name">{name}:</p>
      <p className="stars">{stars}</p>
      <p className="comment">{comment}</p>
      <p className="date">{createdAt.slice(0, 10)}</p>
    </div>
  );
}
