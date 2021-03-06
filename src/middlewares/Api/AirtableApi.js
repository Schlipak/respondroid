import Airtable from 'airtable';
// import cookie from 'react-cookies';
import Table from './Table';
import Item from './ItemClass';
import APIS from '../../constants/Apis';
// import APIS from '../../constants/Apis';

export default class AirtableApi {
  constructor(form) {
    this.form = form;
    this.apiKey = form.airtableID;
    this.baseID = form.baseID;
    this.tables = {};
    if (form.remember) {
      // cookie.save('airtableID', form.airtableID, { path: '/' });
      // cookie.save('baseID', form.baseID, { path: '/' });
    }
  }

  connect() {
    this.airtable = new Airtable({
      endpointUrl: 'https://api.airtable.com',
      apiKey: this.apiKey,
    });
    this.base = this.airtable.base(this.baseID);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.base);
      }, 100);
    });
  }

  disconnect() {
    this.apiKey = undefined;
    this.baseID = undefined;
    this.airtable = undefined;
    this.base = undefined;
    this.tables = {};
    return Promise.resolve(true);
  }

  table(name, max = 50) {
    return new Promise((resolve) => {
      const table = new Table(name);
      this.tables[name] = table;
      this.base(name).select({
        maxRecords: max,
      }).eachPage((records, fetchNextPage) => {
        // This function (`page`) will get called for each page of records.
        records.forEach((record) => {
          const toKeep = Object.keys(record.fields);
          table.add(new Item(APIS.Airtable, record.id, record.fields, toKeep, name));
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      }, () => {
        // TODO: Add error handling
        resolve(table);
      });
    });
  }

  create(table, item) {
    return new Promise((resolve) => {
      this.base(table)
        .create(item, (err, record) => {
          const toKeep = Object.keys(record.fields);
          const nextItem = new Item(APIS.Airtable, record.id, record.fields, toKeep, table);
          resolve({
            err,
            item: nextItem,
          });
        });
    });
  }

  destroy(table, id) {
    return new Promise((resolve) => {
      this.base(table).destroy(id, (err, deletedRecord) => {
        resolve({ err, record: deletedRecord });
      });
    });
  }

  update(table, id, next) {
    return new Promise((resolve) => {
      this.base(table).update(id, next, (err, record) => {
        resolve({ err, record });
      });
    });
  }

  sync(item, table = 'Types') {
    return new Promise((resolve) => {
      this.base(table).update(item.id, Item.serialize(item), (err, record) => {
        if (!err) {
          const toKeep = Object.keys(record.fields);
          const nextItem = new Item(APIS.Airtable, record.id, record.fields, toKeep, table);
          resolve({ err, item: nextItem });
        }
        resolve({ err });
      });
    });
  }
}
