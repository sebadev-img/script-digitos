//variables
let dni = "";
let cuise = "";
let categoria = "";
let horas = "";

// funcion para feth data
const getData = async (item) => {
  const { dni, cuise, categoria, horas } = item;
  const url = `https://script.google.com/macros/s/AKfycbyDGbhEkF2cA8RIxMXZG-R64mcNV1sk_O96h7CKEIZR3FN3qQjfarOOvv3tZ_S33FJF/exec?dni=${dni}&cuise=${cuise}&categoria=${categoria}&horas=${horas}`;
  console.log(url);
  const response = await fetch(url);
  const jsonResponse = await response.json();
  const data = jsonResponse[0];
  const dataArray = data.data;
  console.log(dataArray);
  if (dataArray.length == 1) {
    const { legajo, estado, categoria, horas } = dataArray[0];
    const text = `Legajo: ${legajo} Estado: ${estado} Categoria: ${categoria} Horas: ${horas} `;
    const pEl = document.createElement("p");
    pEl.innerText = text;
    parent.appendChild(pEl);
  }
};

//funcion para buscar digitos
const handleClick = (e) => {
  e.preventDefault();
  dni = document.getElementById("span_CTLPERSONADOCUMENTO").innerHTML;
  let jsonArray = [];
  const rows = document.getElementById("GrdserviciodocenteContainerTbl").rows;
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cellLength = row.cells.length;
    cuise = row.cells[2].firstChild.innerHTML;
    categoria = row.cells[cellLength - 4].firstChild.innerHTML;
    horas = row.cells[cellLength - 6].firstChild.innerHTML;
    //console.log(cuise, categoria, horas);
    const newElement = {
      dni: dni.trim(),
      cuise: cuise.trim(),
      categoria: categoria.trim(),
      horas: horas.trim(),
    };
    jsonArray = [...jsonArray, newElement];
  }

  console.log(dni);
  console.log(jsonArray);

  jsonArray.map(getData);
};

//crear listado
const parent = document.getElementById("DIVSERVICIOS");
//crear boton
const btn = document.createElement("button");
btn.addEventListener("click", handleClick);
btn.innerHTML = "Buscar Digitos";
const td = document.getElementById("span_CTLPERSONADOCUMENTO").parentElement;
td.appendChild(btn);
