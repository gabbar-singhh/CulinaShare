import React, { useEffect, useState } from "react";
import styles from "./Discover.module.css";
import axios from "axios";
import Feed from "../Feed/Feed";

const Discover = () => {
  const [data, setData] = useState([]);
  const [resultStr, setResultStr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // USER FILTER STATES
  const [categoryVal, setCategoryVal] = useState();
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [nameVal, setNameVal] = useState("");
  const [chipVal, setChipVal] = useState("");
  const [showShowResults, setShowShowResults] = useState(false);

  const handleSearchClick = () => {
    setIsSearchClicked((prevState) => !prevState);

    setResultStr(nameVal);
    getDataFromAPI({ type: "SEARCH", value: nameVal });

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
      .get("https://www.themealdb.com/api/json/v1/1/search.php?f=t")
      .then(function (response) {
        // handle success
        console.log("response", response.data);
        setData(response.data.meals);
      })
      .catch(function (error) {
        // handle error
        setData({ meals: null, error: true });
      })
      .finally(function (response) {
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
    setResultStr(item.id);
    setIsLoading(true);
    getDataFromAPI({ type: "TOP_SEARCH", value: item.id });
  };

  const categoryDataHandler = (e) => {
    setCategoryVal(e.target.value);
    setResultStr(e.target.value);
    setIsLoading(true);
    getDataFromAPI({ type: "CATEGORY", value: e.target.value });
  };

  const nameDataHandler = (e) => {
    setIsLoading(true);
    setNameVal(e.target.value);
  };

  const featuredButtonHandler = async () => {
    setIsLoading(true);
    getDataFromAPI({ type: "FEATURED", value: "" });
  };

  const randomButtonHandler = () => {
    setResultStr("a random reciple");
    setIsLoading(true);
    getDataFromAPI({ type: "RANDOM", value: "" });
  };

  const nameValKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      setResultStr(e.target.value);
      getDataFromAPI({ type: "SEARCH", value: e.target.value });
    }
  };

  const getDataFromAPI = (fetch) => {
    switch (fetch.type) {
      case "CATEGORY":
        console.log("categoryVal", categoryVal);
        axios
          .get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${fetch.value}`
          )
          .then((response) => {
            // handle success
            console.log(`${fetch.value}`, response.data);
            setData(response.data.meals);
          })
          .catch((error) => {
            // handle error
            console.log(error);
            setData({ meals: null, error: true });
          })
          .finally(() => {
            // always executed
            setChips([
              { id: "breakfast", isSelected: false, value: "breakfast" },
              { id: "shawarma", isSelected: false, value: "shawarma" },
              { id: "indian", isSelected: false, value: "indian" },
              { id: "chicken", isSelected: false, value: "chicken" },
              { id: "dessert", isSelected: false, value: "dessert" },
            ]);
            setShowShowResults(true);
            setNameVal(""); // making search box empty
            setIsLoading(false);
          });

        break;

      case "SEARCH":
        // Code for SEARCH type
        axios
          .get(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${fetch.value}`
          )
          .then((response) => {
            // handle success
            setData(response.data.meals);
          })
          .catch((error) => {
            // handle error
            console.log(error);
            setData({ meals: null, error: true });
          })
          .finally(() => {
            // always executed
            setChips([
              { id: "breakfast", isSelected: false, value: "breakfast" },
              { id: "shawarma", isSelected: false, value: "shawarma" },
              { id: "indian", isSelected: false, value: "indian" },
              { id: "chicken", isSelected: false, value: "chicken" },
              { id: "dessert", isSelected: false, value: "dessert" },
            ]);
            setShowShowResults(true);
            setIsLoading(false);
          });

        break;

      case "TOP_SEARCH":
        // Code for TOP type
        console.log("TOP_SEARCH: ", fetch.value);
        if (
          fetch.value === "breakfast" ||
          fetch.value === "chicken" ||
          fetch.value === "dessert"
        ) {
          axios
            .get(
              `https://www.themealdb.com/api/json/v1/1/filter.php?c=${fetch.value}`
            )
            .then((response) => {
              // handle success
              setData(response.data.meals);
            })
            .catch((error) => {
              // handle error
              console.log(error);
              setData({ meals: null, error: true });
            })
            .finally(() => {
              // always executed
              setShowShowResults(true);
              setIsLoading(false);
            });
        } else if (fetch.value === "indian") {
          axios
            .get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=indian`)
            .then((response) => {
              // handle success
              setData(response.data.meals);
            })
            .catch((error) => {
              // handle error
              console.log(error);
              setData({ meals: null, error: true });
            })
            .finally(() => {
              // always executed
              setShowShowResults(true);
              setIsLoading(false);
            });
        } else if (fetch.value === "shawarma") {
          axios
            .get(
              `https://www.themealdb.com/api/json/v1/1/search.php?s=shawarma`
            )
            .then((response) => {
              // handle success
              setData(response.data.meals);
            })
            .catch((error) => {
              // handle error
              console.log(error);
              setData({ meals: null, error: true });
            })
            .finally(() => {
              // always executed
              setShowShowResults(true);
              setNameVal("");
              setIsLoading(false);
            });
        }
        break;

      case "FEATURED":
        // Code for FEATURED type
        const allMeals = fetchAllMeals()
          .then((res) => {
            setData(res);
          })
          .catch(() => {
            setData({ meals: null, error: true });
          })
          .finally(() => {
            setChips([
              { id: "breakfast", isSelected: false, value: "breakfast" },
              { id: "shawarma", isSelected: false, value: "shawarma" },
              { id: "indian", isSelected: false, value: "indian" },
              { id: "chicken", isSelected: false, value: "chicken" },
              { id: "dessert", isSelected: false, value: "dessert" },
            ]);
            setResultStr("top featured recipes");
            setShowShowResults(true);
            setNameVal("");
            setIsLoading(false);
          });
        break;

      case "RANDOM":
        axios
          .get(`https://www.themealdb.com/api/json/v1/1/random.php`)
          .then((response) => {
            // handle success
            console.log(`RANDOM: `, response);
            setData(response.data.meals);
          })
          .catch((error) => {
            // handle error
            console.log(error);
            setData({ meals: null, error: true });
          })
          .finally(() => {
            // always executed
            setChips([
              { id: "breakfast", isSelected: false, value: "breakfast" },
              { id: "shawarma", isSelected: false, value: "shawarma" },
              { id: "indian", isSelected: false, value: "indian" },
              { id: "chicken", isSelected: false, value: "chicken" },
              { id: "dessert", isSelected: false, value: "dessert" },
            ]);
            setShowShowResults(true);
            setNameVal("");
            setIsLoading(false);
          });
        break;

      default:
        // Default code if none of the cases match
        break;
    }
  };

  const fetchMealDetails = async (mealId) => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      return response.data.meals[0];
    } catch (error) {
      console.error(
        `Error fetching meal details for ID ${mealId}:`,
        error.message
      );
      return null;
    }
  };

  const fetchAllMeals = async () => {
    const mealIds = [
      "53014",
      "53065",
      "52865",
      "52813",
      "53010",
      "52777",
      "52942",
      "52814",
      "52819",
      "53024",
      "52881",
      "52860",
      "53073",
      "52804",
      "53006",
    ];

    const allMeals = await Promise.all(
      mealIds.map((id) => fetchMealDetails(id))
    );
    return allMeals.filter((meal) => meal !== null);
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
                  onKeyDown={nameValKeyDownHandler}
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
                className={`${styles.featured}`}
                onClick={featuredButtonHandler}
              >
                <img height={20} src="/icons/fire.png" alt="" />
                <p>Top Featured Recipes</p>
              </span>
              <span className={styles.random} onClick={randomButtonHandler}>
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
            <p className={!showShowResults ? `${styles.hide}` : ""}>
              Showing results for "{resultStr}"
            </p>
          </div>
        </div>
        <Feed data={data} isLoading={isLoading} />
      </section>
    </>
  );
};

export default Discover;
