class Framework{
  
  public dispRequest(metodo: string, url: string, responseHandler:HandleResponse){
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4) {
          if (xmlHttp.status == 200) {
              let listaDisp: Array<Device> = JSON.parse(xmlHttp.responseText);
              responseHandler.cargarGrilla(listaDisp);
            } else {
                alert("ERROR en la consulta");
            }
          }
        }
    xmlHttp.open(metodo, url, true);
    xmlHttp.send();
    //}
  }

  public cambioRequest(metodo: string, url: string, responseHandler:HandleResponse, data: any) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4) {
          if (xmlHttp.status == 200) {
            console.log(xmlHttp.responseText);  
            } else {
                alert("ERROR en la consulta");
            }
          }
        }
    xmlHttp.open(metodo, url, true);
    if (data != undefined) {
      xmlHttp.setRequestHeader("Content-Type", "application/json");  
      xmlHttp.send(JSON.stringify(data));
    }
  }

  public hacerRequest(metodo: string, url: string, responseHandler:HandleResponse, petition: string) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
          let device: Device = JSON.parse(xmlHttp.responseText);
          responseHandler.cargarDisp(device[0], petition);
        } else {
          alert("ERROR en la consulta");
        }
      }
    }
    xmlHttp.open(metodo, url, true);
    xmlHttp.send();
  }

  public borraRequest(metodo: string, url: string, responseHandler:HandleResponse) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = () => {
      if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
          console.log(xmlHttp.responseText);
        } else {
          alert("ERROR en la consulta");
        }
      }
    }
    xmlHttp.open(metodo, url, true);
    xmlHttp.send();
  }

}