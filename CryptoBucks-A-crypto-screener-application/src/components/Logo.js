import React from "react";
import { Link } from "react-router-dom";
import logoSvg from "../assets/logo.svg";

const Logo = () => {
  return (
    <Link to="/"
      className=" top-[1px] left-[2px] [text-decoration:none]
text-lg text-cyan flex items-center">
      <img src={logoSvg} alt="CryptoBucks" width={20} />
      <span>CryptoBucks</span>
    </Link>
  );
};

export default Logo;
