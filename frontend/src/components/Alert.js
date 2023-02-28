import React, { useEffect, useState } from "react";

export default function Alert({ type, text, c }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    console.log("alert render");
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, [type, text, c]);

  return (
    <>
      {visible ? (
        <div style={{ height: "70px" }}>
          {type == "success" ? (
            <>
              <div
                onClick={() => {
                  setVisible(false);
                }}
                style={{
                  backgroundColor: "#02b875",
                  color: "white",
                  textAlign: "center",
                  height: "40px",
                  width: "300px",
                  borderRadius: "10px",
                  lineHeight: "40px",
                  cursor: "pointer",
                }}
              >
                {text}
              </div>
            </>
          ) : (
            <>
              <div
                onClick={() => {
                  setVisible(false);
                }}
                style={{
                  backgroundColor: "#DC3545",
                  color: "white",
                  textAlign: "center",
                  height: "40px",
                  width: "300px",
                  borderRadius: "10px",
                  lineHeight: "40px",
                  cursor: "pointer",
                }}
              >
                {text}
              </div>
            </>
          )}
        </div>
      ) : (
        <div style={{ height: "70px" }}></div>
      )}
    </>
  );
}
