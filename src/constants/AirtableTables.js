import USERS from './Users';

export const HISTORY_TABLES = {
  TaskHistory: 'TaskHistory',
};

export const PLD_TABLES = {
  RevisionHistory: 'RevisionHistory',
  Reporting: 'Reporting',
  Comments: 'Comments',
};

const AIRTABLE_TABLES = {
  Actors: 'Actors',
  Projects: 'Projects',
  Stories: 'Stories',
  Features: 'Features',
  Tasks: 'Tasks',
  Sprints: 'Sprints',
  Releases: 'Releases',
  Comments: 'Comments',
  Notifications: 'Notifications',
  FelixTasks: {
    name: 'Tasks',
    label: 'Felix\'s Tasks',
    user: USERS.Felix,
    filter: (task) => {
      return task.Owner && task.Owner.id === USERS.Felix.airtableId;
    }
  },
  RomainsTasks: {
    name: 'Tasks',
    label: 'Romain\'s Tasks',
    user: USERS.Romain,
    filter: (task) => {
      return task.Owner && task.Owner.id === USERS.Romain.airtableId;
    }
  },
  ClarasTasks: {
    name: 'Tasks',
    label: 'Clara\'s Tasks',
    user: USERS.Clara,
    filter: (task) => {
      return task.Owner && task.Owner.id === USERS.Clara.airtableId;
    }
  },
  StacysTasks: {
    name: 'Tasks',
    label: 'Stacy\'s Tasks',
    user: USERS.Stacy,
    filter: (task) => {
      return task.Owner && task.Owner.id === USERS.Stacy.airtableId;
    }
  },
  ThomasTasks: {
    name: 'Tasks',
    label: 'Thomas\'s Tasks',
    user: USERS.Thomas,
    filter: (task) => {
      return task.Owner && task.Owner.id === USERS.Thomas.airtableId;
    }
  },
  MichaelTasks: {
    name: 'Tasks',
    label: 'Michael\'s Tasks',
    user: USERS.Michael,
    filter: (task) => {
      return task.Owner && task.Owner.id === USERS.Michael.airtableId;
    }
  },
};

export const SINGULAR_NAMES = {
  Actors: 'Actor',
  Projects: 'Project',
  Stories: 'Story',
  Features: 'Feature',
  Tasks: 'Task',
  Sprints: 'Sprint',
  Releases: 'Release',
  Comments: 'Comment',
  Notifications: 'Notifications',
};

export const TABLES_ID = {
  Actors: 'tbl9v0vU6mMBzuOMU/viwqu5lsnOUaVDFOd',
  Projects: 'tblmq9JiGocXsnwpM/viwSSFsV9iJEJMpgE',
  Stories: 'tblnDMeIuFVDaHybN/viwbz5LX3SgExPLtK',
  Features: 'tblD9ZrTxbXo8wd4b/viwbL3AtC4j1NKou2',
  Tasks: 'tblWPNjwIB1cA3wZQ/viwjy952BU9ap8fyS',
  Sprints: 'tblxkuTviGp5pxhZM/viwFj45aUA0x4e89t',
  Releases: 'tblC5x2F9OuoaZ9rH/viwg9uRhbzDrisLQZ',
  Comments: 'tbl3ZjiZ54JIvCzb4/viwfvkkmlQEV6gaz5',
  TaskHistory: 'tblRc9qmNZ96tztkd/viwJ8IZNcNTv0eOjB',
  Notifications: 'tblCmnkENDQNxOg37/viwK2eZDOszByVUn7'
};

export default AIRTABLE_TABLES;

