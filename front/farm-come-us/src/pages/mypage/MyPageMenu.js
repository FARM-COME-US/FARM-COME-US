import React from "react";
import { NavLink } from "react-router-dom";
import ImageButton from "../../components/common/ImageButton";

import { HiUser } from "react-icons/hi";
import { MdStoreMallDirectory } from "react-icons/md";
import { MdOutlineCreditCard } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

import classes from "./style/MyPageMenu.module.scss";

const MyPageMenu = () => {
  return (
    <ul className={classes.menuList}>
      <li>
        <NavLink
          to="info"
          className={({ isActive }) => (isActive ? classes.active : null)}
        >
          <ImageButton
            className={classes.menuItem}
            icon={<HiUser />}
            text="가입정보"
          />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="receipts"
          className={({ isActive }) => (isActive ? classes.active : null)}
        >
          <ImageButton
            className={classes.menuItem}
            icon={<MdOutlineCreditCard />}
            text="구매내역"
          />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="product"
          className={({ isActive }) => (isActive ? classes.active : null)}
        >
          <ImageButton
            className={classes.menuItem}
            icon={<MdStoreMallDirectory />}
            text="마이스토어"
          />
        </NavLink>
      </li>
      <li>
        <NavLink
          to="likestores"
          className={({ isActive }) => (isActive ? classes.active : null)}
        >
          <ImageButton
            className={classes.menuItem}
            icon={<FaHeart />}
            text="관심스토어"
          />
        </NavLink>
      </li>
    </ul>
  );
};

export default MyPageMenu;
