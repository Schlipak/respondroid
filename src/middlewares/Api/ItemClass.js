import APIS from '../../constants/Apis';

class Item {
  constructor(apiSource, id, fields, toKeep) {
    this.apiSource = apiSource;
    this.id = id;
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
    } catch (e) {
      this.error = e;
    }
  }

  static serialize(item) {
    const next = { ...item.fields };
    const fieldsCopy = { ...next.Fields };
    let serialized;
    if (item.apiSource === APIS.Airtable) {
      if (item.fields.Fields) {
        const removable = ['editable', 'locked', 'methods', 'classMethods'];
        removable.forEach(key => {
          fieldsCopy[key] = fieldsCopy[key].filter(attr => attr._remove === undefined || attr._remove !== true);
        });
        // fieldsCopy.locked = fieldsCopy.locked.filter(attr => attr._remove === undefined || attr._remove !== true);
        // fieldsCopy.methods = fieldsCopy.methods.filter(attr => attr._remove === undefined || attr._remove !== true);
        // fieldsCopy.classMethods = fieldsCopy.classMethods.filter(attr => attr._remove === undefined || attr._remove !== true);
        item.fields.Fields = fieldsCopy;
        serialized = JSON.stringify(fieldsCopy);
        console.log('serialized', serialized);
        next.Fields = serialized;
      }
    }
    Object.keys(next).forEach(key => {
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
