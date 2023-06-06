export class ContactException extends Error {
    constructor(error: string){
        super(error);
        this.name = "ContactException";
    }
}