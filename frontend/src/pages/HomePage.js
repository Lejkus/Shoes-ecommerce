import React from "react";
import Button from "../components/Button";
export default function HomePage() {
  return (
    <div className="home-page">
      <div style={{ display: "flex", marginBottom: "100px" }}>
        <img
          style={{ width: "700px" }}
          src="https://i2-prod.bristolpost.co.uk/incoming/article4372045.ece/ALTERNATES/s1227b/0_h_01289097.jpg"
        ></img>
        <p style={{ fontSize: "30px", padding: "50px", width: "600px" }}>
          We are a footwear company for over 70 years. From the beginning, our
          shoes were innovative, elegant and, above all, comfortable. Our
          factories were initially established in Italy, then in France and
          Germany. We are a footwear company for over 70 years. From the
          beginning, our shoes were innovative, elegant and, above all,
          comfortable. Our factories were initially established in Italy, then
          in France and Germany
        </p>
      </div>
      <div style={{ display: "flex", marginBottom: "100px" }}>
        <p style={{ fontSize: "30px", padding: "50px", width: "600px" }}>
          We’re on a mission to bring you better footwear. As former Division I
          Track & Field athletes, we know the value of having the best equipment
          to succeed. When we entered the work force, we felt like no one was
          giving professional work wear the same attention. With backgrounds in
          performance shoe design and development, we decided it was time to
          bring the dress shoe into the future.
        </p>
        <img
          style={{ width: "700px" }}
          src="https://vintagedancer.com/wp-content/uploads/1900-men-oxford-shoes-tan-375x377.jpg"
        ></img>
      </div>
      <div style={{ display: "flex", marginBottom: "100px" }}>
        <img
          style={{ width: "700px" }}
          src="https://cdn.shopify.com/s/files/1/0966/8928/files/FOUNDERS-ABOUTUS.jpg?v=1673461497&width=800"
        ></img>
        <p style={{ fontSize: "30px", padding: "50px", width: "600px" }}>
          By combining technologies used in the fastest running shoes in the
          world with Italian leather uppers, we’ve crafted a super comfortable
          dress shoe unlike any other on the market. Try them for yourself and
          feel the difference.
        </p>
      </div>
    </div>
  );
}
