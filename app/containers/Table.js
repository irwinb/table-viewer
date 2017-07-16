// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Table from '../components/table';
import TextRow from '../components/TextRow';
import { changePage } from '../components/table/actions';
import getCurrentPageRows from '../components/table/selectors';

function mapStateToProps(state) {
  return {
    rows: getCurrentPageRows(state),
    columns: state.tableExplorer.table.columns,
    page: state.page,
    rowType: TextRow
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
