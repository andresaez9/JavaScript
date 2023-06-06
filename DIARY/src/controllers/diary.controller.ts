import { Contact } from "../core/models/contact.model";
import { DiaryService } from "../services/diary.service";
import { DiaryView } from "../views/diary.view";

export class DiaryController {
    constructor(
        private readonly diaryService: DiaryService,
        private readonly diaryView: DiaryView
    ){
        this.diaryService = diaryService;
        this.diaryView = diaryView;

        this.init();
    }

    private init = async () => {
        await this.diaryService.loadContacts();
        this.diaryView.renderContacts(this.handlerGetContacts, this.handlerDeleteContact, this.handlerUpdateContact);
        this.diaryView.insert(this.handlerInsertContact);
    }


    private handlerGetContacts = () => this.diaryService.contacts;

    private handlerDeleteContact = (contact: Contact) => {
        try {
            this.diaryService.deleteContact(contact);
            this.diaryView.renderContacts(this.handlerGetContacts, this.handlerDeleteContact, this.handlerUpdateContact);
        } catch(e: any) {
            this.diaryView.showError(e);
        }
    }

    private handlerUpdateContact = async (contact: Contact) => {
        try {
            this.diaryService.updateContact(contact);
            this.diaryView.renderContacts(this.handlerGetContacts, this.handlerDeleteContact, this.handlerUpdateContact);
        } catch(e: any) {
            this.diaryView.showError(e);
        }
    }

    private handlerInsertContact = (contact: Contact) => {
        this.diaryService.insertContact(contact);
    }
}