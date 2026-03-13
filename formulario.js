document.addEventListener("DOMContentLoaded", function () {
  const nacionalidad = document.getElementById("nacionalidad");
  const migracionesDiv = document.getElementById("migracionesDiv");

  const btnInfoMigraciones = document.getElementById("btnInfoMigraciones");
  const infoBox = document.getElementById("infoBox");

  const tipoTramite = document.querySelector("#tipoTramite");
  const trabajandoBlock = document.querySelector("#trabajandoBlock");
  const apuradoBlock = document.querySelector("#apuradoBlock");

const checkboxSi = trabajandoBlock.querySelector("input[value='si']");
const checkboxNo = trabajandoBlock.querySelector("input[value='no']");
const checkboxApurado = document.querySelector("input[name='apurado']");

//empresas

const buscanEllos = document.querySelector("#buscanEllos");
const buscamosNos = document.querySelector("#buscamosNos");
const empresasBlock = document.querySelector("#empresasBlock");
const empresaSelect = document.querySelector("#empresaSelect");
const agregarEmpresaBtn = document.querySelector("#agregarEmpresa");
const listaEmpresas = document.querySelector("#listaEmpresas");




  const opcionesPension = document.getElementById("opcionesPension");
  const opcionesHijos = document.getElementById("opcionesHijos");
  const hijosRadios = document.querySelectorAll("input[name='hijos']");

  const diferencialesDiv = document.getElementById("diferencialesDiv");
  const chkPetroleo = document.getElementById("chkPetroleo");
  const petroleoOpciones = document.getElementById("petroleoOpciones");
  const chkConstruccion = document.getElementById("chkConstruccion");
  const construccionOpciones = document.getElementById("construccionOpciones");

  const autonomoDiv = document.getElementById("autonomoDiv");
  const chkAutonomo = document.getElementById("autonomo");



  // Para elegir tipo tramite 

  tipoTramite.addEventListener("change", () => {
    if (tipoTramite.value === "jubilacion") {
        trabajandoBlock.style.display = "block"; // Mostrar
    } else {
        trabajandoBlock.style.display = "none";
        apuradoBlock.style.display = "none";
        checkboxSi.checked = false;
        checkboxNo.checked = false;
        checkboxApurado.checked = false;
        checkboxNo.style.display = "inline";
         // Ocultar
        // Opcional: desmarcar los checkboxes al ocultar
        //const checkboxes = trabajandoBlock.querySelectorAll("input[type='checkbox']");
        //checkboxes.forEach(cb => cb.checked = false);//
    }
});

//Mostrar ocular casilla si/ no

checkboxSi.addEventListener("change", () => {
  if (checkboxSi.checked) {
    apuradoBlock.style.display = "block";
    checkboxNo.parentElement.style.display = "none";
    checkboxNo.checked = false;
  } else {
    apuradoBlock.style.display = "none";
    checkboxApurado.checked = false;
    checkboxNo.parentElement.style.display = "inline" ; 
  }
});

// Escuchamos los radios de "trabajando"
document.querySelectorAll("input[name='trabajando']").forEach(radio => {
    radio.addEventListener("change", () => {
        if (radio.value === "si" && radio.checked) {
            apuradoBlock.style.display = "block";
            
        } else {
            apuradoBlock.style.display = "none";
            document.querySelector("input[name='apurado']").checked = false;
        }
    });
});

  function actualizarMigraciones() {
  // Mostrar u ocultar el div según la nacionalidad
  migracionesDiv.style.display = nacionalidad.value === "extranjero" ? "block" : "none";

  if (nacionalidad.value === "extranjero") {
    // Solo agregar los checkboxes si aún no existen
    if (!migracionesDiv.hasChildNodes()) {
      migracionesDiv.innerHTML = `
        <label><input type="checkbox" id="anses"> Preguntar en ANSES</label><br>
        <label><input type="checkbox" id="migraciones"> Migraciones</label>
      `;
    }
    
  } else {
    // Limpiar el contenido si no es extranjero
    migracionesDiv.innerHTML = "";
  }
}


 //Funcion para botones de informacion

function toggleInfo() {
  if (infoBox.style.display === "none") {
    infoBox.style.display = "block";  // mostrar
  } else {
    infoBox.style.display = "none";   // ocultar
  }
}

// Funcion del boton migraciones
btnInfoMigraciones.addEventListener("click", toggleInfo);
  


//Seleccion de empresas

//Buscan ellos - mostrar si/No

buscanEllos.addEventListener("change", () => {
  empresasBlock.style.display = buscanEllos.checked ? "block" : "none";
});

buscamosNos.addEventListener("change", () => {
  empresasBlock.style.display = buscamosNos.checked ? "block" : "none";
});

//Traigo info del json

fetch ("empresas.json")
  .then(response => response.json())
  .then(empresas => {
    empresas.forEach(emp => {
      const option = document.createElement("option");
      option.value = emp.value;
      option.textContent = emp.text;
      empresaSelect.appendChild(option);

    });
  })
  .catch (error => console.error("Error cargando empresas:", error));

  //Agregar a la lista

  agregarEmpresaBtn.addEventListener("click", () => {
  const selectedValue = empresaSelect.value;
  const selectedText = empresaSelect.options[empresaSelect.selectedIndex].text;

  if (selectedValue) {
    // Crear elemento li
    const li = document.createElement("li");
    li.textContent = selectedText;

    // Botón eliminar
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Eliminar";
    removeBtn.type = "button";
    removeBtn.style.marginLeft = "10px";
    removeBtn.addEventListener("click", () => li.remove());

    li.appendChild(removeBtn);
    listaEmpresas.appendChild(li);

    // Limpiar select
    empresaSelect.value = "";
  }
});


  function actualizarTramite() {
    let seleccionado = Array.from(tramiteRadios).find(r => r.checked);
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

  function actualizarHijos() {
    let seleccionado = Array.from(hijosRadios).find(r => r.checked);
    opcionesHijos.style.display = seleccionado && seleccionado.value === "si" ? "block" : "none";
  }

  function actualizarPetroleo() {
    petroleoOpciones.style.display = chkPetroleo.checked ? "block" : "none";
  }

  function actualizarConstruccion() {
    construccionOpciones.style.display = chkConstruccion.checked ? "block" : "none";
  }

  // En este cambio, el checkbox Autónomo NO despliega más opciones internas, solo se muestra o no el div autonomoDiv
  function actualizarAutonomo() {
    // Ya no mostramos opciones internas, solo dejamos el checkbox visible dentro del div autonomoDiv
    // No hay nada que mostrar u ocultar dentro de autonomoDiv aparte de sí mismo.
    // Por eso, esta función puede quedar vacía o simplemente no usarla.
  }

  nacionalidad.addEventListener("change", actualizarMigraciones);

  tramiteRadios.forEach(radio => radio.addEventListener("change", actualizarTramite));

  hijosRadios.forEach(radio => radio.addEventListener("change", actualizarHijos));

  chkPetroleo.addEventListener("change", actualizarPetroleo);

  chkConstruccion.addEventListener("change", actualizarConstruccion);

  // Ya no usamos listener para el autonomo porque no hay secciones internas que mostrar/ocultar

  // Ejecutamos funciones para ajustar estados al cargar la página
  actualizarMigraciones();
  actualizarTramite();
  actualizarHijos();
  actualizarPetroleo();
  actualizarConstruccion();

  // Botones
  document.getElementById("guardarBtn").addEventListener("click", function () {
    alert("Guardado simulado");
  });

  document.getElementById("imprimirBtn").addEventListener("click", function () {
    window.print();
  });
});
