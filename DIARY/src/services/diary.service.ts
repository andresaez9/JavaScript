import { v4 as uuidv4 } from 'uuid';
import { Contact } from '../core/models/contact.model';
import { HttpService } from './http.service';
import { StoreService } from './store-service.service';
import { ContactRepository } from './contact.repository';
import { ContactException } from '../core/exceptions/contact.exception';

export class DiaryService {
    private _contacts: Map<uuidv4, Contact>;
    private readonly _url = "http://localhost:3000/contacts";

    constructor(
        private readonly httpService: HttpService,
        private readonly storeService: StoreService,
        private readonly contactRepository: ContactRepository
    ) {
        this.httpService = httpService;
        this.storeService = storeService;
        this._contacts = new Map<uuidv4, Contact>();
        this.contactRepository = contactRepository
    }

    loadContacts = async () => {
        const data = await this.httpService.get(this.url);
        this.mappingContacts(data);
    }

    private mappingContacts = (contacts: Array<Contact>) => {
        const newContacts = contacts.map(({
            id, 
            name, 
            surname, 
            email, 
            birthDate, 
            phone, 
            image}: Contact) => {
                return new Contact(id, name, surname, email, birthDate, phone, image);          
        });
            
        this.readContacts(newContacts);
    }

    private readContacts = (contacts: Array<Contact>) => {
        for (let contact of contacts){
            this._contacts.set(contact.id, contact);
            this.storeService.addOrUpdate(contact.id, contact);
        }
        this.contactRepository.addContacts(contacts);
    }

    insertContact = (contact: Contact) => {
        try {
            this._contacts.set(contact.id, contact);
            this.storeService.addOrUpdate(contact.id, contact);
            this.httpService.post(this.url, contact);
            this.contactRepository.add(contact);
        } catch(e) {
            throw new ContactException(`error al insertar; ${e}`);
        }
    }

    deleteContact = (contact: Contact) => {
        try {
            const {id} = contact;
            this._contacts.delete(id);
            this.storeService.delete(id);
            this.httpService.delete(`${this.url}/${id}`);
            this.contactRepository.delete(contact);
        } catch(e) {
            throw new ContactException(`error al borrar; ${e}`);
        }
    }

    updateContact = async (contact: Contact) => {
        try {
            this._contacts.set(contact.id, contact);
            this.storeService.addOrUpdate(contact.id, contact);
            await this.httpService.put(`${this.url}/${contact.id}`, contact);
        } catch(e) {
            throw new ContactException(`error al actualizar; ${e}`);
        }
    }

    get contacts(): Array<Contact> {
        return Array.from(this._contacts.values());
    }

    get url(){
        return this._url;
    }
}