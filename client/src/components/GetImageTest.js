import React, { useState, useEffect } from "react";
import Axios from "axios";

function GetImageTest() {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3005/api/pictures/byProp/8")
      .then((response) => {
        setPictures(response.data);
      })
      .catch((error) => {
        alert("there is an error");
      });
  }, []);

  return (
    <div>
      {pictures.map((picture, key) => {
        return (
          <>
            <p>{picture.imageName}</p>
            <img
              src={picture.imageUrl}
              alt={picture.imageName}
              style={{ maxWidth: "100%" }}
            />{" "}
          </>
        );
      })}
    </div>
  );
}

export default GetImageTest;
