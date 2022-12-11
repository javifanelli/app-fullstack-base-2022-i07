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

  public cambioRequest(metodo: string, url: string, responseHandler:HandleResponse, data){
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

}