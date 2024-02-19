import React, { useEffect, useState } from "react";
import styles from "./Discover.module.css";
import axios from "axios";

const Discover = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(function (response) {
        // handle success
        console.log("response", response.data.categories);
        setData(response.data.categories);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  return (
    <section className={styles.discover_main}>
      <h1>Discover Recipes</h1>

      <ul>
        {data.map((item) => {
          return <li>{item.strCategory}</li>;
        })}
      </ul>
    </section>
  );
};

export default Discover;
