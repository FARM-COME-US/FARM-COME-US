import React from "react";
import { Link } from "react-router-dom";
import ImageButton from "../common/ImageButton";

import { MdStoreMallDirectory } from "react-icons/md";
import { MdOutlineLiveTv } from "react-icons/md";
import { MdLocalGroceryStore } from "react-icons/md";
import { MdCreditCard } from "react-icons/md";

import classes from "./style/MyStoreMenu.module.scss";

const MyStoreMenu = () => {
  return (
    <ul className={classes.menuList}>
      <li>
        <Link to="info">
          <ImageButton
            className={classes.menuItem}
            icon={<MdStoreMallDirectory />}
            text="스토어 정보"
          />
        </Link>
      </li>
      <li>
        <Link to="live">
          <ImageButton
            className={classes.menuItem}
            icon={<MdOutlineLiveTv />}
            text="Live"
          />
        </Link>
      </li>
      <li>
        <Link to="product">
          <ImageButton
            className={classes.menuItem}
            icon={<MdLocalGroceryStore />}
            text="판매상품"
          />
        </Link>
      </li>
      <li>
        <Link to="receipt">
          <ImageButton
            className={classes.menuItem}
            icon={<MdCreditCard />}
            text="판매내역"
          />
        </Link>
      </li>
    </ul>
  );
};

export default MyStoreMenu;
