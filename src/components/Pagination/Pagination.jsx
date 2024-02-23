import React, { useEffect } from "react";
import styles from "./Pagination.module.css";

const Pagination = (props) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(props.totalMeals / props.mealsPerPage); i++) {
    pages.push(i);
  }

  return (
    <section>
      {pages.map((pageNo, index) => {
        return (
          <>
            <button
              className={styles.page_button}
              onClick={() => props.setCurrentPage(pageNo)}
              key={index}
            >
              {pageNo}
            </button>
          </>
        );
      })}
    </section>
  );
};

export default Pagination;
