import { IContact } from "../core/interfaces/contact.interface";
import { Contact } from "../core/models/contact.model";
import { DexieService } from "./dexie.service";

export class ContactRepository {

    constructor(
      private readonly db: DexieService
    ) {
      
    }

    addContacts = (contacts: Contact[]) => {
      const jsonContacts = contacts.map(contact => contact.toJSON())
      this.db.table('contact').bulkAdd(jsonContacts);
    }
    
    add = (data: IContact) => {
      this.db.table('contact').add(data);
    }

    delete = (data: IContact) => {
      const {id} = data;
      this.db.table('contact').delete(id);
    }

    getAll = () => {
      return this.db.table('contact').toArray();
    }
    
}