document.addEventListener("DOMContentLoaded", function () {
  const nacionalidad = document.getElementById("nacionalidad");
  const migracionesDiv = document.getElementById("migracionesDiv");

  const tramiteRadios = document.querySelectorAll("input[name='tramite']");
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

  function actualizarMigraciones() {
    migracionesDiv.style.display = nacionalidad.value === "extranjero" ? "block" : "none";
  }

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
