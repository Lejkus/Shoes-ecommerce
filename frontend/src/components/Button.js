import React, { useState } from "react";

export default function Button({ width, height, text,margintop,type }) {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };
  return (
    <button
      style={{
        width: width,
        height: height,
        appearance: "none",
        backgroundColor: isHover ? "white" : "black",
        color: isHover ? "black" : "white",
        border: isHover ? "2px solid black" : "",
        fontSize: "16px",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        marginTop: margintop,
        type:type
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </button>
  );
}
