// @flow
import React from 'react';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import ChevronRight from 'material-ui-icons/ChevronRight';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

export default ({
  totalNumberOfEntries,
  start,
  entriesPerPage,
  changePage
}) => {
  const numberOfPages = Math.ceil(totalNumberOfEntries / entriesPerPage);
  const currentPageNum = Math.ceil(start / entriesPerPage) + 1;
  const prevStart = start > entriesPerPage ? start - entriesPerPage : 0;

  const pageButtons = Array
    .from(Array(numberOfPages))
    .map((elem, index) => {
      const page = index + 1;
      const onClickFunc = () => changePage(entriesPerPage * index, entriesPerPage);

      return (
        <Button key={`page-${page}-btn`} onClick={onClickFunc}>
          {page}
        </Button>);
    });

  return (
    <div>
      <IconButton
        disabled={start === 0}
        onClick={() => changePage(prevStart, entriesPerPage)}
      >
        <ChevronLeft />
      </IconButton>
      { pageButtons }
      <IconButton
        disabled={start + entriesPerPage >= totalNumberOfEntries}
        onClick={() => changePage(start + entriesPerPage, entriesPerPage)}
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
};
