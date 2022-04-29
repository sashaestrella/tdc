$(document).ready(function(){
    var tiempoIngresado = null;

    function setColor(tipoColor) {
      var verde = document.getElementById('verde');
      var amarillo = document.getElementById('amarillo');
      var rojo = document.getElementById('rojo');
  
      rojo.style.background = tipoColor == "rojo" ? "#ff3824" : "#ccc"; 
      amarillo.style.background = tipoColor == "amarillo" ? "#f1da36" : "#ccc";
      verde.style.background = tipoColor == "verde" ? "#00c231" : "#ccc";
    }
  
    $("#empezar").toggle(function(){
        setColor("rojo");
        }, function(){
          setColor("amarillo");
        }, function(){
          setColor("verde");
        }, function(){
          setColor("amarillo");
        }, function(){
          setColor("rojo");
        }, function(){
          setColor("amarillo");
        }, function(){
          setColor("verde");
        }, function(){
          setColor("amarillo");
        }
      );
    var empezar = document.getElementById('empezar');
    empezar.dispatchEvent(new Event('click', { 'bubbles': true }));
    
    //el semáforo empieza estando en rojo
    var status = "rojo";
    /** 
     * 10 segundos para el rojo
     * 3 segundos para el amarillo 
     * 10 segundos para el verde
     */
    setInterval(function(){
        segundos = document.getElementById("seg").innerHTML;
        segundos--;
        empezar = document.getElementById('empezar');
  
        if (segundos == 0 && status == "rojo") {
            status = "amarillo";
            empezar.dispatchEvent(new Event('click', { 'bubbles': true }));
            segundos = 3;
        } else if (segundos == 0 && status == "amarillo") {
            status = "verde";
            empezar.dispatchEvent(new Event('click', { 'bubbles': true }));
            segundos = tiempoIngresado == null ? 10 : tiempoIngresado;
        } else if (segundos == 0 && status == "verde") {
            status = "amarillo";
            empezar.dispatchEvent(new Event('click', { 'bubbles': true }));
            segundos = 3;
        }
  
        document.getElementById("seg").innerHTML = segundos;
    },1000)

    function showCover() {
        let coverDiv = document.createElement('div');
        coverDiv.id = 'cover-div';
  
        // evitar el scroll en la página cuando el modal esta abierto
        document.body.style.overflowY = 'hidden';
        document.body.append(coverDiv);
      }
  
      function hideCover() {
        document.getElementById('cover-div').remove();
        document.body.style.overflowY = '';
      }
  
      function showPrompt(text, callback) {
        showCover();
        let form = document.getElementById('prompt-form');
        let container = document.getElementById('prompt-form-container');
        document.getElementById('prompt-message').innerHTML = text;
        form.text.value = '';
  
        function complete(value) {
          hideCover();
          container.style.display = 'none';
          document.onkeydown = null;
          callback(value);
        }
  
        form.onsubmit = function() {
          let value = form.text.value;
          if (value == '') return false; // ignorar submit vacíos
  
          complete(value);
          return false;
        };
  
        form.cancel.onclick = function() {
          complete(null);
        };
  
        document.onkeydown = function(e) {
          if (e.key == 'Escape') {
            complete(null);
          }
        };
  
        let lastElem = form.elements[form.elements.length - 1];
        let firstElem = form.elements[0];
  
        lastElem.onkeydown = function(e) {
          if (e.key == 'Tab' && !e.shiftKey) {
            firstElem.focus();
            return false;
          }
        };
  
        firstElem.onkeydown = function(e) {
          if (e.key == 'Tab' && e.shiftKey) {
            lastElem.focus();
            return false;
          }
        };
  
        container.style.display = 'block';
        form.elements.text.focus();
      }
  
      document.getElementById('show-button').onclick = function() {
        showPrompt("Escribe la cantidad de autos que puedan pasar por cada ciclo de semáforo:", function(value) {
            tiempoIngresado = value != null ? value * 5 : null;
            if(value != null) {
                alert("Una vez acabado el estado actual del semáforo, se le aplicará el valor ingresado: " + value + " por el tiempo máximo por auto en segundos (5)");
            }  
        });
      };
  });