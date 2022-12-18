declare const M;
var valsub: string;
class Main implements EventListenerObject, HandleResponse {
    private framework: Framework = new Framework();
        
    cosultainicial () {
        this.framework.dispRequest("GET", `http://localhost:8000/devices`, this);
    }
    
    consultaDisp(idDis: number, action: string){
        return this.framework.hacerRequest("GET", `http://localhost:8000/devices/${idDis}`, this, action);
    }

    cambiarEstado (idDis: number, state: number) {
        let nuevodisp = {state: state};
        this.framework.cambioRequest("PUT", `http://localhost:8000/devices/${idDis}`, this, nuevodisp);
    }

    cambiarDispositivos (idDis: number, name: string, desc: string, type: number) {
        let nuevodisp = {name: name, description: desc, type: type};
        this.framework.cambioRequest("PUT", `http://localhost:8000/devices/${idDis}`, this, nuevodisp);
    }
    
    borrarDispositivo (idDis: number) {
        this.framework.borraRequest("DELETE", `http://localhost:8000/devices/${idDis}`, this);
    }

    refrescarSPA(idModal: string){
        this.cosultainicial();
        let modal = document.getElementById(idModal);
        let instanceModal = M.Modal.getInstance(modal);
        instanceModal.close();
    }

    cargarGrilla(listaDisp: Array<Device>) {
        let cajaDips = document.getElementById("cajaDisp");
        let grilla:string = `<ul class="collection">`;
        let divbtne = document.getElementById("divbtnenter");
        divbtne.hidden = true; // Oculta el boton de INGRESAR
        let bienvenida = document.getElementById("bienvenida");
        bienvenida.hidden = true; // Oculta el mensaje de bienvenida
        let titulo = document.getElementById("titulo");
        titulo.hidden = false; // Muestra el mensaje de estados
        let innombre = document.getElementById("iNombre");
        let nombre:string = (<HTMLInputElement>document.getElementById("iNombre")).value;
        let Hola = document.getElementById ("hola");
        Hola.innerHTML = `Hola` + ` ` + nombre;
        Hola.hidden = false; // Muestra el nombre ingresado en el campo
        innombre.hidden = true; // Oculta el campo de Ingrese usuario
        let divbtna = document.getElementById("divbtnadd");
        divbtna.hidden = false; // Muestra el boton de AGREGAR
          
        for (let disp of listaDisp) {
            grilla += `<li class="collection-item avatar">`;
            if (disp.type == 1) {
                grilla+=`<img src="static/images/lightbulb.png" alt=" "class="circle"> `
                grilla += ` <span class="title negrita" id=${disp.name}>${disp.name}</span>
                <p>${disp.description}</p>
                <a class="secondary-content">
                <div class="switch">
                <label>
                Off`;
                if (disp.state) {
                    grilla += `<input id="val_${disp.id}"  type="checkbox" checked>`;    
                } else {
                    grilla += `<input id="val_${disp.id}"  type="checkbox">`;    
                }
                grilla +=`<span class="lever"></span>
                        On
                        </label>
                        </div>
                        </a>
                        <br>
                        <button class="btn waves-effect waves-light button-view" id="btnmod${disp.id}" 
                        name="hello_button">Modificar</button>
                        <button class="btn waves-effect waves-light button-view" id="btnsub${disp.id}" 
                        name="hello_button">Borrar</button>
                        </li>`;   
            }
            else if (disp.type == 2){
                grilla+=`<img src="static/images/window.png" alt=" "class="circle"> `
                grilla += ` <span class="title negrita" id=${disp.name}>${disp.name}</span>
                <p>${disp.description}</p>
                <a class="secondary-content">
                <form action="#">
                <p class="range-field">`
                grilla += `<input type="range" id="val_${disp.id}" min="0" max="100" step="20" value=${disp.state} >`;    
                grilla +=`</p>
                        </form>
                        </a>
                        <br>
                        <button class="btn waves-effect waves-light button-view" id="btnmod${disp.id}" 
                        name="hello_button">Modificar</button>
                        <button class="btn waves-effect waves-light button-view" id="btnsub${disp.id}" 
                        name="hello_button">Borrar</button>
                        </li>`;  
            }
        }
        grilla += `</ul>`;
        cajaDips.innerHTML = grilla;
        for (let disp of listaDisp) {
            document.getElementById("val_"+disp.id).addEventListener("click", this);
            document.getElementById("btnmod"+disp.id).addEventListener("click", this);
            document.getElementById("btnsub"+disp.id).addEventListener("click", this);
            }
    }

