$(document).ready(function(){
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
          segundos = 10;
      } else if (segundos == 0 && status == "verde") {
          status = "amarillo";
          empezar.dispatchEvent(new Event('click', { 'bubbles': true }));
          segundos = 3;
      }

      document.getElementById("seg").innerHTML = segundos;
  },1000)
});