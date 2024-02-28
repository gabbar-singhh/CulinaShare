import React, { useEffect, useRef } from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";

const NavigationBar = (props) => {
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
            Favorites
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavigationBar;
