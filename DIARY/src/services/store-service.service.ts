import { IStore } from '../core/interfaces/Store.interface';
import { Contact } from '../core/models/contact.model';

export class StoreService  {

    constructor(
        private readonly storage: IStore
    ) {}

    addOrUpdate = (key: string, value: Contact) => {
        this.storage.addOrUpdate(key, value);
    }

    findOne = (key: string) => {
        this.storage.findOne(key);
    }

    delete = (key: string) => {
        this.storage.delete(key);
    }
}