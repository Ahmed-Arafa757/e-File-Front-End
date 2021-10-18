import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../_models/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  lockedContacts = [{ contactId: '', user: '', locked: false }];
  contacts: Contact[] = [];
  baseUrl = 'http://localhost:3000/';


  constructor(private httpClient: HttpClient) { }

  getAllContacts(page,limit) {

    return this.httpClient.get(`${this.baseUrl}contacts?page=${page}&limit=${limit}`);

  }

  getContactById(id) {

    return this.httpClient.get(`${this.baseUrl}contact/id/${id}`);

  }

  addContact(contact: Contact) {

    const newContact: Contact = {
      name: contact.name,
      phone: contact.phone,
      address: contact.address,
      notes: contact.notes,
 };

    return this.httpClient.post(`${this.baseUrl}contact/add`, newContact);

  }

  updateContact(contact: Contact) {

    const updatedContact: Contact = {
      _id: contact._id,
      name: contact.name,
      phone: contact.phone,
      address: contact.address,
      notes: contact.notes,

    }; 

    return this.httpClient.put(`${this.baseUrl}contact/${updatedContact._id}`, updatedContact);
  }

  deleteContact(id: string) {

    return this.httpClient.delete(`${this.baseUrl}contact/${id}`);
  }

  SearchByName(res, searchQuery) {
    const NAME = searchQuery.toLowerCase();
    this.contacts = res;

    return this.contacts.filter(c => c.name.toLowerCase().includes(NAME));

  }

  SearchByPhoneNum(res, searchQuery) {
    const NUMBER = searchQuery.toLowerCase();
    this.contacts = res;

    return this.contacts.filter(n => n.phone.toLowerCase().includes(NUMBER));

  }
}
