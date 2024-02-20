import React, { useEffect, useState } from "react";
import styles from "./Discover.module.css";
import axios from "axios";
import Script from "next/script";

const Discover = () => {
  const [data, setData] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  const handleSearchClick = () => {
    setIsSearchClicked((prevState) => !prevState);

    setTimeout(() => {
      setIsSearchClicked(false);
    }, 150);
  };

  const [chips, setChips] = useState([
    { id: "breakfast", isSelected: false, value: "breakfast" },
    { id: "shawarma", isSelected: false, value: "shawarma" },
    { id: "indian", isSelected: false, value: "indian" },
    { id: "chicken", isSelected: false, value: "chicken" },
    { id: "dessert", isSelected: false, value: "dessert" },
  ]);

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

  const setActiveChip = (item) => {
    // SETTING THE ISSELECTED VALUE TO TRUE ON THE CLICKED CHIP, ALSO MAKING SURE THAT OTHER VALUES REMAIN AS USUAL
    setChips((prevChips) =>
      prevChips.map((chip) =>
        chip.id === item.id
          ? { ...chip, isSelected: true }
          : { ...chip, isSelected: false }
      )
    );
  };

  return (
    <>
      <section className={styles.discover_main}>
        <div className={styles.wrapper}>
          <div className={styles.top_lane}>
            <div className={styles.left_container}>
              <div className={styles.category_dropdown}>
                <select name="category" id="category">
                  <option value="default" disabled selected>
                    Category
                  </option>
                  <option value="vegan">Vegan</option>
                  <option value="dessert">Dessert</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="seafood">Seafood</option>
                  <option value="chicken">Chicken</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select>
              </div>

              <div className={styles.searchbar}>
                <input
                  placeholder="Search by name.."
                  className={styles.search_input}
                  type="text"
                  name=""
                  id=""
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
                  <img src="/icons/search.svg" height={18} alt="" />
                </span>
              </div>
            </div>

            <div className={styles.right_container}>
              <span className={`${styles.featured}`}>
                <img height={20} src="/icons/fire.png" alt="" />
                <p>Top Featured Recipes</p>
              </span>
              <span className={styles.random}>
                <img src="/icons/random.png" height={20} alt="" />
                <p>Get a Random Recipe</p>
              </span>
            </div>
          </div>

          <div className={styles.bottom_lane}>
            <p>Top Searches:</p>
            <ul className={styles.suggestion_chips}>
              {chips.map((element) => {
                return (
                  <li
                    onClick={() =>
                      setActiveChip({
                        id: element.id,
                        isSelected: element.isSelected,
                      })
                    }
                    className={
                      element.isSelected ? `${styles.active_chip}` : ""
                    }
                    key={element.id}
                  >
                    {element.value}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Discover;
