import React, { useEffect, useState } from "react";
import axios from "axios";
import BrokerCard from "../components/BrokerCard";

function BrokerList() {
  const [brokerList, setBrokerList] = useState([]);

  useEffect(() => {
    console.log("entered useEffect======");
    axios
      .get(`${process.env.REACT_APP_HOST_URL}/api/users/byRole/broker`)
      .then((response) => {
        setBrokerList(response.data);
        console.log("broker lists", response.data);
        //Seperate profile picture and certificate pictures
        for (let j = 0; j < response.data.length; j++) {
          if (response.data[j].Pictures.length > 0) {
            for (let i = 0; i < response.data[j].Pictures.length; i++) {
              if (!response.data[j].Pictures[i].isCertificate) {
                // Swap the current element with the first non-certificate element
                const temp = response.data[j].Pictures[i];
                response.data[j].Pictures[i] = response.data[j].Pictures[0];
                response.data[j].Pictures[0] = temp;
                break; // Break out of the loop after the swap
              } else {
                response.data[j].Pictures[0] = { imageUrl: "notFound" };
              }
            }
          }
        }
      })
      .catch((err) => {
        if (err.response.data.status !== 404) {
          alert("no records found!");
          return;
        }
      });
  }, []);

  const displayBrokers = brokerList.map((value, key) => {
    if (Array.isArray(value.Pictures) && value.Pictures.length > 0) {
      const imageUrl = value.Pictures[0]?.imageUrl;
      return (
        <BrokerCard
          key={key}
          brokerId={value.id}
          name={value.name}
          imgUrl={imageUrl}
          phone={value.phone}
          email={value.email}
        />
      );
    } else {
      return (
        <BrokerCard
          key={key}
          brokerId={value.id}
          name={value.name}
          imgUrl={"notFound"}
          phone={value.phone}
          email={value.email}
        />
      );
    }
  });
  return (
    <>
      <div className="card-container">{displayBrokers}</div>
    </>
  );
}

export default BrokerList;
