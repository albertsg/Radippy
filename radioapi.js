$(document).ready(function () {



  //Token --> d5ed4f0fffafe8552443485d80
  //var url = 'http://api.dirble.com/v2/stations?token=d5ed4f0fffafe8552443485d80';
  var url = 'http://albertsoriano.com/tele/radiosdb.json';
  console.log(url);
 //var repr = document.getElementById('playsound');
  //repr.addEventListener("click", play()); 
  var endJSON = false;
  
  function getText(){
      // read text from URL location
      var request = new XMLHttpRequest();
      request.open('GET', 'http://albertsoriano.com/tele/radiosdb.json', true);
      request.send(null);
      console.log("ONDE VAS, COLGAO");
      request.onreadystatechange = function () {
          if (request.readyState === 4 && request.status === 200) {
              var type = request.getResponseHeader('Content-Type');
              if (type.indexOf("text") !== 1) {
                  //console.log(request.responseText);
                  console.log("HOLA QUE TAL AMIGOS DE YOUTUBE");

            	  var obj  = JSON.parse(request.responseText);
            	  endJSON = true;
            	  //console.log(obj);
            	  continueCode(obj);
                  return (obj);
                  //return request.responseText; 
              }
          }
      }//End function internal
  } //End getText()
  
 
  var json_data = getText();
  //console.log(json_data);  
  
  function continueCode(radios){
	  
	  
	  /*console.log(radios);
	  json_data = radios;
	  
	  console.log(radios[5].url);
	  var audio = document.getElementById('audio'); 
	  audio.src = radios[38].url;
	  audio.load();
	  audio.play(); //Necesario para poder recargar el stream*/
	    
  }
  
  
  
 

});