import { IStore } from "../core/interfaces/Store.interface";
import { Contact } from "../core/models/contact.model";

export class LocalStorage implements IStore {
    addOrUpdate = (id: string, contact: Contact) => {
        localStorage.setItem(id, JSON.stringify(contact));
    }

    findOne = (item: string) => {
        localStorage.getItem(item);
    }

    delete = (item: string) => {
        localStorage.removeItem(item);
    }
}