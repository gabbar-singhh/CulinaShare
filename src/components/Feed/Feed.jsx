import React, { useEffect, useState } from "react";
import styles from "./Feed.module.css";
import Cards from "../Card/Card";

const Feed = (props) => {
  useEffect(() => {
    console.log(props.data);
  }, []);

  return (
    <section className={styles.feed_main}>
      <div className={styles.feed_container}>
        <Cards />
      </div>
    </section>
  );
};

export default Feed;
