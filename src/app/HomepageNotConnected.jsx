import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import CenterContent from '../views/common/CenterContent';
import Typography from '@material-ui/core/Typography/Typography';
import Container from '../views/common/Container';
import AirtableIcon from '../../assets/airtable_icon.jpg';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { connectApi } from '../middlewares/Api/thunks';
import ToggleSwitch from '../views/common/ToggleSwitch';
import cookie from 'react-cookies';

const extractor = state => ({
});

const dispatcher = dispatch => ({
  connectApi: (form) => dispatch(connectApi(form)),
});

class HomepageNotConnected extends Component {
  state = {};

  connect = () => {
    this.props.connectApi({
      airtableID: this.state.airtableID,
      baseID: this.state.baseID,
      remember: this.state.remember,
    });
  };

  render() {
    return (
      <div className="App">
        <CenterContent>
          <Container middle>
            <img src={AirtableIcon} height={32} />
            <Typography variant={'title'}>
              Connexion
            </Typography>
          </Container>
          <i>Connectez-vous a Airtable.</i>
          <p>
            Pour trouver votre identifiant Airtable, consultez votre page "Account" sur le site Airtable.
          </p>
          <hr/>
          <TextField
            id="airtable_account_id"
            label="Airtable Account ID"
            value={this.state.airtableID}
            margin="dense"
            onChange={(e) => this.setState({ airtableID: e.target.value })}
            onKeyPress={this.handleKey}
            className={''}
            variant={'outlined'}
            fullWidth
          />
          <TextField
            id={"airtable_base_id"}
            label="Airtable Base ID"
            value={this.state.baseID}
            margin="dense"
            onChange={(e) => this.setState({ baseID: e.target.value })}
            onKeyPress={this.handleKey}
            className={''}
            variant={'outlined'}
            fullWidth
          />
          <ToggleSwitch
            label={'Rester connecte'}
            onChange={(checked) => this.setState({ remember: checked })}
          />
          <div style={{ width: '100%', textAlign: 'center', marginTop: '12px' }}>
            <Button
              disabled={this.state.airtableID === undefined || this.state.baseID === undefined}
              color={'primary'}
              variant={'contained'}
              fullWidth
              onClick={this.connect}
            >
              Valider
            </Button>
          </div>
        </CenterContent>
      </div>
    );
  }
}

const Homepage = withRouter(connect(extractor, dispatcher)(HomepageNotConnected));
export default Homepage;
