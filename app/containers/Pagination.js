// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePagination } from '../actions/pagination';
import Pagination from '../components/Pagination';
import getTotalCount from '../selectors/pagination';

function mapStateToProps(state) {
  return {
    start: state.tableExplorer.pagination.start,
    countPerPage: state.tableExplorer.pagination.countPerPage,
    totalCount: getTotalCount(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePage: updatePagination }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
