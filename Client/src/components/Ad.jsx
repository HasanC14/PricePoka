import React from "react";
import ad from "../assets/3.webp";
import m_ad from "../assets/mobile2.webp";
const Ad = () => {
  return (
    <div className="max-w-7xl mx-auto my-4">
      <a href="https://ezplay.tech/" target="_blank" className="w-full ">
        <img
          src={ad}
          alt="Advertisement"
          className="rounded-md w-full object-contain md:block hidden"
        />
        <img
          src={m_ad}
          alt="Advertisement"
          className="rounded-md w-full object-contain block md:hidden"
        />
      </a>
    </div>
  );
};

export default Ad;
