import Dexie from "dexie";
import { IContact } from "../core/interfaces/contact.interface";


export class DexieService extends Dexie{

    constructor(nameDB: string, tableName: string, primaryKey: string) {
        super(nameDB);
        this.version(1).stores({
            [tableName] : primaryKey
        });
    }
}