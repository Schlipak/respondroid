import {
  error, info, success, warning,
} from 'react-notification-system-redux';

class Notify {
  setup(dispatch, getState) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.pos = 'tr';
  }

  setPos(pos) {
    this.pos = pos;
  }

  prep(message) {
    if (typeof message === 'object') {
      return JSON.stringify(message);
    }
    return message;
  }

  info(message) {
    if (this.dispatch) {
      this.dispatch(info({ title: this.prep(message), position: this.pos }));
    }
  }

  success(message) {
    if (this.dispatch) {
      this.dispatch(success({ title: this.prep(message), position: this.pos }));
    }
  }

  warn(message) {
    if (this.dispatch) {
      this.dispatch(warning({ title: this.prep(message), position: this.pos }));
    }
  }

  error(message) {
    if (this.dispatch) {
      this.dispatch(error({ title: this.prep(message), position: 'tr' }));
    }
  }
}

export default Notify;
