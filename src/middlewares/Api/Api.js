/**
 *
 */

import AirtableApi from './AirtableApi';

class Api {
  connect(form) {
    this.form = form;
    if (form.airtableID !== undefined) {
      this.internal = new AirtableApi(form);
      return new Promise((resolve) => {
        this.internal.connect().then((response) => {
          resolve(response);
        });
      });
    }
    throw new Error('Unsupported API or invalid parameters');
  }

  disconnect() {
    return this.internal.disconnect();
  }

  destroy(table, id) {
    return this.internal.destroy(table, id);
  }

  table(name) {
    return this.internal.table(name);
  }

  create(table, item) {
    return this.internal.create(table, item);
  }

  update(table, id, next) {
    return this.internal.update(table, id, next);
  }

  sync(item) {
    return this.internal.sync(item);
  }
}

export default Api;
