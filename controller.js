$(document).ready(function () {

  
  var url = 'http://albertsoriano.com/tele/radiosdb.json';
  console.log(url);
 
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
                  //continueCode(obj);
                  userHandler(obj);
                  return (obj);
                  //return request.responseText; 
              }
          }
      }//End function internal
  } //End getText()
  
 
  var json_data = getText();
 
  
  function fendFocusFirstCat() {
	  console.log("HA ENTRADO EN LA SEGUNDA PAGINA");
	  $.caph.focus.controllerProvider.getInstance().focus("fcategories-0");
  }
  
  function fendFocusLastCat() {
	  $.caph.focus.controllerProvider.getInstance().focus("fcategories-11");
  }
  


function userHandler(radios) {
	
	console.log("ENTRO EN CONTROLLER");
	var horizontal = 0; //Control left y right
	var page = 1; //Página de categorias
	var cate = ["Alternative", "Blues", "Classical", "Country", "Decades", "Electronic", "Folk", "Inspirational", "International", "Jazz", "Latin", "Metal", "Misc", "New age", "Pop", "Public Radio", "R&B", "Rap", "Reggae", "Rock", "Seasonal and holiday", "Soundtracks", "Talk", "Themes"];
	updatePageCat(); //Primera actualización de la página
	
	/*PARA PÁGINA RADIOS*/
	//RADIOS
	var pradio = 0; //Indica si hemos pasado a la página de radios o no
	var hrad = 0; //Empieza en 1 -> 0 será la columna de categorias
	var vrad = 0; //Radios en vertical
	var a_r = 1;
	//CATEGORIAS
	var vcatrad = 0; //Categorias en vertical
	var act_c = 0; //Pasamos a categorias (0 no estamos, 1 estamos en la columna)
	var catpage = 0; //Primeras 12 categorias = 0; siguientes 12 categorias = 1.
	var nomore = 0;
	var auxvcat = 0;
	//SORT
	var hsort = 0;
	var act_s = 0; //Pasamos a ordenar (0 no estamos, 1 estamos en la zona)	
	var sorted = 0;
	//REPRODUCTOR
	var hrep = 1; // 0 = Previous, 1 = Play/Stop, 2 = Next
	var act_r = 0;
	var playing = 0;
	//Guardamos info de las radios sonando para los botones de previous y next
	var nameradios = [];
	var urlradios = [];
	var curradio = 0;
	var inith = 0; //Al salir del reproductor, volvemos a la radio que tenía seleccionada
	var initv = 0; 
	var endrad = 0;
	
	updateRadios();
	/********************/
	
	
    document.addEventListener("keydown", function(e) {
        switch(e.keyCode) {
            // Left Arrow
        
        //EN RADIOS
        /*
         * Si hrad == 0 --> voy a categorias
         * Si hrad > 0 --> hrad--;
         */
        //EN CATEGORIAS
        /*
         * No pasa nada
         */
        
        //EN SORT
        /*
         * Si hsort == 0 --> Paso a la radio (0,0) y salgo de sort
         * Si hsort > 0 --> hsort--;
         */
        //EN REPRODUCTOR
        /*
         *  Si hrep == 0 --> act_r = 0 y paso a la radio (0,2)
         *  Si hrep > 0 --> hrep--;
         */
            case 37:

            	if(pradio == 0){ //Página de categoria
            		if(horizontal == 4){ //Volvemos a las categorias anteriores
                		page = 1;
                		updatePageCat();
                	}
                	if(horizontal > 0){ //Control
                		horizontal--;
                	}
            	}else{ //Página de radios	
     		            		
            		if(a_r == 1){ //Zona radios
            			if(hrad == 0){ //Voy a categorias
            				a_r = 0; 
            				act_c = 1;
            			}else{
            				if(hrad > 0){
            					hrad--;
            				}
            			}
            		}else{
            			if(act_s == 1){ //Zona sort
            				if(hsort == 0){ //Paso a la radio (0,0) y salgo de sort
            					act_s = 0;
            					hrad = 0;
            					vrad = 0;
            				}else{
            					if(hsort > 0){
            						hsort--;
            					}
            				}
            			}else{
            				if(act_r == 1){//Zona reproductor
            					if(hrep == 0){ //act_r = 0 y paso a la radio (0,2)
            						act_r = 0;
            						a_r = 1;
            						//hrad = 0;
            						//vrad = 2;
            					}else{
            						if(hrep > 0){
            							hrep--;
            						}
            					}
            				}
            			}
            		}
            		            		
            			
            	}
           
                break;
            // Up Arrow
              //EN RADIOS
                /*
                 * Si vrad == 0 --> Voy a sort (hsort = 0) // Pero en hrad == 3 (y a veces en otras) voy a hsort = 2.
                 * Si vrad > 0 --> vrad--;
                 * Si radio 3,0 (hrad == 3 && vrad == 0) --> act_s = 1 y hsort = 2
                 */
                //EN CATEGORIAS
                /*
                 * Si vcatrad == 0 --> Salgo de categorias y voy a sort (hsort = 0)
                 * Si vcatrad > 0 --> vcatrad--;
                 * Si vcatrad == 12 --> Previous page -vcatrad (Categorias)
                 */
                
                //EN SORT
                /*
                 * No pasa nada
                 */
                //EN REPRODUCTOR
                /*
                 * act_r = 0 y vuelvo a la casilla desde la que había entrado
                 */
            case 38:
            	
            	if(pradio == 1){ //Si estamos en la página de las radios
            		
            		
            		
            		if(a_r == 1){ //Zona radios
            			if(vrad == 0){
            				a_r = 0;
            				act_s = 1;
            				if(hrad == 3){ //Voy a sort (hsort = 0) // Pero en hrad == 3 (y a veces en otras) voy a hsort = 2.
            					hsort = 2;
            				}else{
            					hsort = 0;
            				}
            			}else{
            				if(vrad > 0){
            					vrad--;
            				}
            			}
            			
            		}else{
            			if(act_c == 1){ //Zona categorias
            				if(nomore == 0){
            					if(vcatrad == 0){
                					act_c = 0;
                					act_s = 1;
                					hsort = 0;
                				}else{
                					if(vcatrad == 12){
                						catpage = 0;
                            			updateCatRadio();
                            			fendFocusLastCat();
                            			vcatrad--;
                            			auxvcat--;
                					}else{
                						vcatrad--;
                						auxvcat--;
                					}
                				}	
            				}else{
            					if(auxvcat == 0){
                					act_c = 0;
                					act_s = 1;
                					hsort = 0;
                				}else{
                					if(auxvcat == 12){
                						catpage = 0;
                            			updateCatRadio();
                            			fendFocusLastCat();
                            			auxvcat--;
                					}else{
                						auxvcat--;
                					}
                				}
            				}
            				
            				
            			}else{
            				if(act_r == 1){ //Zona reproductor
            					act_r = 0;
            					a_r = 1;
            					//HERE
            				}
            			}
            		}

	
            	}

                break;
            // Right Arrow
              //EN RADIOS
                /*
                 * Si hrad < 3 --> hrad++;
                 * 
                 */
                //EN CATEGORIAS
                /*
                 * act_c = 0, a_r = 1 y el focusable vuelve a la posición en la que estaba
                 */
                
                //EN SORT
                /*
                 * Si hsort < 2 --> hsort++
                 * Si hort == 2 --> act_s = 0, a_r = 1 y voy a la radio (3,0)
                 */
              //EN REPRODUCTOR
                /*
                 * Si hrep < 2 --> hrep++;
                 * Si hrep == 2 --> act_r = 0, a_r = 1 y voy a la casilla (2,2)
                 * 
                 */
            case 39:
            	if(pradio == 0){ //Página de categorias
            		if(horizontal == 3){ //Pasamos a las siguientes categorias
                		page = 2;
                		updatePageCat();
                	}
                	if(horizontal < 8){ //Control
                		horizontal++;
                	}
            	}else{ //Página de radios
            		
            		if(a_r == 1){ //Zona radios
            			if(hrad < 3){
            				hrad++;
            			}
            		}else{
            			if(act_c == 1){ //Zona categorias
            				act_c = 0;
            				a_r = 1;
            				if(nomore == 1){
            					nomore = 0;
            					vcatrad = auxvcat;
            				}
            			}else{
            				if(act_s == 1){ //Zona sort
            					if(hsort < 2){
            						hsort++;
            					}else{
            						if(hsort == 2){
            							act_s = 0;
            							a_r = 1;
            							hrad = 3;
            							vrad = 0;
            						}
            					}
            					
            				}else{
            					if(act_r == 1){ //Zona reproductor
            						if(hrep < 2){
            							hrep++;
            						}else{
            							if(hrep == 2){
            								act_r = 0;
            								a_r = 1;
            								//hrad = 2;
            								//vrad = 2;
            							}
            						}
            					}
            				}
            			}
            		}
            		
            				
                     		
            	}

                break;
            // Down Arrow
              //EN RADIOS
                /*
                 * Si vrad < 2 --> vrad++;
                 * Si vrad == 2 --> act_r = 1 y voy a hrep = 1; //HABRÁ QUE MIRAR QUE FUNCIONE ASÍ!
                 * 
                 */
                //EN CATEGORIAS
                /*
                * Si vcatrad == 23 --> Nada
                * Si vcatrad < 23 --> vcatrad++;
                * Si vcatrad == 11 --> Next page +vcatrad (Categorias)
                */
                //EN SORT
                /*
                 * act_s = 0 y a_r = 1;
                 */
              //EN REPRODUCTOR
                /*
                 * Nada
                 */

            case 40:
            	if(pradio == 1){ //Si estamos en la página de las radios
            		
            		
            		if(a_r == 1){ //Zona radios
            			if(vrad < 2){
            				vrad++;
            			}else{
            				/*if(vrad == 2){ //ACTUALMENTE LA APP NO LO HACE, ASÍ QUE NADA
            					a_r = 0;
            					act_r = 1;
            					hrep = 1; //COMPROBAR QUE ASÍ SEA
            				}*/
            			}
            		}else{
            			if(act_c == 1){ //Zona categorias
            				if(nomore == 0){
            					if(vcatrad == 11){
                					catpage = 1;
                        			updateCatRadio();
                        			fendFocusFirstCat();
                        			vcatrad++;
                        			auxvcat++;
                				}else{
                					if(vcatrad < 23){
                						vcatrad++;
                						auxvcat++;
                					}
                				}	
            				}else{
            					if(auxvcat == 11){
                					catpage = 1;
                        			updateCatRadio();
                        			fendFocusFirstCat();
                        			auxvcat++;
                				}else{
                					if(auxvcat < 23){
                						auxvcat++;
                					}
                				}
            				}
            				
            			}else{
            				if(act_s == 1){ //Zona sort
            					act_s = 0;
            					a_r = 1;
            				}
            			}
            		}
            		
          		
            	}

                break;
            // Enter
            case 13:
            	//EN RADIOS
                /*
                 * playing = 1, act_r = 1 y hrep = 1;
                 * 
                 */
                //EN CATEGORIAS
                /*
                * Cambio radios y scategoria
                */
                //EN SORT
                /*
                 * sorted = 1 y blabla (ya va)
                 */
              //EN REPRODUCTOR
                /*
                 * Si hrep == 0 --> previous
                 * Si hrep == 1 --> playing = 0 y paro música
                 * Si hrep == 2 --> next
                 * 
                 */
            	if(pradio == 1){ //Segunda página
            		updateCatRadio();
            		if(a_r == 1){ //Zona radios
            			if(playing == 1){
            				stopAudio();
            			}
            			playRadio();
            			//Guardamos las posiciones iniciales para volver a colocar donde toca
            			inith = hrad;
            			initv = vrad;
            			act_r = 1;
            			a_r = 0;
            		}else{
            			if(act_c == 1){ //Zona categorias
            				updateRadios();
            				nomore = 1;
            				//fixvcat = vcatrad;
            			}else{
            				if(act_s == 1){ //Zona sort
            					if(sorted == 1){
            						sorted = 0;
            					}else{
            						sorted = 1;
            					}
            					
                    			updateRadios();
            				}else{
            					if(act_r == 1){ //Zona reproductor
            						if(hrep == 0){ //Previous
            							if(curradio == 0){
            								//Nada, es la última radio
            							}else{
            								if(sorted == 1){ //Alfabeticamente 
            	                				curradio--;
            	                				$("#namesong").html(nameradios[curradio]);
            	                	        	$("#catsong").html(radios[curradio].category);
            	                	        	
            	                	        	var audio = document.getElementById('audio'); 
            	                	            audio.src = urlradios[curradio];
            	                	            audio.load(); //Necesario para poder recargar el stream
            	                	            if(playing == 1){
            	                	            	audio.play();
            	                	            }
            	                	            //audio.play(); 
            	                	            //playing = 1;
            	                			}else{ //Popularidad/defecto
            	                				curradio--;
            	                				$("#namesong").html(radios[curradio].name);
            	                	        	$("#catsong").html(radios[curradio].category);
            	                	        	
            	                	        	var audio = document.getElementById('audio'); 
            	                	            audio.src = radios[curradio].url;
            	                	            audio.load();
            	                	            if(playing == 1){
            	                	            	audio.play();
            	                	            }
            	                	            //audio.play(); //Necesario para poder recargar el stream
            	                	            //playing = 1;
            	                			}
            							}
            							
            						}
            						if(hrep == 1){ //Play/stop
            							if(playing == 0){ //Play
            								playing = 1;
            								playAudio();
            							}else{ //Stop
            								playing = 0;
            								stopAudio();
            							}
            						}
            						if(hrep == 2){ //Next
            							if(curradio == 11){
            								//Nada, final de radios
            							}else{
            								if(sorted == 1){ //Alfabeticamente
            	                				curradio++;
            	                				$("#namesong").html(nameradios[curradio]);
            	                	        	$("#catsong").html(radios[curradio].category);
            	                	        	
            	                	        	var audio = document.getElementById('audio'); 
            	                	            audio.src = urlradios[curradio];
            	                	            audio.load();
            	                	            if(playing == 1){
            	                	            	audio.play();
            	                	            }
            	                	            //audio.play(); //Necesario para poder recargar el stream
            	                	            //playing = 1;
            	                			}else{ //Popularidad/defecto
            	                				curradio++;
            	                				$("#namesong").html(radios[curradio].name);
            	                	        	$("#catsong").html(radios[curradio].category);
            	                	        	
            	                	        	var audio = document.getElementById('audio'); 
            	                	            audio.src = radios[curradio].url;
            	                	            audio.load();
            	                	            if(playing == 1){
            	                	            	audio.play();
            	                	            }
            	                	            //audio.play(); //Necesario para poder recargar el stream
            	                	            //playing = 1;
            	                			}
            							}
            						}
            					}
            				}
            			}
            		}
            		
            	}else{
            		pradio = 1;
            		updateCatRadio();
            	}
            	

                break;
            // RETURN key of remote control
            case 10009:
            	/*if(pradio == 1){ //Volvemos a la página de categorias
            		pradio = 0;
            		
            	}*/
            	
            	/*hrad = inith;
            	vrad = initv;*/
            	
                handleBackKey();
                break;
        }
    });
    
    function updatePageCat(){
    	if(page == 1){ //Primera página
    		for(i=1; i <= 12; i++){ //Categoria a categoría
    			var convert = i-1;
    			var auxc = '#cat'+i;
    			var to_html = "<h1>"+cate[convert]+"</h1>";
    			console.log("<h1>"+cate[convert]+"</h1>");
    			$(auxc).html(to_html);
    			
    		}
    	}else if(page == 2){ //Segunda página
    		for(i=1; i <= 12; i++){ //Categoria a categoría
    			var convert = i+11;
    			var auxc = '#cat'+i;
    			console.log(auxc);
    			var to_html = "<h1>"+cate[convert]+"</h1>";
    			$(auxc).html(to_html);
    		}
    	}
    }
    
    function updateCatRadio(){
    	
    	if(catpage == 0){ //Primeras 12 categorias
    		for(i=0; i < 12; i++){ //Categoria a categoría
    			var auxc = '#catrad'+i;
    			$(auxc).html(cate[i]);
    		}
    	}else{ //Siguientes 12 categorias
    		for(i=0; i < 12; i++){ //Categoria a categoría
    			var auxc = '#catrad'+i;
    			var convert = i+12;
    			$(auxc).html(cate[convert]);
    		}
    	}
    }
    
    function updateRadios(){
    	
    	console.log("HSORT VALE ------------------------------ "+hsort);
    	
    	if(sorted == 1){ //Si el usuario ha hecho clic en ordenar
    		if(hsort == 0){ //Por popularidad
    			var starting = vcatrad*12; //Punto inicial de radios en el array de radios
            	console.log("POPULARITYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY!");
            	var auxi = 0;
            	for(i=0;i<12;i++){ //Actualizamos nombre de todas las radios
            		var auxc = '#rad'+i;
            		var zona = starting+auxi;
            		$(auxc).html(radios[zona].name);
            		auxi++;
            	}
            	
            	$('#scategory').html(cate[vcatrad]); //Actualizamos el título de la categoria actual
    		}
    		if(hsort == 1){//Alfabéticamente
    			console.log("ALFABÉTICAMENTEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
    			var starting = vcatrad*12; //Punto inicial de radios en el array de radios
    			var auxi = 0;
    			var auxsongs = [];
    			for(i=0;i<12;i++){ //Copiamos radios a array auxiliar
    				var k = starting+auxi;
    				auxsongs.push(radios[k].name);
    				auxi++;
    			}
    			auxsongs.sort();//Ordenamos alfabéticamente -->HABRÁ QUE PENSAR EN LAS URL (o matchear el name en la bdd y pillar la URL)
    			console.log("ORDENADAS AQUÍ!!!!");
    			console.log(auxsongs);
    	    	for(y=0;y<12;y++){ //Actualizamos nombre de todas las radios
    	    		var haux = '#rad'+y;
    	    		$(haux).html(auxsongs[y]);
    	    	}
    	    	$('#scategory').html(cate[vcatrad]); //Actualizamos el título de la categoria actual
    		}
    	}else{ //Si no ha hecho clic en ordenar
    		var starting = vcatrad*12; //Punto inicial de radios en el array de radios
        	console.log("NO SORTEEEEEEEEEEEEEEEEEEEEEEED!");
        	var auxi = 0;
        	for(i=0;i<12;i++){ //Actualizamos nombre de todas las radios
        		var auxc = '#rad'+i;
        		var zona = starting+auxi;
        		$(auxc).html(radios[zona].name);
        		auxi++;
        	}
        	
        	$('#scategory').html(cate[vcatrad]); //Actualizamos el título de la categoria actual
    	}
    	  	
    }
    
    function playRadio(){
    	/**/
    	if(playing == 1){
    		stopAudio();
    	}
    	/**/
    	var numradio = 0;
    	var starting = vcatrad*12; //Punto inicial de radios en el array de radios
    	switch(vrad){ //En función de dónde ha hecho clic, miramos de qué radio se trata (por posición)
    	case 0:
    		switch(hrad){
    		case 0:
    			numradio = 0;
    			break;
    		case 1:
    			numradio = 1;
    			break;
    		case 2:
    			numradio = 2;
    			break;
    		case 3:
    			numradio = 3;
    			break;
    		}
    		break;
    	case 1:
    		switch(hrad){
    		case 0:
    			numradio = 4;
    			break;
    		case 1:
    			numradio = 5;
    			break;
    		case 2:
    			numradio = 6;
    			break;
    		case 3:
    			numradio = 7;
    			break;
    		}
    		break;
    	case 2:
    		switch(hrad){
    		case 0:
    			numradio = 8;
    			break;
    		case 1:
    			numradio = 9;
    			break;
    		case 2:
    			numradio = 10;
    			break;
    		case 3:
    			numradio = 11;
    			break;
    		}
    		break;
    
    	}
    	if(sorted == 0){ //Por popularidad y/o defecto
        	
        	var songnum = starting+numradio; //Posición inicial + número de la estación de radio
        	
        	$("#namesong").html(radios[songnum].name);
        	$("#catsong").html(radios[songnum].category);
        	$("#namesong2").html(radios[songnum].name);
        	$("#catsong2").html(radios[songnum].category);
        	
        	var audio = document.getElementById('audio'); 
            audio.src = radios[songnum].url;
            audio.load();
            audio.play(); //Necesario para poder recargar el stream
            playing = 1;
            
            curradio = songnum;
            
    	}else{ //Ordenado alfabeticamente
    		
    		var auxname = ["","","","","","","","","","","",""];
    		var auxname2 = ["","","","","","","","","","","",""];
    		var auxurl = ["","","","","","","","","","","",""];
    		var auxurl2 = ["","","","","","","","","","","",""];
    		var auxs = 0;
    		var cat = "";
    		
    		for(f=0;f<12;f++){
				var k = starting+auxs;
				cat = radios[k].category;
				auxname[f] = radios[k].name;
				auxname2[f] = radios[k].name;
				auxurl[f] = radios[k].url;
				auxs++;	
    		}
    		
    		auxname.sort();
    		for(t=0;t<12;t++){
    			for(u=0;u<12;u++){
    				if(auxname[t] === auxname2[u]){
    					auxurl2[t] = auxurl[u]; //Ordenamos las URL en función del orden alfabético de las radios
    				}
    			}
    		}
    	
    		
    		$("#namesong").html(auxname[numradio]);
        	$("#catsong").html(cat);
        	
        	$("#namesong2").html(auxname[numradio]);
        	$("#catsong2").html(cat);
        	
        	var audio = document.getElementById('audio'); 
            audio.src = auxurl2[numradio];
            audio.load();
            audio.play(); //Necesario para poder recargar el stream
            playing = 1;
            nameradios = auxname;
            urlradios = auxurl2;
            curradio = numradio;
    		
    	}
    	
    }
    
    /*document.getElementById("stop").addEventListener("click", stopMusic);
    function stopMusic(){
    	console.log("PILLLAAAAAADOOOO");
    	var audio = document.getElementById('audio'); 
    	audio.load();
        audio.pause(); //Necesario para poder recargar el stream
        //O PONER SOURCE = "" y load()
    }*/
    function stopAudio(){
    	var audio = document.getElementById('audio'); 
    	audio.src = "";
    	audio.load();
    	
    	/*var repro = document.getElementById('radio-controller-id'); 
    	repro.style.display = "none";
    	
    	var over = document.getElementById('screen-overlay-id'); 
    	over.style.display = "none";*/
    	
    }
    
    function playAudio(){
    	if(sorted == 0){ //No ordenadas
    		var audio = document.getElementById('audio'); 
        	audio.src = radios[curradio].url;
        	audio.load();
        	audio.play();
    	}else{ //Ordenadas
    		var audio = document.getElementById('audio'); 
    		audio.src = urlradios[curradio];
        	audio.load();
        	audio.play();
    	}
    	
    }
    
    
};




});