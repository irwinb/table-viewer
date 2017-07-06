import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Table from '../components/Table';
import * as TableActions from '../actions/table';

function mapStateToProps(state) {
  return {
    data: state.table.data
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TableActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
