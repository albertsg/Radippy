

$(document).ready(function() {
	var step = 1;
	var current_page = 1;
	var activated_radio_ctr = 0;
	
	var radio_minimized = 0;
	var radio_paused = 0;
	console.log("HOLA MUNDO!");
	
	var radiogrid_page = 0;
	
	
	//document.getElementById("debug-word").innerHTML = "DEBUGGING";
	
	
	/*
	function backgroundManager() {
		document.getElementById("debug-word").innerHTML += "backgroundManager";
		var imgs_bg = [
		               "images/background1.jpg",
		               "images/background2.jpg",
		               "images/background3.jpg",
		               "images/background4.jpg",
		               "images/background5.jpg",
		               "images/background6.jpg"
		],    
		len = imgs_bg.length,
		idx = 1;
		
		setInterval(function(){
			document.getElementById("debug-word").innerHTML += "interval";
			idx = (idx + 1)%len;
			$("body").css("background", "url(" + imgs_bg[idx]+")");
		}, 20000);
	}
	backgroundManager();
	*/
	
	initApp();
	
	function initApp() {
		controlPageLayout();
		//$.caph.focus.controllerProvider.getInstance().focus("wlcm-btn");
		$.caph.focus.controllerProvider.getInstance().$$setInitialFocusItem($('#first-focus'));
	}
	
	
	function controlPageLayout() {
		if (current_page == 1) {
			var firstpag = document.getElementById('page1');
			console.log(firstpag);
			//var elementsToHide = document.getElementsByClassName("page1hide");
			//var i;
			//for (i = 0; i < elementsToHide.length; i++) {
			//	//elementsToHide[i].style.visibility = 'hidden';
			//	elementsToHide[i].style.display = 'none';
			//}
			
			//firstpag.style.display = 'none';
			//firstpag.style.marginTop = "0px"; 
			//firstpag.style.maxWidth = "1920px";
			
			var secondpag = document.getElementById('page2');
			secondpag.style.display = 'none';
			
			
		}
		if (current_page == 2) {
			setTimeout(changeBackgroundImage, 10000);
			console.log("Entra");
			//var firstcolumn = document.getElementById('ifirstCol');
			//firstcolumn.style.display = 'none'; //or firstcolumn.style.visibility = 'hidden';
			
			var firstpag = document.getElementById('page1');
			firstpag.style.display = 'none';
			var secondpag = document.getElementById('page2');
			secondpag.style.display = 'block';
			
			$.caph.focus.controllerProvider.getInstance().focus("fradios-0");
			
		}

	}
	
	
	
	function changeBackgroundImage()  {
		//document.getElementById("debug-word").innerHTML = "ENTRO";
		var imgs_bg = [
		               "images/background1.jpg",
		               "images/background2.jpg",
		               "images/background3.jpg",
		               "images/background4.jpg",
		               "images/background5.jpg",
		               "images/background6.jpg"
		],    
		len = imgs_bg.length,
		idx = -1;
		
		//console.log("hola mundo2");
		
		if (step < len) {
			step++;
		}else {
			step = 1;
		}
		//document.getElementById("debug-word").innerHTML += " "+step;
		
		
		//var imageRoot = imgs_bg[step - 1];
		//document.getElementById("debug-word").innerHTML += " "+imageRoot;
		
		$("body").css("background", "url("+imgs_bg[step - 1]+")");
		
		setTimeout(changeBackgroundImage, 10000);
	}
	//changeBackgroundImage();
	
	
	$('#clickame').on('click', fadeBackground);
	function fadeBackground() {
		$("body").css("background-image", "url(images/background2.jpg)", "-webkit-transition", "background-image 5000ms linear");
		//document.getElementById("debug-word").innerHTML += "FadeBG";
	}
	
	/*
	$('.prueba2').bgswitcher({
        images: ["background1.jpg","images/background2.jpg","images/background3.jpg"],
        effect: "fade",
        interval: 10000
	});
	*/
	/*
	$(".box").bgswitcher({
		  images: ["background1.jpg", "pic2.jpg", "pic3.jpg"], // Background images
		  effect: "fade" // fade, blind, clip, slide, drop, hide
		});
		*/
	
		
	
	function changeImageCategoryImg() {
		
		var imgs_cat_bg = [
		               "images/categories/cat1.jpg",
		               "images/categories/cat2.jpg",
		               "images/categories/cat3.jpg",
		               "images/categories/cat4.jpg",
		               "images/categories/cat5.jpg",
		               "images/categories/cat6.jpg",
		               "images/categories/cat7.jpg",
		               "images/categories/cat8.jpg",
		               "images/categories/cat9.jpg",
		               "images/categories/cat10.jpg",
		               "images/categories/cat11.jpg",
		               "images/categories/cat12.jpg"
		],    
		len = imgs_cat_bg.length,
		idx = -1;
		step = 1;
		
		var categories = $(".col");
		console.log(categories);
		
		
		
		for (i= 0; i < categories.length; i++) {
			var element = categories.eq(i);
			element.css("background", "url("+imgs_cat_bg[step - 1]+") no-repeat left top");
			element.css("background-size:", "cover");
			step++;
		}
		
		
		
		
	}
	changeImageCategoryImg();
	
	
	
	
	
	
	
	function displayRadioControls() {
		
		if (radio_minimized == 1) {
			var radio_ctr_lt = document.getElementById("radio-controller-lt-id");
			radio_ctr_lt.style.display = 'none';
			radio_minimized = 0;
		}
		
		var radioctr = document.getElementById('radio-controller-id');
		radioctr.style.display = 'block';
		activated_radio_ctr = 1;
		$.caph.focus.controllerProvider.getInstance().setGroup("radio-controller");
		$.caph.focus.controllerProvider.getInstance().focus("fradioctr-playstop");
		//$(".radio-controller").css("display", "block");
		var radioctr = document.getElementById('screen-overlay-id');
		radioctr.style.display = 'block';
	}
	
	
	function radioGridUpdate(page) {
		console.log("ENTRA EN RADIOGRID UPDATE");
		var radioGrid_prePage = document.getElementById("rdg-page0");
		radioGrid_prePage.style.display = 'none';
		
		
		var radioGrid_Page = document.getElementById("rdg-page1");
		radioGrid_Page.style.display = 'block';
		$.caph.focus.controllerProvider.getInstance().focus("fradios-12");
	}
	
	
	
	function minimizeRadioCtr() {
		var radioctr = document.getElementById('radio-controller-id');
		radioctr.style.display = 'none';
		
		var radio_ctr_lt = document.getElementById("radio-controller-lt-id");
		radio_ctr_lt.style.display = 'block';
		
		var radioctr = document.getElementById('screen-overlay-id');
		radioctr.style.display = 'none';
		
		activated_radio_ctr = 0;
		radio_minimized = 1;
	}
	
	
	
	$.caph.focus.activate(function(nearestFocusableFinderProvider, controllerProvider) {
		
		
		controllerProvider.addBeforeKeydownHandler(function(context, controller){
			if (context.event.keyCode === $.caph.focus.Constant.DEFAULT.KEY_MAP.ENTER) {
				if (current_page == 1) {
					current_page = 2;
		  			controlPageLayout();
		  			return false;
				}
				
			}
		}) ;
		
		
		
		/*
		controllerProvider.addBeforeKeydownHandler(function(context, controller) {
  			if (context.event.keyCode === $.caph.focus.Constant.DEFAULT.KEY_MAP.RIGHT) {
  				var focusedElement = controllerProvider.getInstance().getCurrentFocusItem();
  				
  				if (strcmp2(focusedElement.className, "radio-final focused") == 0) {
  					radioGridUpdate(radiogrid_page + 1);
  				}
  				console.log("KEYDOWNHANDLER BEFORE ELEMENT CLASS: "+focusedElement.className);
  				
 				console.log("AFTER CALLBACK EVENT");
  				//controller.setGroup('test');
 				return true; // if returns false, remains of processing are ignored
 			}
 		});
 		*/
		
		
		/*
		controllerProvider.addAfterKeydownHandler(function(context, controller) {
  			if (context.event.keyCode === $.caph.focus.Constant.DEFAULT.KEY_MAP.RIGHT) {
  				var focusedElement = controllerProvider.getInstance().getCurrentFocusItem();
  				
  				//if (strcmp2(focusedElement, ""))
  				console.log("KEYDOWNHANDLER AFTER ELEMENT CLASS: "+focusedElement.className);
 				//console.log("AFTER CALLBACK EVENT");
  				//controller.setGroup('test');
 				return true; // if returns false, remains of processing are ignored
 			}
 		});
 		*/
		
		
		controllerProvider.onFocused(function(event, originalEvent) {
  			if (current_page == 1) {
	  			$(event.currentTarget).css({
	  				border: '2px solid yellow'
	  			});
  			}
  			
  			if (current_page == 2) {
  				/*
  				$(event.currentTarget).css({
	  				border: '2px solid red'
	  			});
	  			*/
  				var aux = $(event.currentTarget).data();
	  			var focusable_class = $(event.currentTarget).attr("class");
	  			console.log("var focusable class: "+ focusable_class);
	  			
	  			var b = "radio focused";
	  			//console.log("str compare a: "+focusable_class );
	  			//console.log("str compare b: "+b);
	  			//console.log("RESULTADO STRCMP: "+strcmp2(focusable_class, b));
	  			
	  			if (((strcmp2(focusable_class, "radio focused")) == 0) || ((strcmp2(focusable_class, "radio-final focused")) == 0)) {
	  				
	  				//console.log("***************//////////////////////////////////** --------------------- ES RADIO FOCUSED");
	  				var currentSelectedObject = $(event.currentTarget);
	  				var currentSelectedObjectClass = currentSelectedObject.attr("class");
	  				//console.log("Current Selected Object Class: "+currentSelectedObjectClass);
	  				//console.log($(event.currentTarget).children(".radio-content").attr("class"));
	  				if ((strcmp2(focusable_class, "radio focused")) == 0) {
	  					$(event.currentTarget).children(".radio-content").attr("class", "radio-content-focused");
	  				}else {
	  					$(event.currentTarget).children(".radio-content-final").attr("class", "radio-content-final-focused");
	  				}
	  				//console.log($(event.currentTarget).children(".radio-content").attr("class"));
	  				
	  				
	  				/*
	  				$(event.currentTarget).children(".radio-content").className = "radio-content-focused";
	  				*/
	  			}
	  			
	  			if ( strcmp2(focusable_class, "previous-category focused") == 0 ) {
	  				$(event.currentTarget).children(".previous-cat-label").attr("class", "selected-label");
	  				$(event.currentTarget).attr("class", "selected-category-focus");
	  				
	  				//$( ".selected-category").children("selected-label").attr("class", "previous-cat-label");
	  				$( "#selected-label-id").attr("class", "previous-cat-label");
	  				//var letras = $( ".selected-category").children("selected-label").attr("class", "previous-cat-label");
	  				//console.log(letras);
	  				$( ".selected-category" ).attr("class", "previous-category-first");
	  				
	  			}
	  			
	  			if ( strcmp2(focusable_class, "previous-category-first focused") == 0 ) {
	  				console.log("ENTRA AL PRIMERO");
	  				$(event.currentTarget).children(".previous-cat-label").attr("class", "selected-label");
	  				$( ".previous-category-first" ).attr("class", "selected-category");
	  			}
	  			
	  			
	  			if ( strcmp2(focusable_class, "search-popular focused") == 0 ) {
	  				console.log("ENTERS");
	  				$(event.currentTarget).attr("class","search-popular-focused");
	  			}
	  			if ( strcmp2(focusable_class, "search-abc focused") == 0 ) {
	  				console.log("ENTERS");
	  				$(event.currentTarget).attr("class","search-abc-focused");
	  			}
	  			if ( strcmp2(focusable_class, "search-extra focused") == 0 ) {
	  				console.log("ENTERS");
	  				$(event.currentTarget).attr("class","search-extra-focused");
	  			}
	  			
	  			if ( strcmp2(focusable_class, "left-container focused") == 0) {
	  				$(event.currentTarget).children(".btn-previous").attr("src", "images/radio-ctr/previous-radio-focused.png");
	  				if (radio_paused == 1) {
	  					$(".btn-stop").attr("src", "images/radio-ctr/play-radio.png");
	  				}
	  			}
	  			if ( strcmp2(focusable_class, "radioctr-stop focused") == 0) {
	  				if (radio_paused == 0) {
	  					$(event.currentTarget).children(".btn-stop").attr("src", "images/radio-ctr/stop-btn-focused.png");
	  				}else {
	  					$(event.currentTarget).children(".btn-stop").attr("src", "images/radio-ctr/play-btn-focused.png");
	  				}
	  			}
	  			if ( strcmp2(focusable_class, "right-container focused") == 0) {
	  				$(event.currentTarget).children(".btn-next").attr("src", "images/radio-ctr/next-radio-focused.png");
	  				if (radio_paused == 1) {
	  					$(".btn-stop").attr("src", "images/radio-ctr/play-radio.png");
	  				}
	  			}
	  			
	  			
	  			var current_group = $.caph.focus.controllerProvider.getInstance().getCurrentGroup();
	  			
	  			if (activated_radio_ctr == 1) {
		  			if (strcmp2(current_group, "radio-controller") != 0) {
		  				minimizeRadioCtr();
		  			}
	  			}
	  			

  			}
  			
  			
  			
  			
  			
  		});
  
  		controllerProvider.onBlurred(function(event, originalEvent) {
  			
  			if (current_page == 1) {
				
	  			$(event.currentTarget).css({
	  				border: ''
	  			});	
  			
  			}
  					
  			if (current_page == 2) {
  				
  				$(event.currentTarget).css({
	  				border: ''
	  			});
  				
  				//console.log("ENTRA EN ONBLURRED");
  				var focusable_class = $(event.currentTarget).attr("class");
  				console.log("BLURRED Focusable class: "+focusable_class);
  				
  				
  				if (((strcmp2(focusable_class, "radio")) == 0) || ((strcmp2(focusable_class, "radio-final")) == 0)) {
	  				
	  				//console.log("***************** ----()----()-----)(------------------------ ES RADIO FOCUSED");
	  				var currentSelectedObject = $(event.currentTarget);
	  				var currentSelectedObjectClass = currentSelectedObject.attr("class");
	  				//console.log("************** Current Selected Object Class: "+currentSelectedObjectClass);
	  				//console.log("************** "+$(event.currentTarget).children(".radio-content-focused").attr("class"));
	  				if ( strcmp2(focusable_class, "radio") == 0) {
	  					$(event.currentTarget).children(".radio-content-focused").attr("class", "radio-content");
	  				}else {
	  					//console.log("ENTRA SEGUNDO");
	  					$(event.currentTarget).children(".radio-content-final-focused").attr("class", "radio-content-final");
	  				}
	  				//console.log("************** "+$(event.currentTarget).children(".radio-content-focused").attr("class"));
	  				/*
	  				$(event.currentTarget).css({
		  				border: '2px solid red'
		  			});
	  				$(event.currentTarget).children(".radio-content").className = "radio-content-focused";
	  				*/
	  			}
  				
  				//console.log("BLURRED Focusable class: "+focusable_class);
  				if ( strcmp2(focusable_class, "selected-category-focus") == 0) {
  					$(event.currentTarget).children(".selected-label").attr("class", "previous-cat-label");
  					$(event.currentTarget).attr("class", "previous-category");
  				}
  				
  				if ( strcmp2(focusable_class, "search-popular-focused") == 0) {
  					$(event.currentTarget).attr("class", "search-popular");
  				}
  				
  				if ( strcmp2(focusable_class, "search-abc-focused") == 0) {
  					$(event.currentTarget).attr("class", "search-abc");
  				}
  				if ( strcmp2(focusable_class, "search-extra-focused") == 0) {
  					$(event.currentTarget).attr("class", "search-extra");
  				}
  				
  				if ( strcmp2(focusable_class, "left-container") == 0) {
	  				$(event.currentTarget).children(".btn-previous").attr("src", "images/radio-ctr/previous-radio.png");
	  			}
	  			if ( strcmp2(focusable_class, "radioctr-stop") == 0) {
	  				if (radio_paused == 0) {
	  					$(event.currentTarget).children(".btn-stop").attr("src", "images/radio-ctr/stop-button.png");
	  				}else {
	  					$(event.currentTarget).children(".btn-stop").attr("src", "images/radio-ctr/play-radio.png");
	  				}
	  			}
	  			if ( strcmp2(focusable_class, "right-container") == 0) {
	  				$(event.currentTarget).children(".btn-next").attr("src", "images/radio-ctr/next-radio.png");
	  			}
  			}	
  			
  		});
  		
  		
  		controllerProvider.onSelected(function(event, originalEvent) {
  			if (current_page == 1) {
  				current_page = 2;
	  			controlPageLayout();
  			}
  			
  			if (current_page == 2) {
  				var selectable_class = $(event.currentTarget).attr("class");
  				console.log("SELECTABLE class: "+selectable_class);
  				
  				if( strcmp2(selectable_class, "search-popular-focused") == 0 ) {
  					//displayBy("popular") //Funion que hace la query de ordenar los resultados por orden de populares
  					$(event.currentTarget).attr("class", "search-popular-selected");
  					$(event.currentTarget).children(".search-popular-img").attr("src", "images/icons/popular-search-icon2-selected.png") 
  					$(".search-abc-selected").attr("class", "search-abc");
  					$(".search-abc").children(".search-abc-img").attr("src", "images/icons/abc-search-icon.png");
  					$(".search-extra-selected").attr("class", "search-extra");
  					$(".search-extra").children(".search-extra-img").attr("src", "images/icons/extra-search-icon.png");
  				}
  				if( strcmp2(selectable_class, "search-abc-focused") == 0 ) {
  					//displayBy("abc") //Funion que hace la query de ordenar los resultados por orden alfabetico
  					$(event.currentTarget).attr("class", "search-abc-selected");
  					$(event.currentTarget).children(".search-abc-img").attr("src", "images/icons/abc-search-icon-selected.png");
  					$(".search-popular-selected").attr("class", "search-popular");
  					$(".search-popular").children(".search-popular-img").attr("src", "images/icons/popular-search-icon2.png");
  					$(".search-extra-selected").attr("class", "search-extra");
  					$(".search-extra").children(".search-extra-img").attr("src", "images/icons/extra-search-icon.png");
  				}
  				if( strcmp2(selectable_class, "search-extra-focused") == 0 ) {
  					//displayBy("extra") //Funion que hace la query de ordenar los resultados por orden de extra
  					console.log("ENTRA AL TERCERO");
  					$(event.currentTarget).attr("class", "search-extra-selected");
  					$(event.currentTarget).children(".search-extra-img").attr("src", "images/icons/extra-search-icon-selected.png");
  					$(".search-popular-selected").attr("class", "search-popular");
  					$(".search-popular").children(".search-popular-img").attr("src", "images/icons/popular-search-icon2.png");
  					$(".search-abc-selected").attr("class", "search-abc");
  					$(".search-abc").children(".search-abc-img").attr("src", "images/icons/abc-search-icon.png");
  					
  				}
  				
  				if (strcmp2(selectable_class, "radio focused") == 0) {
  					console.log("displayRadioControls()");
  					displayRadioControls()
  				}
  				
  				if (strcmp2(selectable_class, "radio-final focused") == 0) {
  					console.log("displayRadioControls()");
  					displayRadioControls()
  				}
  				
  				
  				if (strcmp2(selectable_class,"radioctr-stop focused") == 0) {
  					
  					if (radio_paused == 0) {
  						//stopRadioPlaying()
  						$(event.currentTarget).children(".btn-stop").attr("src", "images/radio-ctr/play-btn-focused.png");
  						$(".indicator-img").attr("src", "images/radio-ctr/stop-indicator.png");
  						radio_paused = 1;
  					}else {
  						//playRadio()
  						$(event.currentTarget).children(".btn-stop").attr("src", "images/radio-ctr/stop-btn-focused.png");
  						$(".indicator-img").attr("src", "images/radio-ctr/curr-playing2.png");
  						radio_paused = 0;
  					}
  				}
  			}
  		});
  		
  		
  		
  	});
	
	
	
	function strcmp2(a, b) {
	    if (a.toString() < b.toString()) return -1;
	    if (a.toString() > b.toString()) return 1;
	    return 0;
	}
	
	function strcmp(str1,str2){
	    return str1.localeCompare(str2)/Math.abs(str1.localeCompare(str2));
	}
	
	
});





/*





console.log("hola mundo");

function changeBackgroundImage()  {
	console.log("hola mundo2");
	if (step < 6) {
		step++;
	}else {
		step = 1;
	}
	
	var imageRoot = "../images/background"+step+".jpg";
	
	document.body.style.backgroundImage = 'url(imageRoot)';
	
	setTimeout("changeBackgroundImage()", 2500);
	
	
}




/*
var image1 = new Image();
image1.src = "images/background1.jpg";

var image2 = new Image();
image2.src = "images/background2.jpg";

var image3 = new Image();
image3.src = "images/background3.jpg";

var image4 = new Image();
image4.src = "images/background4.jpg";

var image5 = new Image();
image5.src = "images/background5.jpg";

var image6 = new Image();
image6.src = "images/background6.jpg";

var step = 1;



function slideit() {
	console.log("ENTRA");
	//document.images.slide.src = eval("image"+step+".src")
	if (step < 6) {
		step++;
	}else {
		step = 1;
	}
	
	var imageRoot = "../images/background"+step+".jpg";
	
	document.body.style.backgroundImage = 'url(imageRoot)';
	
	setTimeout("slideit()", 2500);
}


slideit();
*/