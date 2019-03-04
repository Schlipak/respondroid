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
    return new Promise(resolve => {
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
    return Promise.resolve(true);
  }

  table(name, max=50) {
    return new Promise(resolve => {
      const table = new Table(name);
      this.base(name).select({
        maxRecords: max,
      }).eachPage((records, fetchNextPage) => {
        // This function (`page`) will get called for each page of records.
        console.log('records: ', records);
        records.forEach(function (record) {
          console.log('Retrieved', record);
          const toKeep = Object.keys(record.fields);
          table.add(new Item(APIS.Airtable, record.id, record.fields, toKeep));
        });

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      }, (err) => {
        if (err) { console.error(err); }
        resolve(table);
      });
    });
  }

  update(table, id, next) {
    return new Promise((resolve) => {
      console.log(`Started update in table ${table} on item ${id} to change keys ${Object.keys(next)}`)
      this.base(table).update(id, next, (err, record) => {
        if (err) {
          console.log(`ERROR WHEN UPDATING ITEM ${id}: ${err}`)
        } else {
          console.log(`UPDATE SUCCESS ${id}: ${record}`)
        }
        resolve({
          err, record
        });
      });
    });
  }

  sync(item) {
    console.log('DEBUG SYNC', item);
    return new Promise(resolve => {
      this.base('Types').update(item.id, Item.serialize(item), (err, record) => {
        if (err) {
          resolve(err, null);
        }
        resolve(null, record);
      });
    });
  }
}
