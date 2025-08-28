import React, { useState } from "react";

const Logos = () => {
  const logo = [
    { name: amazon, img: "/public/amazonprime.png" },
    { name: netflix, img: "/public/amazonprime.png" },
    { name: jiohotstar, img: "/public/amazonprime.png" },
    { name: amazon, img: "/public/amazonprime.png" },
    { name: amazon, img: "/public/amazonprime.png" },
  ];

  const [logos, setLogos] = useState(true);
  return (
    <>
      <div className="">
        {logo.map((item) => (
          <div key={item.name}>
            {item.name}
            <div>{item.img}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Logos;
