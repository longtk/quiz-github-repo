import React from "react";
import LoaderImage from "../../../assets/images/loader.gif";

const LoadingFullPage: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <img src={LoaderImage} alt="" width={120} />
        <div
          style={{
            fontFamily: "Archia, sans-serif",
            textAlign: "center",
            marginTop: 12,
          }}
        >
          Loading....
        </div>
      </div>
    </div>
  );
};

export default LoadingFullPage;
