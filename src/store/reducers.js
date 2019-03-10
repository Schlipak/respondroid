import user from '../ducks/user';
import loaders from '../ducks/Loaders';
import api from '../ducks/api';
import menu from '../ducks/menu';
import editor from '../ducks/editor';
import itemEditor from '../ducks/itemEditor';
import popup from '../ducks/popup';

const reducers = {
  user,
  loaders,
  api,
  menu,
  editor,
  itemEditor,
  popup,
};

export default reducers;
