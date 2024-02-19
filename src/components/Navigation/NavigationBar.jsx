import { useEffect, useRef } from "react";
import styles from "./NavigationBar.module.css";
import Link from "next/link";

const NavigationBar = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const threshold = 200;

      if (scrollTop > threshold) {
        // document.body.style.backgroundColor = "#ac51ff"; // page end color
      } else {
        document.body.style.backgroundColor = "#ff9407"; // page start color
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
      className={styles.nav_main}
      id="nav"
      ref={navbarRef}
      style={{ position: "fixed", width: "100%", top: "0", zIndex: "100" }}
    >
      <ul>
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
