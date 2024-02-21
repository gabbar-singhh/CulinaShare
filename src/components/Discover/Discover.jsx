import React, { useEffect, useState } from "react";
import styles from "./Discover.module.css";
import axios from "axios";
import Script from "next/script";

const Discover = () => {
  const [data, setData] = useState([]);

  // USER FILTER STATES
  const [categoryVal, setCategoryVal] = useState(null);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [nameVal, setNameVal] = useState("");
  const [chipVal, setChipVal] = useState("");
  const [isFeaturedVal, setIsFeaturedVal] = useState(false);
  const [isRandomVal, setIsRandomVal] = useState(false);

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
    setChipVal(item.id);
  };

  const categoryDataHandler = (e) => {
    setCategoryVal(e.target.value);
  };

  const nameDataHandler = (e) => {
    setNameVal(e.target.value);
  };

  const featuredButtonHandler = () => {
    setIsFeaturedVal((prevIsFeaturedVal) => !prevIsFeaturedVal);
  };

  const randomButtonHandler = () => {
    setIsRandomVal((prevIsRandomVal) => !prevIsRandomVal);
  };

  const getDataFromAPI = (type) => {
    switch (type) {
      case "CATEGORY":
        // Code for CATEGORY type
        break;

      case "SEARCH":
        // Code for SEARCH type
        break;

      case "TOP":
        // Code for TOP type
        break;

      case "FEATURED":
        // Code for FEATURED type
        break;

      case "RANDOM":
        // Code for RANDOM type
        break;

      default:
        // Default code if none of the cases match
        break;
    }
  };

  return (
    <>
      <section className={styles.discover_main}>
        <div className={styles.wrapper}>
          <div className={styles.top_lane}>
            <div className={styles.left_container}>
              <div className={styles.category_dropdown}>
                <select
                  name="category"
                  id="category"
                  onChange={categoryDataHandler}
                  value={categoryVal}
                >
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
                  value={nameVal}
                  onChange={nameDataHandler}
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
              <span
                className={`${isFeaturedVal && styles.active_button} ${
                  styles.featured
                }`}
                onClick={featuredButtonHandler}
              >
                <img height={20} src="/icons/fire.png" alt="" />
                <p>Top Featured Recipes</p>
              </span>
              <span
                className={`${isRandomVal && styles.active_button} ${
                  styles.random
                }`}
                onClick={randomButtonHandler}
              >
                <img src="/icons/random.png" height={20} alt="" />
                <p>Get a Random Recipe</p>
              </span>
            </div>
          </div>

          <div className={styles.middle_lane}>
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

          <div className={styles.bottom_lane}>
            <p>Showing results for "{}"</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Discover;
