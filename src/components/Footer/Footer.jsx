import React, { useState } from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  const [emailVal, setEmailVal] = useState("");
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const socialHandler = (event) => {
    const type = event.currentTarget.getAttribute("data-key");

    switch (type) {
      case "INSTA":
        window.open("https://www.instagram.com/codexhimanshu/", "_self");
        break;
      case "TWITTER":
        window.open("https://twitter.com/garadiya0", "_self");
        break;
      case "LINKEDIN":
        window.open("https://linkedin.com/in/himanshufs", "_self");
        break;
      case "FACEBOOK":
        window.open("https://facebook.com/", "_self");
        break;
      default:
      // no default case here
    }
  };

  const emailDataHandler = (e) => {
    setEmailVal(e.target.value);
    console.log(e.target.value);
  };

  const emailValKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      setEmailVal(e.target.value);
      // send email to supabase!
      console.log(e.target.value);
    }
  };

  const handleSearchClick = () => {
    setIsSearchClicked((prevState) => !prevState);

    setTimeout(() => {
      setIsSearchClicked(false);
    }, 150);
  };
  return (
    <React.Fragment>
      <section className={styles.about_main}>
        <img
          className={styles.bgNewletter}
          src="/assets/bgNewsletterImage.webp"
          alt=""
        />
        <div className={styles.about_container}>
          <div className={styles.newsletter}>
            <h3>Join Our NewsLetter!</h3>
            <p>
              Never miss any new amazing recipes, get them right onto your
              mails!
            </p>
            <div className={styles.searchbar}>
              <input
                placeholder="johnnysins@gmail.com"
                className={styles.search_input}
                type="text"
                name=""
                id=""
                value={emailVal}
                onChange={emailDataHandler}
                onKeyDown={emailValKeyDownHandler}
              />
              <span
                className={`${styles.search_icon} shine_effect`}
                onClick={handleSearchClick}
                style={{
                  backgroundColor: isSearchClicked
                    ? "var(--secondary-color-light)"
                    : "var(--secondary-color)",
                }}
              >
                <img src="/icons/send.png" height={18} alt="" />
              </span>
            </div>
            <p className={styles.pSpam}>PLS: WE WON'T SPAM</p>
          </div>
        </div>

        {/* <div className={styles.about_bottomLane}>
          <h3>Connect with us</h3>

          <ul>
            <li
              className={styles.social}
              data-key={"INSTA"}
              onClick={socialHandler}
            >
              <img src="/icons/instagram-about.svg" />
            </li>
            <li
              className={styles.social}
              data-key={"TWITTER"}
              onClick={socialHandler}
            >
              <img src="/icons/twitterx-about.svg" />
            </li>
            <li
              className={styles.social}
              data-key={"LINKEDIN"}
              onClick={socialHandler}
            >
              <img src="/icons/linkedin-about.svg" />
            </li>
            <li
              className={styles.social}
              data-key={"FACEBOOK"}
              onClick={socialHandler}
            >
              <img src="/icons/facebook-about.svg" />
            </li>
          </ul>
        </div> */}
      </section>
      <footer className={styles.footer}>
        made with ❤ by himanshu!
      </footer>
    </React.Fragment>
  );
};

export default Footer;
