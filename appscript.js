function doGet(e) {
  /*
    Obtener los paremetros del request
  */
  if (!e.parameters) {
    const response = [
      {
        status: 200,
        data: "empty",
      },
    ];
    return ContentService.createTextOutput(
      JSON.stringify(response)
    ).setMimeType(ContentService.MimeType.JSON);
  }
  const params = e.parameters;
  //const params = {
  //  cuise: 569,
  //  dni: 35104744,
  //  categoria: 221,
  //  horas: 16
  //}
  const { cuise, dni, categoria, horas } = params;

  /*
    Buscar la hoja segun el CUISE
    Obtener un array de valores
    Filtrar por DNI, CATEGORIA, HORAS y ESTADO ACTIVO
    Formatear el array resultante en un array de json
  */
  const spreadsheet = SpreadsheetApp.openByUrl(
    "https://docs.google.com/spreadsheets/d/1rJpfi8X5IeZKmf0hzLEeED9qYayYJD_fc5bpkrBVm7Y/edit"
  );
  const sheet = spreadsheet.getSheetByName(cuise);
  const data = sheet.getRange("A1").getDataRegion().getValues();
  const headers = data.shift();
  const filteredData = data.filter(
    (item) =>
      item[0] == dni &&
      item[4] == categoria &&
      item[8] == horas &&
      item[3] == "Activo"
  );
  const jsonArray = filteredData.map((item) => {
    const obj = {
      legajo: item[1],
      estado: item[3],
      categoria: item[4],
      horas: item[8],
    };
    return obj;
  });
  console.log(jsonArray);

  /*
    Contruir la respuesta y devolverla
  */
  const response = [
    {
      status: 200,
      data: jsonArray,
    },
  ];
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(
    ContentService.MimeType.JSON
  );
}
