import React, { useState } from "react";
import styles from "../styles/contribute.module.css";
import NavigationBar from "@/components/Navigation/NavigationBar";
import About from "@/components/About/About";
import { red } from "@mui/material/colors";

const contribute = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeArea, setRecipeArea] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [youtubeVideoLink, setYoutubeVideoLink] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const eventDataHandler = (event) => {
    const type = event.currentTarget.getAttribute("data-key");
    console.log(type);
    if (type === "RECIPE_NAME") {
      setRecipeName(event.target.value);
    } else if (type === "RECIPE_AREA") {
      setRecipeArea(event.target.value);
    } else if (type === "RECIPE_IMG") {
      setThumbnail(event.target.value);
    } else if (type === "YOUTUBE_VIDEO") {
      setYoutubeVideoLink(event.target.value);
    } else if (type === "INGREDIENTS") {
      setIngredients(event.target.value);
    } else if (type === "INSTRUCTIONS") {
      setInstructions(event.target.value);
    }
  };

  const submitButtonHandler = (event) => {
    event.preventDefault();

    console.log("You clicked submit button");
    console.log([
      recipeName,
      recipeArea,
      thumbnail,
      youtubeVideoLink,
      ingredients,
      instructions,
    ]);

    // submit button handler code
  };

  return (
    <section className={styles.contribute_main}>
      <NavigationBar />
      <h1>Contribute to Our DataBase</h1>
      <div className={styles.contribute_container}>
        <form action="" className={styles.form}>
          <div>
            <p className={styles.input_label}>Recipe Name</p>
            <input
              placeholder=""
              className={styles.search_input}
              type="text"
              name=""
              id=""
              value={recipeName}
              data-key="RECIPE_NAME"
              onChange={eventDataHandler}
            />
          </div>

          <div>
            <p className={styles.input_label}>Region from it belongs</p>
            <input
              placeholder="for eg, american, indian..."
              className={styles.search_input}
              type="text"
              name=""
              id=""
              value={recipeArea}
              data-key="RECIPE_AREA"
              onChange={eventDataHandler}
            />
          </div>

          <div className={styles.file_div}>
            <p className={styles.input_label}>Thumbnail</p>
            {/* <label htmlFor="file-upload" className={styles.input_label}>

            </label> */}
            {/* <input
              type="file"
              id="file-upload"
              src=""
              alt=""
              data-key="RECIPE_IMG"
              value={thumbnail}
              onChange={eventDataHandler}
              className={styles.file_input}
            /> */}
            <label className={styles.custum_file_upload} for="file">
              <div className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill=""
                  viewBox="0 0 24 24"
                >
                  <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                  <g
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    id="SVGRepo_tracerCarrier"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      fill=""
                      d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>{" "}
                  </g>
                </svg>
              </div>
              <div className={styles.text}>
                <span>Click to upload image</span>
              </div>
              <input type="file" id="file" />
            </label>
          </div>

          <div className={styles.youtube_div}>
            <p className={styles.input_label}>Youtube Video</p>
            <input
              placeholder="https://youtu.be/..."
              className={styles.search_input}
              type="text"
              name=""
              id=""
              value={youtubeVideoLink}
              data-key="YOUTUBE_VIDEO"
              onChange={eventDataHandler}
            />
          </div>

          <div className={styles.ingredients_div}>
            <p className={styles.input_label}>
              Ingredients needed to prepare this
            </p>
            <textarea
              name=""
              placeholder="eg: Basmati Rice: 2 Cups, Ghee: 2 Tbsp..."
              id=""
              cols="30"
              rows="10"
              data-key="INGREDIENTS"
              onChange={eventDataHandler}
              value={ingredients}
            ></textarea>
          </div>

          <div className={styles.instructions_div}>
            <p className={styles.input_label}>
              Instructions / steps to prepare,
            </p>
            <textarea
              name=""
              placeholder="eg: Wash the rice and soak in water for twenty minutes"
              id=""
              cols="30"
              rows="10"
              value={instructions}
              data-key="INSTRUCTIONS"
              onChange={eventDataHandler}
            ></textarea>
          </div>
          <button
            className={`${styles.submit_button}`}
            onClick={submitButtonHandler}
          >
            submit
          </button>
        </form>
      </div>
      <About />
    </section>
  );
};

export default contribute;
