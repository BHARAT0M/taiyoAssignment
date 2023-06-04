import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import addContactsReducer from './Add_Contacts/addContacts.reducer';

const rootReducer = combineReducers({
  addContacts: addContactsReducer,
});

const store = createStore(rootReducer);

export default store;
