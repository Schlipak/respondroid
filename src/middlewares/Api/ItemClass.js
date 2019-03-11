import APIS from '../../constants/Apis';

class Item {
  constructor(apiSource, id, fields, toKeep, table) {
    this.apiSource = apiSource;
    this.id = id;
    this.table = table;
    this.toKeep = toKeep;
    this.fields = { ...fields };
    if (this.apiSource === APIS.Airtable) {
      this.deserializeAirtableItem();
    }
  }

  deserializeAirtableItem() {
    try {
      if (this.fields.Fields) {
        const parsed = JSON.parse(this.fields.Fields);
        this.fields.Fields = { ...parsed };
      }
      if (this.table === 'Database') {
        this.fields.Value = JSON.parse(this.fields.Value);
      }
    } catch (e) {
      this.error = e;
    }
  }

  static serialize(item) {
    const next = { ...item.fields };
    const fieldsCopy = { ...next.Fields };
    let serialized;
    if (item.apiSource === APIS.Airtable) {
      if (item.fields.Value && item.table === 'Database') {
        try {
          next.Value = JSON.stringify(next.Value);
          if (next.CreatedAt) {
            delete next.CreatedAt;
          }
        } catch (e) {}
      }
      if (item.fields.Fields) {
        const removable = ['editable', 'locked', 'methods', 'classMethods'];
        removable.forEach((key) => {
          fieldsCopy[key] = fieldsCopy[key].filter(attr => attr.remove === undefined || attr.remove !== true);
        });
        item.fields.Fields = fieldsCopy;
        serialized = JSON.stringify(fieldsCopy);
        console.log('serialized', serialized);
        next.Fields = serialized;
      }
    }
    Object.keys(next).forEach((key) => {
      if (!item.toKeep.find(it => it === key)) {
        delete next[key];
      }
    });
    // Index key is always reserved for auto number and is computed.
    delete next.Index;
    return next;
  }
}

export default Item;
