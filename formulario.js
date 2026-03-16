document.addEventListener("DOMContentLoaded", function () {

  // ----------------- ELEMENTOS -----------------
  const nacionalidad = document.getElementById("nacionalidad");
  const migracionesDiv = document.getElementById("migracionesDiv");

  const btnInfoMigraciones = document.getElementById("btnInfoMigraciones");
  const infoBox = document.getElementById("infoBox");

  const btnObservacionEmpresas = document.getElementById("observacionEmpresas");
  const observaBox = document.getElementById("observaBox");

  const tipoTramite = document.querySelector("#tipoTramite");
  const trabajandoBlock = document.querySelector("#trabajandoBlock");
  const apuradoBlock = document.querySelector("#apuradoBlock");
  const checkboxSi = trabajandoBlock.querySelector("input[value='si']");
  const checkboxNo = trabajandoBlock.querySelector("input[value='no']");
  const checkboxApurado = document.querySelector("input[name='apurado']");

  // Empresas
  const buscanEllos = document.querySelector("#buscanEllos");
  const buscamosNos = document.querySelector("#buscamosNos");
  const empresasBlock = document.querySelector("#empresasBlock");
  const empresasNosBlock = document.querySelector("#empresasNosBlock");
  const empresaSelect = document.querySelector("#empresaSelect");
  const empresaNosSelect = document.querySelector("#empresaNosSelect");
  const agregarEmpresaBtn = document.querySelector("#agregarEmpresa");
  const agregarNosEmpresaBtn = document.querySelector("#agregarNosEmpresa");
  const listaEmpresas = document.querySelector("#listaEmpresas");
  const listaEmpresasNos = document.querySelector("#listaEmpresasNos");
  const empresaOtraInput = document.querySelector("#empresaOtra");  
  const empresaNosOtraInput = document.querySelector("#empresaNosOtra");

  // Otros bloques
  const opcionesPension = document.getElementById("opcionesPension");
  const opcionesHijos = document.getElementById("opcionesHijos");
  const hijosRadios = document.querySelectorAll("input[name='hijos']");

  const diferencialesDiv = document.getElementById("diferencialesDiv");
  const chkPetroleo = document.getElementById("chkPetroleo");
  const petroleoOpciones = document.getElementById("petroleoOpciones");
  const chkConstruccion = document.getElementById("chkConstruccion");
  const construccionOpciones = document.getElementById("construccionOpciones");

  const autonomoDiv = document.getElementById("autonomoDiv");

  // ----------------- FUNCIONES -----------------

  // Migraciones
  function actualizarMigraciones() {
    migracionesDiv.style.display = nacionalidad.value === "extranjero" ? "block" : "none";

    if (nacionalidad.value === "extranjero" && !migracionesDiv.hasChildNodes()) {
      migracionesDiv.innerHTML = `
        <label><input type="checkbox" id="anses"> Preguntar en ANSES</label><br>
        <label><input type="checkbox" id="migraciones"> Migraciones</label>
      `;
    } else if (nacionalidad.value !== "extranjero") {
      migracionesDiv.innerHTML = "";
    }
  }

  // Mostrar/ocultar info migraciones
  function toggleInfo() {
    infoBox.style.display = infoBox.style.display === "none" ? "block" : "none";
  }

  // Tipo de trámite
  function actualizarTramite() {
    let seleccionado = Array.from(document.querySelectorAll("input[name='tramite']")).find(r => r.checked);
    if (!seleccionado) {
      opcionesPension.style.display = "none";
      diferencialesDiv.style.display = "none";
      autonomoDiv.style.display = "none";
      return;
    }

    if (seleccionado.value === "pension") {
      opcionesPension.style.display = "block";
      diferencialesDiv.style.display = "none";
      autonomoDiv.style.display = "none";
    } else if (seleccionado.value === "jubilacion") {
      opcionesPension.style.display = "none";
      diferencialesDiv.style.display = "block";
      autonomoDiv.style.display = "block";
    } else {
      opcionesPension.style.display = "none";
      diferencialesDiv.style.display = "none";
      autonomoDiv.style.display = "none";
    }
  }

  // Hijos
  function actualizarHijos() {
    let seleccionado = Array.from(hijosRadios).find(r => r.checked);
    opcionesHijos.style.display = seleccionado && seleccionado.value === "si" ? "block" : "none";
  }

  // Petroleo / Construcción
  function actualizarPetroleo() { petroleoOpciones.style.display = chkPetroleo.checked ? "block" : "none"; }
  function actualizarConstruccion() { construccionOpciones.style.display = chkConstruccion.checked ? "block" : "none"; }

  // ----------------- EVENTOS -----------------

  // Nacionalidad
  nacionalidad.addEventListener("change", actualizarMigraciones);

  // Botón info
  btnInfoMigraciones.addEventListener("click", toggleInfo);


  //Boton observaciones
  observacionEmpresas.addEventListener("click", toggleObservaciones);

  // Tipo de trámite
  tipoTramite.addEventListener("change", () => {
    if (tipoTramite.value === "jubilacion") {
      trabajandoBlock.style.display = "block";
    } else {
      trabajandoBlock.style.display = "none";
      apuradoBlock.style.display = "none";
      checkboxSi.checked = false;
      checkboxNo.checked = false;
      checkboxApurado.checked = false;
      checkboxNo.style.display = "inline";
    }
  });

  // Checkbox si/no trabajando
  checkboxSi.addEventListener("change", () => {
    if (checkboxSi.checked) {
      apuradoBlock.style.display = "block";
      checkboxNo.parentElement.style.display = "none";
      checkboxNo.checked = false;
    } else {
      apuradoBlock.style.display = "none";
      checkboxApurado.checked = false;
      checkboxNo.parentElement.style.display = "inline";
    }
  });

  document.querySelectorAll("input[name='trabajando']").forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "si" && radio.checked) {
        apuradoBlock.style.display = "block";
      } else {
        apuradoBlock.style.display = "none";
        checkboxApurado.checked = false;
      }
    });
  });

  // Empresas - mostrar bloques
  buscanEllos.addEventListener("change", () => { empresasBlock.style.display = buscanEllos.checked ? "block" : "none"; });
  buscamosNos.addEventListener("change", () => { empresasNosBlock.style.display = buscamosNos.checked ? "block" : "none"; });

  // Empresas - fetch
  fetch("empresas.json")
    .then(res => res.json())
    .then(empresas => {
      empresas.forEach(emp => {
        const option1 = document.createElement("option");
        option1.value = emp.value;
        option1.textContent = emp.text;
        empresaSelect.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = emp.value;
        option2.textContent = emp.text;
        empresaNosSelect.appendChild(option2);
      });

      // Opción Otros
      const otros1 = document.createElement("option");
      otros1.value = "otros";
      otros1.textContent = "Otros";
      empresaSelect.appendChild(otros1);

      const otros2 = document.createElement("option");
      otros2.value = "otros";
      otros2.textContent = "Otros";
      empresaNosSelect.appendChild(otros2);
    })
    .catch(err => console.error("Error cargando empresas:", err));

  // Empresas - mostrar input "Otros"


   // Agregar empresa
