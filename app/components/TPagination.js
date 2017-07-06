//@flow
import React, { PropTypes } from 'react';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import IconButton from 'material-ui/IconButton';

const TPagination = ({
  totalNumberOfEntries,
  start,
  entriesPerPage,
  changePage
}) => {
  try {
    const numberOfPages = Math.ceil(totalNumberOfEntries / entriesPerPage);
    const currentPageNum = Math.ceil(start / entriesPerPage) + 1;
    const prevStart = start > entriesPerPage ? start - entriesPerPage : 0;

    return (
      <div>
        <IconButton disabled={start === 0} onClick={changePage(prevStart, entriesPerPage)}>
          <ChevronLeft/>
        </IconButton>
        {Array
          .from(Array(numberOfPages))
          .map((elem, index) => 
            <IconButton key={index + 1}>{index + 1}</IconButton>)}
        <IconButton disabled={start + entriesPerPage >= totalNumberOfEntries} onClick={changePage(start + entriesPerPage, entriesPerPage)}>
          <ChevronRight/>
        </IconButton>
      </div>
    );
  } catch (e) {
    console.log(e);
  }
}

export default TPagination;