import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import TableExplorer from '../components/TableExplorer';
import { changePage } from '../actions/table';

function mapStateToProps(state) {
  return {
    rows: state.table.rows,
    columns: state.table.columns
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changePage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableExplorer);
