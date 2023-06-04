export const ADD_CONTACT = 'ADD_CONTACT';

export interface Contact {
  id: string;
  name: string;
  lastName: string;
  status: string;
}

export interface AddContactAction {
  type: typeof ADD_CONTACT;
  payload: Contact;
}

export type ContactActionTypes = AddContactAction;
