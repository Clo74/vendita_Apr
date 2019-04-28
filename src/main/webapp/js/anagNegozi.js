import NegozioService from "./NegozioService.js";
import Tabella from "./Tabella.js";

class App {

    constructor() {
        this.service = new NegozioService();

        this.desc = document.querySelector("#descNeg");
        this.address = document.querySelector("#address");
        this.mail = document.querySelector("#mail");
        this.tel = document.querySelector("#tel");

        this.onSave = this.onSave.bind(this);
        this.btOnSave = document.querySelector("#btConfirm");
        this.btOnSave.onclick = this.onSave;
        this.idRec = document.querySelector("#idRec");
        this.tb = new Tabella({
            service: this.service,
            idTabella: "tblNegozi",
            classeTabella: "pure-table table-select",
            contenitore: "#contenitore",
            callbackUpdate: this.onUpdate,
            callbackDelete: this.onDelete
        });
    }
    onUpdate(idMod) {
        console.log("id riga su modifica" + idMod);
        //leggo il record con id=idMod e carico i campi a video
        this.service.find(idMod)
                .then(json => {
                    document.querySelector("#idRec").value = idMod;
                    document.querySelector("#descNeg").value = json.descrizione;
                    document.querySelector("#address").value = json.indirizzo;
                    document.querySelector("#tel").value = json.tel;
                    document.querySelector("#mail").value = json.email;
                });

    }

    onDelete(idMod) {

        if (confirm("Confermi di voler cancellare?")) {
            this.service.delete(idMod);

            this.tb.reloadData();

        }
    }

    onSave() {
        let idRec = document.querySelector("#idRec").value;
        if (idRec !== "" && idRec !== null) {
            //se c'è id a video devo modicare il record
            this.service.update(idRec, {
                descrizione: this.desc.value,
                indirizzo: this.address.value,
                tel: this.tel.value,
                email: this.mail.value
            });
        } else {
            //se non c'è l'id devo inserire
            this.service.create({
                descrizione: this.desc.value,
                indirizzo: this.address.value,
                tel: this.tel.value,
                email: this.mail.value
            });
        }
        this.tb.reloadData();
    }
}
new App();

