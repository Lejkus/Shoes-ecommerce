import React from "react";
import Button from "../components/Button";
export default function AboutPage() {
  return (
    <div>
      <a
        onClick={() => {
          console.log("siema");
        }}
      >
        <Button width={"400px"} height={"40px"} text={"siema"} />
      </a>
    </div>
  );
}
