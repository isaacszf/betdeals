import { useEffect, useState } from "react";

import styles from "./pagination.module.css";

type Props = {
  onClickFunction: (arg: number) => void;
  currentPage: number;
  totalPages: number;
};

export default function Pagination({
  totalPages,
  currentPage,
  onClickFunction,
}: Props) {
  const [internalPage, setInternalPage] = useState(currentPage);

  const maxPageButtons = 6;

  const getPageNumbers = () => {
    let startPage = Math.max(1, internalPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const handlePageClick = (page: number) => {
    setInternalPage(page);
    onClickFunction(page);
  };

  useEffect(() => {
    setInternalPage(currentPage);
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <button
        className={styles.arrow}
        onClick={() => handlePageClick(Math.max(1, internalPage - 1))}
        disabled={internalPage === 1 || totalPages === 0}
      >
        {"<"}
      </button>

      <div className={styles.pages}>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            disabled={page === internalPage}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className={styles.arrow}
        onClick={() => handlePageClick(Math.min(totalPages, internalPage + 1))}
        disabled={internalPage === totalPages || totalPages === 0}
      >
        {">"}
      </button>
    </div>
  );
}
