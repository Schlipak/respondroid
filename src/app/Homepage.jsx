import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomepageNotConnected from './HomepageNotConnected';
import Layout from './Layout';
import { selectApi } from '../ducks/api';
import HomepageConnected from './HomepageConnected';

const extractor = state => ({
  connectedToApi: selectApi(state).connected,
});

const dispatcher = dispatch => ({
});

class Homepage extends Component {
  render() {
    const { connectedToApi } = this.props;
    return (
      <Layout>
        {
          !connectedToApi ? <HomepageNotConnected /> : <HomepageConnected />
        }
      </Layout>
    );
  }
}

const ConnectedHomepage = connect(extractor, dispatcher)(Homepage);
export default ConnectedHomepage;
