import { type FC, type Dispatch, type SetStateAction } from 'react';

import { getPages } from '../../../utils/format';

import { IoArrowBack } from 'react-icons/io5';
import { IoArrowForward } from 'react-icons/io5';
import './Pagination.css';

type PaginationProps = {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  maxPages: number;
};

type PaginationNumberProps = {
  page: number;
  number: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const Pagination: FC<PaginationProps> = ({ maxPages, page, setPage }) => {
  const isPrevIconDisabled = page === 1;
  const isNextIconDisabled = page === maxPages;
  const pageNumbers = Array.from({ length: maxPages }, (_, index) => index + 1);
  const pages = getPages(page, maxPages);

  const onPreviousClick = () => {
    if (!isPrevIconDisabled) {
      setPage((prev) => prev - 1);
    }
  };

  const onNextCLick = () => {
    if (!isNextIconDisabled) {
      setPage((prev) => prev + 1);
    }
  };

  const getPageNumbers = () => {
    const elements: any = [];

    if (pages[0] === 1) {
      pages.forEach((number) => {
        elements.push(
          <PaginationNumber key={number} page={page} number={number} setPage={setPage} />,
        );
      });
      elements.push(
        <span className="dots" key="dots-end">
          ...
        </span>,
      );
      elements.push(
        <PaginationNumber key={maxPages} page={page} number={maxPages} setPage={setPage} />,
      );
      return elements;
    }

    if (pages.length === 3) {
      elements.push(<PaginationNumber key={1} page={page} number={1} setPage={setPage} />);
      elements.push(
        <span className="dots" key="dots-start">
          ...
        </span>,
      );

      pages.forEach((number) => {
        elements.push(
          <PaginationNumber key={number} page={page} number={number} setPage={setPage} />,
        );
      });

      elements.push(
        <span className="dots" key="dots-end">
          ...
        </span>,
      );
      elements.push(
        <PaginationNumber key={maxPages} page={page} number={maxPages} setPage={setPage} />,
      );
      return elements;
    }

    if (pages[pages.length - 1] === maxPages) {
      elements.push(<PaginationNumber key={1} page={page} number={1} setPage={setPage} />);
      elements.push(
        <span className="dots" key="dots-start">
          ...
        </span>,
      );
      pages.forEach((number) => {
        elements.push(
          <PaginationNumber key={number} page={page} number={number} setPage={setPage} />,
        );
      });
      return elements;
    }

    return null;
  };

  return (
    <div className="pagination-wrapper">
      <div
        className={`pagination-icon-wrapper ${isPrevIconDisabled ? 'disabled' : ''}`}
        onClick={onPreviousClick}
      >
        <IoArrowBack size={20} />
      </div>
      <div className="pagination-range">
        {maxPages <= 7
          ? pageNumbers.map((number: number) => (
              <PaginationNumber key={number} page={page} number={number} setPage={setPage} />
            ))
          : getPageNumbers()}
      </div>
      <div
        className={`pagination-icon-wrapper ${isNextIconDisabled && 'disabled'}`}
        onClick={onNextCLick}
      >
        <IoArrowForward size={20} />
      </div>
    </div>
  );
};

const PaginationNumber: FC<PaginationNumberProps> = ({ page, number, setPage }) => {
  return (
    <div
      className={`pagination-number ${page === number ? 'pagination-number__active' : ''}`}
      onClick={() => setPage(number)}
      key={number}
    >
      <span>{number}</span>
    </div>
  );
};

export default Pagination;
