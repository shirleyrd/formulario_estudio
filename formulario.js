document.addEventListener("DOMContentLoaded", function () {

  // ----------------- ELEMENTOS -----------------
  const nacionalidad = document.getElementById("nacionalidad");
  const migracionesDiv = document.getElementById("migracionesDiv");

  const btnInfoMigraciones = document.getElementById("btnInfoMigraciones");
  const infoBox = document.getElementById("infoBox");

  const btnObservacionEmpresas = document.getElementById("btnObservacionEmpresas");
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

  //Bloque observaciones

  const textarea = document.querySelector("#observaBox textarea");
  const contenedor = document.getElementById("observacionesGuardadas");
  const btnGuardarObservacion = document.getElementById("btnGuardarObservacion");

  // Bloque Uocra

  const radiosUocra = document.querySelectorAll("input[name='uocra']");
  const uocraContenido = document.getElementById("uocraContenido");
 
  //Observacion uocra
  const btnObservacionUocra = document.getElementById("btnObservacionUocra");
  const observaBoxUocra = document.getElementById("observaBoxUocra");
  const btnGuardarObservacionUocra = document.getElementById("btnGuardarObservacionUocra"); 

  //Bloque Sicam

  const radiosAutonomo = document.querySelectorAll("input[name='autonomo']");
  const sicamBlock = document.getElementById("sicamBlock");


  //Observacion Sicam

  const btnObservacionSicam = document.getElementById("btnObservacionSicam");
  const observaBoxSicam = document.getElementById("observaBoxSicam");
  const btnGuardarObservacionSicam = document.getElementById("btnGuardarObservacionSicam");


  //Bloque Pension

  const bloquesJubilacion = document.getElementById("bloquesJubilacion");
  const pensionBlock = document.getElementById("pensionBlock");
  const fieldsetPension = document.getElementById("fieldsetPension");
 
 
  //Pension- revisar

  const chkPensionJubilado = document.getElementById("chkPensionJubilado");
  const pensionJubiladoContenido = document.getElementById("pensionJubiladoContenido");


  //Opciones Pension Jubilado
   const radioTieneBeneficio = document.getElementById("radioTieneBeneficio");
   const radioAnses = document.getElementById("radioAnses");
   const beneficioBox = document. getElementById("beneficioBox"); 

   

   //Boton beneficio

  const inputBeneficio = document.getElementById("inputBeneficio");
  const btnFijarBeneficio = document.getElementById("btnFijarBeneficio");
  const beneficioGuardado = document.getElementById("beneficioGuardado");

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

//-------------------------------------------------------------------------------------------------//

  // Tipo de trámite
  tipoTramite.addEventListener("change", () => {

  if (tipoTramite.value === "jubilacion") {

    // MOSTRAR JUBILACIÓN
    trabajandoBlock.style.display = "block";
    bloquesJubilacion.style.display = "block";

    //  OCULTAR PENSIÓN
    fieldsetPension.style.display = "none";

  } else if (tipoTramite.value === "pension") {

    // MOSTRAR PENSIÓN
    fieldsetPension.style.display = "block";
    pensionBlock.style.display = "block";

    //  OCULTAR JUBILACIÓN
    trabajandoBlock.style.display = "none";
    bloquesJubilacion.style.display = "none";

    // limpiar jubilación
    apuradoBlock.style.display = "none";
    checkboxSi.checked = false;
    checkboxNo.checked = false;
    checkboxApurado.checked = false;

  } else {

    //  OCULTAR TODO
    trabajandoBlock.style.display = "none";
    bloquesJubilacion.style.display = "none";
    fieldsetPension.style.display = "none";
  }

});

 
  // ----------------- EVENTOS -----------------

  // Nacionalidad
  nacionalidad.addEventListener("change", actualizarMigraciones);

  // Botón info
  btnInfoMigraciones.addEventListener("click", toggleInfo);


  //Boton observaciones
  btnObservacionEmpresas.addEventListener("click", () => {
  toggleObservaciones(observaBox);
});

  //UOCRA

  radiosUocra.forEach(radio => {
  radio.addEventListener("change", () => {
    uocraContenido.style.display =
      radio.value === "si" && radio.checked ? "block" : "none";
  });
});
  
  //Boton observaciones uocra

  if (btnObservacionUocra && observaBoxUocra) {
  btnObservacionUocra.addEventListener("click", () => {
    toggleObservaciones(observaBoxUocra);
  });
}

if (btnGuardarObservacionUocra) {
  btnGuardarObservacionUocra.addEventListener("click", () => {
    const texto = document.getElementById("uocraArea").value.trim();
    const contenedor = document.getElementById("observacionesGuardadasUocra");

    if (!texto) {
      alert("Escribí algo primero");
      return;
    }

    const p = document.createElement("p");
    p.textContent = texto;

    contenedor.appendChild(p);

    document.getElementById("uocraArea").value = "";
  });
}


//Autonomo

radiosAutonomo.forEach(radio => {
  radio.addEventListener("change", () => {
    sicamBlock.style.display =
      radio.value === "si" && radio.checked ? "block" : "none";
  });
});

//Boton observaciones sicam

if (btnObservacionSicam && observaBoxSicam) {
  btnObservacionSicam.addEventListener("click", () => {
    toggleObservaciones(observaBoxSicam);
  });
}


if (btnGuardarObservacionSicam) {
  btnGuardarObservacionSicam.addEventListener("click", () => {
    const texto = document.getElementById("sicamArea").value.trim();
    const contenedor = document.getElementById("observacionesGuardadasSicam");

    if (!texto) {
      alert("Escribí algo primero");
      return;
    }

    const p = document.createElement("p");
    p.textContent = texto;

    contenedor.appendChild(p);

    document.getElementById("sicamArea").value = "";
  });
}


  
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
  

  //Guardar observaciones

  btnGuardarObservacion.addEventListener("click", () => {
  const texto = textarea.value.trim();

  if (!texto) {
    alert("Escribí algo primero");
    return;
  }

  const p = document.createElement("p");
  p.textContent = texto;

  contenedor.appendChild(p);

  textarea.value = "";
});

//FUNCION UOCRA

  

  //Funcion generica para reutilizar despues (aplico a uocra ahora boton observaciones)

  function toggleObservaciones(observacionesUocra) {
  observacionesUocra.style.display =
    observacionesUocra.style.display === "none" ? "block" : "none";
  }
   
// Funcion pension - jubi

chkPensionJubilado.addEventListener("change", function () {
        if (this.checked) {
            pensionJubiladoContenido.style.display = "block";
        } else {
            pensionJubiladoContenido.style.display = "none";

            // limpiar radios y input
            radioTieneBeneficio.checked = false;
            radioAnses.checked = false;
            beneficioBox.style.display = "none";
            beneficioBox.querySelector("input").value = "";
        }
    });

    // 🔹 Mostrar input si tiene beneficio
    radioTieneBeneficio.addEventListener("change", function () {
    if (this.checked) {
        beneficioBox.style.display = "block";
        btnFijarBeneficio.style.display = "inline-block";

        // ocultar ANSES
        radioAnses.parentElement.style.display = "none";
    }
});

radioAnses.addEventListener("change", function () {
    if (this.checked) {
        beneficioBox.style.display = "none";
        beneficioBox.querySelector("input").value = "";

        //  volver a mostrar ANSES (por si volvés atrás)
        radioAnses.parentElement.style.display = "block";
    }
});

btnFijarBeneficio.addEventListener("click", () => {
    const valor = beneficioBox.querySelector("input").value.trim();

    if (!valor) {
        alert("Ingrese un número de beneficio");
        return;
    }

    beneficioGuardado.innerHTML = `<p><strong>Nro de beneficio:</strong> ${valor}</p>`;
});



  // Ejecutar funciones al cargar la página
  actualizarMigraciones();  
  actualizarHijos();
  actualizarPetroleo();  
  actualizarConstruccion();

  // Botones generales
  document.getElementById("guardarBtn").addEventListener("click", () => alert("Guardado simulado"));
  document.getElementById("imprimirBtn").addEventListener("click", () => window.print());

 /* const tipoTramiteSelect = document.getElementById("tipoTramite");
  const bloquesJubilacion = document.getElementById("bloquesJubilacion");

function mostrarBloquesJubilacion() {
  if (tipoTramiteSelect.value === "jubilacion") {
    bloquesJubilacion.style.display = "block";
  } else {
    bloquesJubilacion.style.display = "none";
  }
}

tipoTramiteSelect.addEventListener("change", mostrarBloquesJubilacion);

// ejecutar al cargar
mostrarBloquesJubilacion();*/
}); 
