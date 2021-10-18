import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/_models/contacts';
import { ContactsService } from 'src/app/_services/contacts.service';

@Component({
  selector: 'app-contact-listing',
  templateUrl: './contact-listing.component.html',
  styleUrls: ['./contact-listing.component.scss']
})
export class ContactListingComponent implements OnInit {

  currentUser;
  isLocked = false;
  LockedContacts;
  contacts;
  numOfPages: number[] = [];
  contactPerPage = 5;
  currentPage = 1;
  lastPage = 1;
  isModalOpen = false;
  contact: Contact = { name: '', phone: '', address: '', notes: '' };
  nameSearchQuery = '';
  phoneSearchQuery = '';

  constructor(private contactsService: ContactsService) { }

  ngOnInit() {
    // get the locked contacts
    this.LockedContacts = this.contactsService.lockedContacts;

    // get paginated contacts to show
    this.contactsService.getAllContacts(this.currentPage, this.contactPerPage).subscribe(
      (res) => {

        this.contacts = res['resultedContacts'];
        this.HandleNumberOfPages(res);
      },
      (err) => {
        console.log(err);
      },
      () => { },
    );


    this.currentUser = localStorage.getItem('user name');
  }

// pagination handling
  HandleNumberOfPages(res) {

    if (res['previous'] && res['next']) {
      this.lastPage = res['next']['page'];

      this.numOfPages.push(res['previous']['page'], this.currentPage, res['next']['page']);
    } else if (res['previous'] && !res['next']) {
      this.lastPage = this.currentPage;

      this.numOfPages.push(res['previous']['page'], this.currentPage);

    } else if (!res['previous'] && res['next']) {
      this.lastPage = res['next']['page'];

      this.numOfPages.push(this.currentPage, res['next']['page']);

    } else if (!res['previous'] && !res['next']) {
      this.lastPage = this.currentPage;
      this.numOfPages.push(this.currentPage);
    }
  }

// pagination arrows handling
  navigate(status) {
    if (status == "inc") {
      this.currentPage >= this.lastPage ? this.currentPage : this.currentPage = this.currentPage + 1;
      this.contactsService.getAllContacts(this.currentPage, this.contactPerPage).subscribe(
        (res) => {
          this.numOfPages = [];

          this.contacts = res['resultedContacts'];
          this.HandleNumberOfPages(res);

        },
        (err) => {
          console.log(err);
        },
        () => {

          if (this.nameSearchQuery !== '') {


            this.NameSearch(this.nameSearchQuery);
          }
          if (this.phoneSearchQuery) {

            this.PhoneSearch(this.phoneSearchQuery);
          }
        },
      );

    } else if (status == "dec") {
      this.currentPage <= 1 ? this.currentPage : this.currentPage = this.currentPage - 1;
      this.contactsService.getAllContacts(this.currentPage, this.contactPerPage).subscribe(
        (res) => {
          this.numOfPages = [];

          this.contacts = res['resultedContacts'];
          this.HandleNumberOfPages(res);

        },
        (err) => {
          console.log(err);
        },
        () => {

          if (this.nameSearchQuery !== '') {
            this.NameSearch(this.nameSearchQuery);
          }
          if (this.phoneSearchQuery) {

            this.PhoneSearch(this.phoneSearchQuery);
          }
        },
      );
    }
  }
// pagination numbers handling
  customNavigate(current) {
    this.contactsService.getAllContacts(current, this.contactPerPage).subscribe(
      (res) => {
        this.numOfPages = [];
        this.contacts = res['resultedContacts'];

        this.HandleNumberOfPages(res);


      },
      (err) => {
        console.log(err);
      },
      () => {

        if (this.nameSearchQuery !== '') {
          this.NameSearch(this.nameSearchQuery);
        }
        if (this.phoneSearchQuery) {

          this.PhoneSearch(this.phoneSearchQuery);
        }
      },
    );

  }



// delete contact
  delete(i) {

    this.contactsService.deleteContact(this.contacts[i]._id).subscribe(
      (res) => {


      },
      (err) => {
        this.contactsService.getAllContacts(this.currentPage, this.contactPerPage).subscribe(
          (res) => {

            this.contacts = res['resultedContacts'];


          },
          (err) => {
            console.log(err);

          },
          () => { },
        );
      },
      () => {
        this.contactsService.getAllContacts(this.currentPage, this.contactPerPage).subscribe(
          (res) => {

            this.contacts = res['resultedContacts'];
          },
          (err) => {
            console.log(err);

          },
          () => { },
        );
      },
    );
  }

  // search by name
  NameSearch(searchquery) {
    this.nameSearchQuery = searchquery;

    this.contactsService.getAllContacts(this.currentPage, this.contactPerPage).subscribe(
      (res) => {
        this.contacts = res['resultedContacts'];
        this.contacts = this.contactsService.SearchByName(res['resultedContacts'], searchquery);

      },
      (err) => {
        console.log(err);
      },
      () => { },
    );

  }

  // search by phone
  PhoneSearch(searchquery) {
    this.phoneSearchQuery = searchquery;
    this.contactsService.getAllContacts(this.currentPage, this.contactPerPage).subscribe(
      (res) => {
        this.contacts = res['resultedContacts'];
        this.contacts = this.contactsService.SearchByPhoneNum(res['resultedContacts'], searchquery);
      },
      (err) => {
        console.log(err);
      },
      () => { },
    );
  }

// alert toggling
  modal(state) {
    this.isModalOpen = state;
  }

  // update contact
  onChangesSaved(id, form) {
    const updatedContact = {
      _id: id,
      name: form.value.name,
      phone: form.value.phone,
      address: form.value.address,
      notes: form.value.notes
    };

    this.contactsService.updateContact(updatedContact).subscribe(
      (res) => {
      },
      (err) => {
        console.log(err);
      },
      () => { }
    );
  }
// add new contact
  onAddNewContact(form) {
    const updatedContact = {
      name: form.value.name,
      phone: form.value.phone,
      address: form.value.address,
      notes: form.value.notes
    };
    this.contactsService.addContact(updatedContact).subscribe(
      (res) => {
        this.contact = { name: '', phone: '', address: '', notes: '' };
        this.contactsService.getAllContacts(this.currentPage, this.contactPerPage).subscribe(
          (res) => {
            this.numOfPages = [];

            this.contacts = res['resultedContacts'];
            this.HandleNumberOfPages(res);


          },
          (err) => {
            console.log(err);
          },
          () => { },
        );

      },
      (err) => {
        console.log(err);
      },
      () => { }
    );
  }

// to lock editing to another user
  Locked(id) {
    this.isLocked = true;

    this.contactsService.lockedContacts.push({ contactId: id, user: this.currentUser, locked: this.isLocked });

  }
// check locked contacts
  checkIfLocked(c) {
    let displayStatus = '';
    for (let element of this.LockedContacts) {
      if (
        element.contactId == c._id
        && element.user !== this.currentUser
        && element.locked == true
      ) {

        displayStatus = 'none'
      }
    }

    return displayStatus;

  }
// to show contact-lock sign
  lockedSign(c) {
    let status = false;
    for (let element of this.LockedContacts) {
      if (
        element.contactId == c._id
        && element.user !== this.currentUser
        && element.locked == true
      ) {


        status = true
      }
    }

    return status;
  }
}
