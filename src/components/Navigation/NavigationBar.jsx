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
        document.body.style.backgroundColor = "#ff9100"; // page start color
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
    <nav
      className={styles.nav}
      id="nav"
      ref={navbarRef}
      style={props.style}
    >
      <ul className={styles.nav_list}>
        <li className={"underline_effect"}>
          <Link href="/">Home</Link>
        </li>
        <li className={"underline_effect"}>
          <Link href="/recipes">Recipes</Link>
        </li>
        <li>
          <Link href="/">Culina Share</Link>
        </li>
        <li className={"underline_effect"}>
          <Link href="/contribute">Contribute</Link>
        </li>
        <li className="">
          <Link href="/favorites">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;