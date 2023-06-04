import { ADD_CONTACT, AddContactAction, Contact } from './addContacts.types';

export const addContact = (contact: Contact): AddContactAction => ({
  type: ADD_CONTACT,
  payload: contact,
});
