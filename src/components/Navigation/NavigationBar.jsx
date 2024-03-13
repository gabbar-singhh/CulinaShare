import React, { useEffect, useState, useRef } from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";

const NavigationBar = (props) => {
  const { user, error, isLoading } = useUser();
  const [showMenu, setShowMenu] = useState(false);
  const [hamburgerIcon, setHamburgerIcon] = useState("&#9776;");
  const [showDropdown, setShowDropdown] = useState(false);
  const showHamburgerMenu = () => {
    setShowMenu((prevShowMenu) => !prevShowMenu);

    setHamburgerIcon((prevIcon) =>
      prevIcon === "&#9776;" ? "&#10005;" : "&#9776;"
    );
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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

        {!user ? (
          <Link href={"/api/auth/login"}>
            <li className={`${styles.fav_btn_text} ${styles.li_item}`}>
              Sign In
            </li>
          </Link>
        ) : (
          <div className={`${styles.dropdownContainer}`}>
            <div
              className={`${styles.fav_btn_text} ${styles.li_item}`}
              onClick={toggleDropdown}
            >
              <Link href="/favorites">{user.nickname}</Link>
              <Image
                className={styles.triangleIcon}
                src="/icons/triangle.png"
                height={11}
                width={11}
                alt="triangle icon"
              />
            </div>
            <div
              className={`${showDropdown && styles.showDropdownMenu} ${
                styles.dropdownContent
              }`}
            >
              <ul>
                <Link href={"/favorites"}>
                  <li className={styles.dropdownItem}>Favourite Recipes</li>
                </Link>
                <Link href={"/about"}>
                  <li className={styles.dropdownItem}> About Us</li>
                </Link>
                <Link href={"/api/auth/logout"}>
                  <li className={`${styles.dropdownItem} ${styles.logoutItem}`}>
                    Logout{" "}
                    <Image src={"/icons/logout.png"} alt="logout icon" height={17} width={17} />
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        )}
      </ul>

      <div className={styles.nav_mobile}>
        <p>Culina Share</p>

        <span
          onClick={showHamburgerMenu}
          dangerouslySetInnerHTML={{ __html: hamburgerIcon }}
          className={hamburgerIcon === "&#10005;" ? `${styles.x_size}`:""}
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
        <Link href={"/about"}>
          <li>About Us</li>
        </Link>
        {!user ? (
          <Link href={"/api/auth/login"}>
            <li id={styles.li_sign_mobile}>Sign In</li>
          </Link>
        ) : (
          <>
          <Link href={"/favorites"}>
            <li className={`${styles.li_item}`}>
              Favourite Recipes
            </li>
          </Link>
          <Link href={"/api/auth/logout"}>
            <li className={`${styles.fav_btn_text} ${styles.li_item}`}>
              Logout
            </li>
          </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
