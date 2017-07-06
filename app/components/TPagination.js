//@flow
import React, { PropTypes } from 'react';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import ChevronLeft from 'material-ui-icons/navigation/chevron-left';
import ChevronRight from 'material-ui-icons/navigation/chevron-right';
import FlatButton  from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';

const styleSheet = createStyleSheet('IconButtons', theme => ({
  button: {
    margin: theme.spacing.unit,
  },
}));

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
        <IconButton 
          disabled={start === 0} 
          onClick={() => changePage(prevStart, entriesPerPage)}>
          <ChevronLeft/>
        </IconButton>
        {Array
          .from(Array(numberOfPages))
          .map((elem, index) => 
            <FlatButton key={index + 1}>{index + 1}</FlatButton>)}
        <IconButton 
          disabled={start + entriesPerPage >= totalNumberOfEntries} 
          onClick={() => changePage(start + entriesPerPage, entriesPerPage)}>
          <ChevronRight/>
        </IconButton>
      </div>
    );
  } catch (e) {
    console.log(e);
  }
}

IconButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(TPagination);
