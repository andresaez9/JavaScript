import { Contact } from "../models/contact.model"

export interface IStore {
    addOrUpdate: (key: string, value: Contact) => void,
    findOne: (key: string) => void,
    delete: (key: string) => void
}