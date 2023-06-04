import { ADD_CONTACT, ContactActionTypes } from './addContacts.types';

const initialState: any = {
  contacts: [],
};

const addContactsReducer = (state = initialState, action: ContactActionTypes): any => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    default:
      return state;
  }
};

export default addContactsReducer;