function agregarEmpresa(select, inputOtro, lista) {

  let selectedText;

  if (select.value === "otros") {
    selectedText = inputOtro.value.trim();
  } else {
    selectedText = select.options[select.selectedIndex].text;
  }

  if (!selectedText) {
    alert("Ingrese el nombre de la empresa");
    return;
  }

  const li = document.createElement("li");
  li.textContent = selectedText;

  const removeBtn = document.createElement("button");
  removeBtn.type = "button";
  removeBtn.textContent = "Eliminar";
  removeBtn.style.marginLeft = "10px";

  removeBtn.addEventListener("click", () => li.remove());

  li.appendChild(removeBtn);
  lista.appendChild(li);

  select.value = "";
  inputOtro.value = "";
  inputOtro.style.display = "none";
}

  empresaSelect.addEventListener("change", () => {
    if (empresaSelect.value === "otros") {
      empresaOtraInput.style.display = "inline";
    } else {
      empresaOtraInput.style.display = "none";
      empresaOtraInput.value = "";
    }
  });

  empresaNosSelect.addEventListener("change" ,() => {
    if (empresaNosSelect.value === "otros") {
       empresaNosOtraInput.style.display = "inline";

    } else {
      empresaNosOtraInput.style.display = "none";
      empresaNosOtraInput.value = "";
    }
  });


  agregarEmpresaBtn.addEventListener("click", () => {
  agregarEmpresa(empresaSelect, empresaOtraInput, listaEmpresas);
});

agregarNosEmpresaBtn.addEventListener("click", () => {
  agregarEmpresa(empresaNosSelect, empresaNosOtraInput, listaEmpresasNos);
});
  

 
  
  // Ejecutar funciones al cargar la página
  actualizarMigraciones();
  actualizarTramite();
  actualizarHijos();
  actualizarPetroleo();
  actualizarConstruccion();

  // Botones generales
  document.getElementById("guardarBtn").addEventListener("click", () => alert("Guardado simulado"));
  document.getElementById("imprimirBtn").addEventListener("click", () => window.print());
});
