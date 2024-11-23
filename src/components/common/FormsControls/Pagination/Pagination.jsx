import React from "react";
import classes from "./Pagination.module.css";

const Pagonation = (props) => {
  const { totalUsersCount, pageSize, currentPage, onPageChanged } = props;

  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page) => {
        return (
          <span
            className={currentPage === page && classes.selectedPage}
            onClick={(e) => {
              onPageChanged(page);
            }}
          >
            {page}
          </span>
        );
      })}
    </div>
  );
};

export default Pagonation;
