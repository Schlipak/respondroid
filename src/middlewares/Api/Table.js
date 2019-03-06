export default class Table {
  constructor(name) {
    this.name = name;
    this.content = [];
  }

  add(record) {
    this.content.push(record);
  }

  static findById(table, id) {
    let found;
    let e;
    try {
      found = table.content.find((record) => {
        if (record.id !== undefined && record.id === id) {
          return true;
        }
        return false;
      });
    } catch (error) {
      e = error;
    }
    return found || `error: ${e}`;
  }

  static findByName(table, name) {
    let found;
    let e;
    try {
      found = table.content.find((record) => {
        if (record.fields.Name !== undefined && record.fields.Name === name) {
          return true;
        }
        return false;
      });
    } catch (error) {
      e = error;
    }
    return found || `error: ${e}`;
  }

  static getFieldByParentName(table, name, field = 'Value') {
    const t = Table.findByName(table, name);
    if (t && t.fields && t.fields[field]) {
      return t.fields[field];
    }
    return '...';
  }
}
