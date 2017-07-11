import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TableExplorer from '../components/table-explorer';
import { changePage } from '../components/table/actions';
import getCurrentPageRows from '../components/table/selectors';

function mapStateToProps(state) {
  return {
    rows: getCurrentPageRows(state),
    columns: state.table.columns,
    totalNumberOfRows: state.table.rows.length
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableExplorer);
