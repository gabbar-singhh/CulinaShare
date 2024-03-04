import React, { useEffect, useState, useRef } from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";

const NavigationBar = (props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [hamburgerIcon, setHamburgerIcon] = useState("&#9776;");

  const showHamburgerMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);

    setHamburgerIcon((prevIcon) =>
      prevIcon === "&#9776;" ? "&#10005;" : "&#9776;"
    );
  };

  return (
    <nav className={styles.nav} id="nav">
      <ul className={`${styles.nav_list}`}>
        <Link href="/">
          <li className={`underline_effect ${styles.li_item}`}>Home</li>
        </Link>
        <Link href="/recipes">
          <li className={`underline_effect ${styles.li_item}`}>Recipes</li>
        </Link>
        <Link href="/" className={`${styles.li_item}`} id={styles.culina_share}>
          <li>Culina Share</li>
        </Link>
        <Link href="/contribute">
          <li className={`underline_effect ${styles.li_item}`}>Contribute</li>
        </Link>
        <Link href="/favorites">
          <li className={`${styles.fav_btn_text} ${styles.li_item}`}>
            Sign In
          </li>
        </Link>
      </ul>

      <div className={styles.nav_mobile}>
        <p>Culina Share</p>

        <span
          onClick={showHamburgerMenu}
          dangerouslySetInnerHTML={{ __html: hamburgerIcon }}
          className={hamburgerIcon === "&#10005;" && `${styles.x_size}`}
        ></span>
      </div>

      <ul
        className={
          showMenu
            ? `${styles.nav_list_mobile}`
            : `${styles.close} ${styles.nav_list_mobile}`
        }
      >
        <Link href={"/"} id={styles.li_home_mobile}>
          <li>Home</li>
        </Link>
        <Link href={"/recipes"}>
          <li>Recipes</li>
        </Link>
        <Link href={"/contribute"}>
          <li>Contribute</li>
        </Link>
        <Link href={"/"}>
          <li id={styles.li_sign_mobile}>Sign In</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavigationBar;