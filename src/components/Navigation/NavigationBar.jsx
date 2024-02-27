import React, { useEffect, useRef } from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";

const NavigationBar = (props) => {
  const navbarRef = useRef(null);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const threshold = 200;

      if (scrollTop > threshold) {
        // document.body.style.backgroundColor = "#ac51ff"; // page end color
      } else {
        document.body.style.backgroundColor = ""; // page start color
      }

      if (scrollTop > lastScrollTop) {
        navbarRef.current.style.top = "-80px";
      } else {
        navbarRef.current.style.top = "0";
      }

      lastScrollTop = scrollTop;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className={styles.nav} id="nav" ref={navbarRef} style={props.style}>
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
