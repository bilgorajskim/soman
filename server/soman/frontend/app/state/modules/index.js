import {combineReducers} from 'redux';
import ui from './ui.js';
import notes from './notes.js';
import account from './account.js';

export default combineReducers({ui, notes, account});
