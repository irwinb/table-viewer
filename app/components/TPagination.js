//@flow
import React, { PropTypes } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import ChevronRight from 'material-ui-icons/ChevronRight';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';

const TPagination = ({
  totalNumberOfEntries,
  start,
  entriesPerPage,
  changePage
}) => {
  const numberOfPages = Math.ceil(totalNumberOfEntries / entriesPerPage);
  const currentPageNum = Math.ceil(start / entriesPerPage) + 1;
  const prevStart = start > entriesPerPage ? start - entriesPerPage : 0;
  
  return (
    <div>
      <IconButton 
        disabled={start === 0} 
        onClick={() => changePage(prevStart, entriesPerPage)}>
        <ChevronLeft/>
      </IconButton>
      {Array
        .from(Array(numberOfPages))
        .map((elem, index) => 
          <Button key={index + 1}>{index + 1}</Button>)}
      <IconButton 
        disabled={start + entriesPerPage >= totalNumberOfEntries} 
        onClick={() => changePage(start + entriesPerPage, entriesPerPage)}>
        <ChevronRight/>
      </IconButton>
    </div>
  );
}

export default TPagination;
