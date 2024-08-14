import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Nav.module.css";

const Nav = (props) => {
  return (
    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? classes.activeLink : classes.a
          }
        >
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink
          to="/dialogs"
          className={({ isActive }) =>
            isActive ? classes.activeLink : classes.a
          }
        >
          Messages
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink
          to="/news"
          className={({ isActive }) =>
            isActive ? classes.activeLink : classes.a
          }
        >
          News
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink
          to="/music"
          className={({ isActive }) =>
            isActive ? classes.activeLink : classes.a
          }
        >
          Music
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? classes.activeLink : classes.a
          }
        >
          Settings
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
