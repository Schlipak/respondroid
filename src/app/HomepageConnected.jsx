import React from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';
import { connect } from 'react-redux';
import { selectApi } from '../ducks/api';
import CenterContent from '../views/common/CenterContent';
import Table from '../middlewares/Api/Table';
import BasicTabs from '../views/common/BasicTabs';
import ClassIcon from '@material-ui/icons/Class';
import ToolTipIconButton from '../views/common/ToolTipIconButton';
import TableView from '../views/TableView';

const extractor = state => ({
  api: selectApi(state),
});

const dispatcher = dispatch => ({
});

class HomepageConnected extends React.Component {
  render() {
    const table = this.props.api.tables.Types || {};
    const types = table.content || [];
    return (
      <div style={{ padding: '8px', width: '100%' }}>
        <BasicTabs
          infos={
            types.map(type => {
              const icon = <ToolTipIconButton
                message={type.fields.Description}
                icon={<ClassIcon style={{ height: '16px' }}/>}
                placement={'top'}
              />;
              return {
                label: type.fields.Name,
                icon,
              };
            })
          }
          children={
            types.map(type => {
              return <TableView type={type} />;
            })
          }
        />
      </div>
    );
  }
}

const ConnectedHomepageConnected = connect(extractor, dispatcher)(HomepageConnected);
export default ConnectedHomepageConnected;
