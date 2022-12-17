declare const M;

declare var disp: number;

class Main implements EventListenerObject, HandleResponse {
    private framework: Framework = new Framework();
        
    cosultarDispositivos () {
        this.framework.dispRequest("GET", `http://localhost:8000/devices`,this);
    }

    cambiarEstado (idDis: number, state: number) {
        let nuevodisp = {state: state};
        this.framework.cambioRequest("PUT", `http://localhost:8000/devices/state/${idDis}`,this, nuevodisp);
    }

    cambiarDispositivos (idDis: number, name: string, desc: string, type: number, state: number) {
        let nuevodisp = {name: name, description: desc, type: type, state: state};
        this.framework.cambioRequest("PUT", `http://localhost:8000/devices/${idDis}`,this, nuevodisp);
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
                <p id=${disp.description}>${disp.description}</p>
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
                        name="hello_button">Quitar</button>
                        </li>`;   
            }
            else if (disp.type == 2){
                grilla+=`<img src="static/images/window.png" alt=" "class="circle"> `
                grilla += ` <span class="title negrita" id=${disp.name}>${disp.name}</span>
                <p id=${disp.description}>${disp.description}</p>
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
                        name="hello_button">Quitar</button>
                        </li>`;  
            }
        }
        
        grilla += `</ul>`;
        cajaDips.innerHTML = grilla;
        for (let disp of listaDisp) {
            let val = document.getElementById("val_" + disp.id);
            val.addEventListener("click", this);
        }
    }

    handleEvent(object: Event): void {
        let objEvento: HTMLInputElement;
        objEvento = <HTMLInputElement>object.target;
        console.log (objEvento);
        let dispstate: number;
        if (objEvento.id == "btnenter") {
            this.cosultarDispositivos();
        } 
        else if (objEvento.type == "checkbox") { // Lee el valor del checkbox (salidas On-Off)
            if (objEvento.checked == true){
                dispstate=1;
            } else {
                dispstate=0;
            }
        }
        else if (objEvento.type == "range"){ // Lee el valor de la barra de estado (Salidas analogicas)
            dispstate = parseInt (objEvento.value);
            }
        let dispid = parseInt (objEvento.id.replace('val_',''));
        this.cambiarEstado (dispid, dispstate);
    }
}

window.addEventListener("load", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, "");
    M.updateTextFields();
    var elemsM = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsM, "");
    let main: Main = new Main();
    let btnenter = document.getElementById("btnenter");
    btnenter.addEventListener("click", main);
    let valor = document.getElementById("range");
    valor.addEventListener("click", main);
});
