import React,{useEffect, useState} from "react";
import axios from "axios";
import styles from '../styles/recipes.module.css'
const recipes = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then(function (response) {
        // handle success
        console.log("response", response.data);
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
    <section>
      <h1>damn damn</h1>

      <ul className={styles.cat_list}>
        {data.map((item) => {
          return (
            <li
              key={item.idCategory}
              className={`${styles.cat_item}`}
            >
              <p>{item.strCategory}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default recipes;
