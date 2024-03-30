import React, { useState } from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import toast from "react-hot-toast";
import { validate } from "email-validator";
import supabase from "@/lib/supabaseClient";

const Footer = () => {
  const LINKEDIN_URL = "https://www.linkedin.com/in/himanshufs";
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
  };

  const emailValKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      if (validate(e.target.value)) {
        sendNewsletterEmailDB(emailVal).catch(() => {
          toast.error(`unknown error occured`);
        });
      } else {
        toast.error(`enter a valid email address`);
      }
    }
  };

  const newsletterSendHandler = () => {
    setIsSearchClicked((prevState) => !prevState);
    if (validate(emailVal)) {
      sendNewsletterEmailDB(emailVal).catch(() => {
        toast.error(`unknown error occured`);
      });
    } else {
      toast.error(`enter a valid email address`);
    }

    setTimeout(() => {
      setIsSearchClicked(false);
    }, 150);
  };

  const sendNewsletterEmailDB = async (emailId) => {
    const { data, error } = await supabase
      .from("newsletter")
      .insert({ email_id: emailId })
      .select();

    if (error) {
      toast.error(`you're already subscribed to CulinaShare`);
    }

    if (data) {
      toast.success(`you subscribed to culinashare`);
      setEmailVal("");
    }
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
                onClick={newsletterSendHandler}
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
      </section>
      <footer className={styles.footer}>
        made with ❤ by{" "}
        <Link href={LINKEDIN_URL} style={{ textDecoration: "underline" }}>
          himanshu
        </Link>
        !
      </footer>
    </React.Fragment>
  );
};

export default Footer;
