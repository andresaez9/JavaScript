import { contactTemplate } from "../core/components/contacts.component";
import { footerTemplate } from "../core/components/footer.component";
import { formTemplate } from "../core/components/form.component";
import { Form } from "../core/interfaces/form.interface";
import { Contact } from "../core/models/contact.model";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import { headerTemplate } from "../core/components/header.component";

export class DiaryView {
    private header = document.querySelector('#header');
    private contacts = document.querySelector('#contactsTemplate');
    private formTemplate = document.querySelector('#formTemplate');
    private footer = document.querySelector('#footer');

    constructor(){
        this.renderHeader();
        this.renderForm();
        this.renderFooter();
    }

    renderContacts = (handlerGetContacts: Function, handlerDeleteContact?: Function, handlerUpdateContact?: Function) => {
        this.contacts!.innerHTML = "";
        const contacts = handlerGetContacts();

        for (const contact of contacts){
            this.contacts!.innerHTML += contactTemplate(contact);
        }

        if (handlerDeleteContact) this.delete(contacts, handlerDeleteContact!)
        if (handlerUpdateContact) this.update(contacts, handlerUpdateContact!)
    }

    delete = (contacts: Array<Contact>, deleteContact: Function) => {
        for (const contact of contacts) {
            const btnDelete = document.querySelector(`#btnDelete-${contact.id}`)!;
            btnDelete.addEventListener('click', (event) => {
                event.preventDefault();
                this.showNotification('warning', 'Confirmar Borrado', '¿Estás seguro de que quieres borrar este contacto?', deleteContact, contact);
            });
        }
    }

    insert = (insertContact: Function) => {
        const form = this.loadFormInterface();
        let isInsert: boolean = false;

        const btnSend = document.querySelector('#btnSend');
        btnSend!.addEventListener('click', (event) => {
            const {name, surname, email, birthDate, phone} = form;

            if (!this.validateForm(form)) {
                event.preventDefault()
                this.showNotification('error', 'Validación de Formulario', 'Los campos son requeridos');
                return;
            }

            const newContact = {
                id: uuidv4(),
                name: name.value,
                surname: surname.value,
                email: email.value,
                birthDate: birthDate.value,
                phone: phone.value,
                image: "https://img2.freepng.es/20180501/aiq/kisspng-computer-icons-mobile-phones-contact-free-clip-a-5ae89e0e46df20.5997647115251942542903.jpg"
            }
            
            insertContact(newContact);
            isInsert = true;

            if (isInsert) {
                event.preventDefault(); //parar el comportamiento predeterminado del botón
                this.showNotification('success', "Contacto Añadido!", "Contacto añadido correctamente.");
            } else {
                this.showNotification('error', "Contacto NO Añadido", "Contacto no añadido.");
            }
        });
    }

    update = (contacts: Array<Contact>, updateContact: Function) => {
        const form = this.loadFormInterface();
        
        const btnSend = document.querySelector('#btnSend')! as HTMLButtonElement;
        const btnUpdateContact = document.querySelector('#btnUpdate')! as HTMLButtonElement;

        for (const contact of contacts) {
            const btnUpdate = document.querySelector(`#btnUpdate-${contact.id}`)!;
            btnUpdate.addEventListener('click', () => {
                const {id, name, surname, email, birthDate, phone} = contact;
                
                form.name.value = name;
                form.surname.value = surname;
                form.email.value = email;
                form.phone.value = phone;
                
                btnUpdateContact.disabled = false;
                btnUpdateContact.style.cursor = "pointer";
                btnSend.disabled = true;
                btnSend.style.cursor = "not-allowed";

                btnUpdateContact!.addEventListener('click', (event) => {

                    if (!this.validateForm(form)) {
                        event.preventDefault()
                        this.showNotification('error', 'Validación de Formulario', 'Los campos son requeridos');
                        return;
                    }

                    const editContact = {
                        id: id,
                        name: form.name.value,
                        surname: form.surname.value,
                        email: form.email.value,
                        birthDate: form.birthDate.value,
                        phone: form.phone.value,
                        image: "https://img2.freepng.es/20180501/aiq/kisspng-computer-icons-mobile-phones-contact-free-clip-a-5ae89e0e46df20.5997647115251942542903.jpg"
                    }
                    //updateContact(editContact);
                    event.preventDefault();
                    this.showNotification('question', 'Confirmar Modificación', '¿Estás seguro de que quieres borrar este contacto?', updateContact, editContact)
                })
            });
        }
    }

    private loadFormInterface = () => {
        const form: Form = {
            name: document.querySelector('#name')!,
            surname: document.querySelector('#surname')!,
            email: document.querySelector('#email')!,
            birthDate: document.querySelector('#birthDate')!,
            phone: document.querySelector('#phone')!
        }
        return form;
    }

    private validateForm = (form: Form) => {
        const {name, surname, email, birthDate, phone} = form;

        const requiredFields: Array<HTMLInputElement> = [name, surname, email, birthDate, phone];

        const emptyFields = requiredFields.filter(field => field.value.trim() === '');

        return emptyFields.length === 0;
    }

    renderForm = () => {
        this.formTemplate!.innerHTML = formTemplate;
    }

    renderHeader = () => {
        this.header!.innerHTML = headerTemplate;
    }

    renderFooter = () => {
        this.footer!.innerHTML = footerTemplate;
    }

    private showNotification = (icon: string, title: string, text: string, actionContact?: Function, contact?: Contact | any) => {
        const icons: any = {
            success: 'success',
            error: 'error',
            warning: 'warning',
            info: 'info',
            question: 'question'
        };

        if (icons[icon] === 'warning') {
            this.getSwalWarning(title, text, actionContact, contact);
            return;
        }

        if (icons[icon] === 'question') {
            this.getSwalQuestion(title, text, actionContact, contact);
            return;
        }

        Swal.fire({
            icon: icons[icon],
            title: title,
            text: text,
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false
        }).then(() => {
            location.reload(); //volver a refrescar
        });
    }

    private getSwalWarning = (title: string, text: string, actionContact?: Function, contact?: Contact) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                actionContact!(contact);
                Swal.fire('Borrado!', 'El contacto ha sido borrado.', 'success');
                location.reload();
            } else {
                Swal.fire('Cancelado', 'La operación ha sido cancelada.', 'info');
            }
        });
    }

    private getSwalQuestion = (title: string, text: string, actionContact?: Function, contact?: Contact) => {
        Swal.fire({
            title: title,
            text: text,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                actionContact!(contact);
                Swal.fire('Modificado!', 'El contacto ha sido actualizado.', 'success');
                location.reload();
            } else {
                Swal.fire('Cancelado', 'La operación ha sido cancelada.', 'info');
            }
        });
    }
}