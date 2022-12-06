declare const M;

class Main implements EventListenerObject, HandleResponse{
 
    private framework: Framework = new Framework();
    private personas: Array<Persona> =new Array();
    constructor(per:Persona) {
        this.personas.push(per);

        console.log(this);
    }
    public addPersona(per: Persona) {
        this.personas.push(per);
    }
    public getPersona(){
        return this.personas;
    }

    cosultarDispositivoAlServidor() {

        this.framework.ejecutarRequest("GET", "http://localhost:8000/devices",this);
    }


    cambiarEstadoDispositivoAlServidor() {
        let json = { id: 1, state: 1 };
        this.framework.ejecutarRequest("POST", "http://localhost:8000/devicesChange",this,json);
        
    }
    cargarGrilla(listaDisp: Array<Device>) {
        console.log("llego info del servidor", listaDisp);    
        let cajaDips = document.getElementById("cajaDisp");
        let grilla:string = "<ul class='collection'>";
        
        let divbtne = document.getElementById("divbtnenter");
        divbtne.hidden = true; // Oculta el boton de INGRESAR
        let bienvenida = document.getElementById("bienvenida");
        bienvenida.hidden = true; // Oculta el mensaje de bienvenida
        let titulo = document.getElementById("titulo");
        titulo.hidden = false; // Muestra el mensaje de estados
        let innombre = document.getElementById("iNombre");
        innombre.hidden = true; // Oculta el campo de Ingrese usuario
        let divbtna = document.getElementById("divbtnadd");
        divbtna.hidden = false; // Muestra el boton de AGREGAR
        let divbtns = document.getElementById("divbtnsub");
        divbtns.hidden = false; // Muestra el boton de QUITAR
        for (let disp of listaDisp) {
        
            grilla += ` <li class="collection-item avatar">`;
            
            if (disp.type == 1) {
                
                grilla+=`<img src="static/images/lightbulb.png" alt=" "class="circle"> `
                grilla += ` <span class="title negrita">${disp.name}</span>
                <p>${disp.description}</p>
                <a class="secondary-content">
                  <div class="switch">
                      <label>
                        Off`;
                if (disp.state) {
                    grilla += `<input id="cb_${disp.id}" miAtt="mi dato 1" type="checkbox" checked>`;    
                } else {
                    grilla += `<input id="cb_${disp.id}" miAtt="mi dato 2" type="checkbox">`;    
                }
                grilla +=`<span class="lever"></span>
                    On
                  </label>
                </div>
          </a>
          </li>`;   
            } else if (disp.type == 2){
                grilla+=`<img src="static/images/window.png" alt=" "class="circle"> `
                grilla += ` <span class="title negrita">${disp.name}</span>
                <p>${disp.description}</p>
                <a class="secondary-content">
                    <form action="#">
                    <p class="range-field">`
                   
                    grilla += `<input type="range" id="cb_${disp.id}" min="0" max="100" step="20" value=${disp.state}>`;    
                
                grilla +=`
                </p>
                </form>
          </a>
          </li>`;  
            }
            
           
        }
        grilla += "</ul>"
        
        cajaDips.innerHTML = grilla;

        for (let disp of listaDisp) {
            let cb = document.getElementById("cb_" + disp.id);
            cb.addEventListener("click", this);
        }
        
        this.framework.ocultarCargando();
        
    }

    handleEvent(object: Event): void {
     
        let tipoEvento: string = object.type;
       
        let objEvento: HTMLElement;
        objEvento = <HTMLElement>object.target;
        
        if (objEvento.id == "btnsum") {
            console.log(objEvento.id, objEvento.textContent);
            
            let iNombre = <HTMLInputElement>document.getElementById("iNombre");
            
            //objEvento.textContent = iNombre.value;
            //alert("hola " + this.personas[0].getNombre() + " estoy en el main");
        } else if (objEvento.id == "btnenter") {
          
            this.framework.mostrarCargando();
            this.cosultarDispositivoAlServidor();

      
        } 
        

    }
}

window.addEventListener("load", () => {

   var elems = document.querySelectorAll('select');
   var instances = M.FormSelect.init(elems, "");

    M.updateTextFields();
    
    var elemsM = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elemsM, "");

    //let user: Usuario = new Usuario("Juan","jperez","jperez@gmail.com");
    let per1 = new Persona("Matias")
    //per1.edad = 12;
    let main: Main = new Main(per1);
    //main.addPersona(new Persona("Pepe"));
    mostrar(main);
    let btn = document.getElementById("btnenter");
    btn.addEventListener("click", main);
    //let btn2 = document.getElementById("btnOtro");
    //btn2.addEventListener("click", main);
    //let btnsum = document.getElementById("btnsum");
    //btnsum.addEventListener("click", main);
    //console.log(btnsum);
    
});

function mostrar(main: Main) {
    let personas = main.getPersona();
    let datosPersonas = "";
    for (let i in personas) {
        datosPersonas = datosPersonas + personas[i].toString();
        
    }

}