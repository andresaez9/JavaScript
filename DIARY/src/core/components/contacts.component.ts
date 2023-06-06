import { Contact } from "../models/contact.model";

export const contactTemplate = ({id, name, surname, email,
                                 birthDate, phone, image}: Contact) => `
        <section class="contact" data-id="${id}">
            <section class="product-image">
                <img src="${image}"/>
            </section>
            <section class="product-info">
                <h1>${name}</h1>
                <p><b>Apellido:</b> ${surname}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Edad:</b> ${yearsOld(birthDate)}</p>
                <p><b>Teléfono:</b> ${phone}</p>
            </section>
            <button class="btn-delete" id="btnDelete-${id}"><i class="bi bi-trash3-fill"></i></button>
            <button class="btn-update" id="btnUpdate-${id}"><i class="bi bi-pen-fill"></i></button>
        </section>
`;

const yearsOld = (birthDate: Date) => {
    const currentDate = new Date();
    const dateBirth = new Date(birthDate);
    let age = currentDate.getFullYear() - dateBirth.getFullYear();
    const month = currentDate.getMonth() - dateBirth.getMonth();

    if (month < 0 || 
        (month === 0 && currentDate.getDate() < dateBirth.getDate())
    ){
        age--;
    }
    return age;
}