    cargarDisp(device: Device, action: string){
        if(action == "edit"){
            (<HTMLInputElement>document.getElementById("edit-id-disp")).value = device.id.toString();
            (<HTMLInputElement>document.getElementById("edit-name")).value = device.name;
            (<HTMLInputElement>document.getElementById("edit-description")).value = device.description;

            let select = document.getElementById("select-edit-type");
            var instanceSelect = M.FormSelect.getInstance(select);
            (<HTMLInputElement>select).value = device.type.toString();
            instanceSelect.destroy();
            M.FormSelect.init(select, "");
        
        } else if(action == "delete"){
            document.getElementById("id-borrar").innerHTML = device.id.toString();
            document.getElementById("nombre-borrar").innerHTML = device.name;
            document.getElementById("desc-borrar").innerHTML = device.description;
            (<HTMLInputElement>document.getElementById("input-id-borrar")).value = device.id.toString();
        }
    }

    openModal(mode: string) {
        let modal = document.getElementById(mode)
        var instanceModal = M.Modal.getInstance(modal);
        instanceModal.open();
    }

    closeModal(mode: string) {
        let modal = document.getElementById(mode)
        var instanceModal = M.Modal.getInstance(modal);
        instanceModal.close();
    }
    
    handleEvent(object: Event): void {
        let objEvento: HTMLInputElement;
        objEvento = <HTMLInputElement>object.target;
        console.log (objEvento);
        let dispstate: number;
        if (objEvento.id == "btnenter") {
            this.cosultainicial();
        } 
        else if (objEvento.type == "checkbox") { // Lee el valor del checkbox (salidas On-Off)
            if (objEvento.checked == true){
                dispstate=1;
            } else {
                dispstate=0;
            }
            let dispid = parseInt (objEvento.id.replace('val_',''));
            this.cambiarEstado (dispid, dispstate);
        }
        else if (objEvento.type == "range"){ // Lee el valor de la barra de estado (Salidas analogicas)
            dispstate = parseInt (objEvento.value);
            let dispid = parseInt (objEvento.id.replace('val_',''));
            this.cambiarEstado (dispid, dispstate);    
        }
        else if (objEvento.id.startsWith("btnmod")) {
            let dispid: number = parseInt (objEvento.id.replace('btnmod',''));
            this.consultaDisp(dispid, "edit");
            this.openModal("modalmod");

        }
        else if (objEvento.id.startsWith("btnsub")) {
            let dispid: number = parseInt (objEvento.id.replace('btnsub',''));
            this.consultaDisp(dispid, "delete");
            this.openModal("modaldel");

        }
        else if (objEvento.id == "btnadd") {
            let dispid: number = parseInt (objEvento.id);
            this.consultaDisp(dispid, "add");
            this.openModal("modaladd");
  
        }
        else if (objEvento.id == "cancedita") {
            this.closeModal("modalmod");
        }
        
        else if (objEvento.id == "confedita") {
            let dispid: number = +(<HTMLInputElement>document.getElementById("edit-id-disp")).value;
            let name = (<HTMLInputElement>document.getElementById("edit-name")).value;
            let description = (<HTMLInputElement>document.getElementById("edit-description")).value;
            let type = parseInt ((<HTMLInputElement>document.getElementById("select-edit-type")).value);
            if(dispid && name && description && type) {
                this.cambiarDispositivos(dispid, name, description, type);
                this.refrescarSPA("modaledit");
            } else {
                alert("complete todos los campos");
            }
        }
        else if (objEvento.id == "confborra") {
            let dispid: number = +(<HTMLInputElement>document.getElementById("input-id-borrar")).value;
            this.borrarDispositivo(dispid);
            alert("Dispositivo eliminado");
            this.refrescarSPA("modaldel");
        }
            else if (objEvento.id == "cancborra") {
            this.closeModal("modaldel");
        }
        
        else if (objEvento.id == "cancagrega") {
            this.closeModal("modaladd");
        }
    }
}

window.addEventListener("load", () => {
    let main: Main = new Main();
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, "");
    var elemsM = document.querySelectorAll('.modal');
    M.Modal.init(elemsM, "");
    
    // Leer botones principales
    document.getElementById("btnenter").addEventListener("click", main);
    document.getElementById("btnadd").addEventListener("click", main);
    
    // Leer botones del modal
    document.getElementById("confborra").addEventListener("click", main);
    document.getElementById("cancborra").addEventListener("click", main);
    document.getElementById("confagrega").addEventListener("click", main);
    document.getElementById("cancagrega").addEventListener("click", main);
    document.getElementById("confedita").addEventListener("click", main);
    document.getElementById("cancedita").addEventListener("click", main);
});
