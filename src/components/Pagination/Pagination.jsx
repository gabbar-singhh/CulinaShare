import React, { useEffect } from "react";
import styles from "./Pagination.module.css";

const Pagination = (props) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(props.totalMeals / props.mealsPerPage); i++) {
    pages.push(i);
  }

  return (
    <section className={styles.pagination_main}>
      {pages.length > 1 &&
        pages.map((pageNo, index) => {
          return (
            <span
              className={styles.page_button}
              onClick={() => props.setCurrentPage(pageNo)}
              key={index}
            >
              {pageNo}
            </span>
          );
        })}
    </section>
  );
};

export default Pagination;
