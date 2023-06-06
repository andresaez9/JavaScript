export class Contact {
    private _name: string;
    private _surname: string;
    private _email: string;
    private _birthDate: Date;
    private _phone: string;
    private _image: string;

    constructor(
        private readonly _id: string,
        name: string,
        surname: string,
        email: string,
        birthDate: Date,
        phone: string,
        image: string
    ){
        this._id = _id;
        this._name = name;
        this._surname = surname;
        this._email = email;
        this._birthDate = birthDate;
        this._phone = phone;
        this._image = image;
    }

/*     toJSON(contact: Contact) {
        const {id, name, surname, email, birthDate, phone, image} = contact;
        return {
            "id": id,
            "name": name,
            "surname": surname,
            "email": email,
            "birthDate": birthDate,
            "phone": phone,
            "image": image
        }
    } */

    toJSON() {
        return {
            "id": this.id,
            "name": this.name,
            "surname": this.surname,
            "email": this.email,
            "birthDate": this.birthDate,
            "phone": this.phone,
            "image": this.image
        }
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    set name(name: string){
        if(!name) throw new Error(`Invalid name: ${name}`);
        this._name = name;
    }

    get surname(){
        return this._surname;
    }

    set surname(surname: string){
        if(!surname) throw new Error(`Invalid surname: ${surname}`);
        this._surname = surname;
    }

    get email(){
        return this._email;
    }

    set email(email: string){
        if(!email) throw new Error(`Invalid email: ${email}`);
        this._email = email;
    }

    get birthDate(): Date {
        return this._birthDate;
    }

    set birthDate(birthDate: Date) {
        if(!birthDate) throw new Error(`Invalid birthDate: ${birthDate}`);
        this._birthDate = birthDate;
    }

    get phone(): string {
        return this._phone;
    }

    set phone(phone: string) {
        if(!phone) throw new Error(`Invalid phone: ${phone}`);
        this._phone = phone;
    }

    get image(): string {
        return this._image;
    }

    set image(image: string) {
        if(!image) throw new Error(`Invalid image: ${image}`);
        this._image = image;
    }    
}