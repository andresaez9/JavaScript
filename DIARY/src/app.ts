import { DiaryController } from "./controllers/diary.controller";
import { ContactRepository } from "./services/contact.repository";
import { DexieService } from "./services/dexie.service";
import { DiaryService } from "./services/diary.service";
import { HttpService } from "./services/http.service";
import { LocalStorage } from "./services/local-storage.service";
import { StoreService } from "./services/store-service.service";
import { DiaryView } from "./views/diary.view";

const db = new DexieService("ContactsDB", 'contact', 'id');
const contactRepository = new ContactRepository(db);

const diaryService = new DiaryService(new HttpService(), new StoreService(new LocalStorage()), contactRepository);
const diaryView = new DiaryView();

new DiaryController(diaryService, diaryView);