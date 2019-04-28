import ProdottoService from "./ProdottoService.js";
import Tabella from "./Tabella.js";

class App {

    constructor() {
        this.service = new ProdottoService();

        this.tipo = document.querySelector("#tipo");
        this.desc = document.querySelector("#desc");
        this.przAcq = document.querySelector("#przAcq");
        this.przVendN = document.querySelector("#przVendN");
        this.iva = document.querySelector("#iva");
        this.przVendL = document.querySelector("#przVendL");
        this.qta = document.querySelector("#qta");
       
        this.onSave = this.onSave.bind(this);
        this.btOnSave = document.querySelector("#btConfirm");
        this.btOnSave.onclick = this.onSave;
        this.idRec = document.querySelector("#idRec");
        this.tb = new Tabella({
            service: this.service,
            idTabella: "tblProdotti",
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
                    document.querySelector("#tipo").value = json.tipo;
                    document.querySelector("#desc").value = json.descrizione;
                    document.querySelector("#przAcq").value = json.prezzoA;
                    document.querySelector("#przVendN").value = json.prezzoVN;
                    document.querySelector("#iva").value = json.iva;
                    document.querySelector("#przVendL").value = json.prezzoVL;
                    document.querySelector("#qta").value = json.qta;
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
        let json = {
                tipo: this.tipo.value,
                descrizione: this.desc.value,
                prezzoA: this.przAcq.value,
                prezzoVN: this.przVendN.value,
                iva: this.iva.value,
                prezzoVL:this.przVendL.value,
                qta:this.qta.value
            };
            
        if (idRec !== "" && idRec !== null) {
            //se c'è id a video devo modicare il record
            this.service.update(idRec, json);
        } else {
            //se non c'è l'id devo inserire
            this.service.create(json);
        }
        this.tb.reloadData();
    }
}
new App();

