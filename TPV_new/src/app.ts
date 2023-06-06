import { TpvController } from "./controllers/tpv.controller";
import { TpvService } from "./services/tpv.service";
import { TpvView } from "./views/tpv.view";

const tpvService = new TpvService();
const tpvView = new TpvView();

new TpvController(tpvService, tpvView);