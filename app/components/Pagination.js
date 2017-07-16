// @flow
import React from 'react';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import ChevronRight from 'material-ui-icons/ChevronRight';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

export default (props: {
  start: number,
  countPerPage: number,
  totalCount: number,
  changePage: (number) => void
}) => {
  const { start, countPerPage, totalCount, changePage } = props;

  const numberOfPages = Math.ceil(totalCount / countPerPage);
  const currentPageNum = Math.ceil(start / countPerPage) + 1;
  const prevStart = start > countPerPage ? start - countPerPage : 0;

  const pageButtons = Array
    .from(Array(numberOfPages))
    .map((elem, index) => {
      const page = index + 1;
      return (
        <Button
          disabled={page === currentPageNum}
          key={`page-${page}-btn`}
          onClick={() => changePage(countPerPage * index)}
        >
          {page}
        </Button>);
    });

  return (
    <div>
      <IconButton
        disabled={start === 0}
        onClick={() => changePage(prevStart)}
      >
        <ChevronLeft />
      </IconButton>
      { pageButtons }
      <IconButton
        disabled={start + countPerPage >= totalCount}
        onClick={() => changePage(start + countPerPage)}
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
};
