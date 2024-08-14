import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <img
        src="https://cdn.pixabay.com/photo/2021/04/07/08/06/ooad-6158391_1280.png"
        alt="logo"
      />
    </header>
  );
};

export default Header;
