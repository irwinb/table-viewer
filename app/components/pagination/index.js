// @flow
import React from 'react';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import ChevronRight from 'material-ui-icons/ChevronRight';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import type { ChangePage } from './types';

export default (props: {
  totalNumberOfElements: number,
  start: number,
  elementsPerPage: number,
  changePage: ChangePage
}) => {
  const { totalNumberOfElements, start, elementsPerPage, changePage } = props;

  const numberOfPages = Math.ceil(totalNumberOfElements / elementsPerPage);
  const currentPageNum = Math.ceil(start / elementsPerPage) + 1;
  const prevStart = start > elementsPerPage ? start - elementsPerPage : 0;
  console.log(start);
  const pageButtons = Array
    .from(Array(numberOfPages))
    .map((elem, index) => {
      const page = index + 1;
      return (
        <Button
          disabled={page === currentPageNum}
          key={`page-${page}-btn`}
          onClick={() => changePage(elementsPerPage * index)}
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
        disabled={start + elementsPerPage >= totalNumberOfElements}
        onClick={() => changePage(start + elementsPerPage)}
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
};
