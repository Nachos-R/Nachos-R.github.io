jQuery(function($) { "use strict";
	
	/*============================*/
	/* 01 - VARIABLES */
	/*============================*/					
	
	var swipers = [], winW, winH, winScr, _isresponsive, xsPoint = 480, smPoint = 768, mdPoint = 992, lgPoint = 1200, addPoint=1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height(); 
	}
	pageCalculations();
					
   if(_ismobile) {$('body').addClass('mobile');}
					
	function updateSlidesPerView(swiperContainer){
		if(winW>=addPoint) return parseInt(swiperContainer.attr('data-add-slides'),10);
		else if(winW>=lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'),10);
		else if(winW>=mdPoint) return parseInt(swiperContainer.attr('data-md-slides'),10);
		else if(winW>=smPoint) return parseInt(swiperContainer.attr('data-sm-slides'),10);
		else return parseInt(swiperContainer.attr('data-xs-slides'),10);
	}             

	function resizeCall(){
		pageCalculations();
      
		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t), centerVar = thisSwiper.params.centeredSlides;
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.update();
			if(!centerVar){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
		});
	}
	if(!_ismobile){
		$(window).resize(function(){
			resizeCall();
		});
	}else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}
                                                  
	/*============================*/
	/* 02 - SWIPER SLIDER */
	/*============================*/
                          
	function initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){								  
			var $t = $(this);								  
			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'),10);
            var slideEffect = $t.attr('data-effect');
			var slidesPerViewVar = $t.attr('data-slides-per-view');
	
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = updateSlidesPerView($t);
			}

            var directMode = $t.attr('data-mode');
            var paginationType = $t.attr('data-pagination');
			var loopVar = parseInt($t.attr('data-loop'),10);
			var speedVar = parseInt($t.attr('data-speed'),10);
            var centerVar = parseInt($t.attr('data-center'),10);
			var freeMode = parseInt($t.attr('data-freemode'),10);
			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				paginationHide:false,
				 paginationType: paginationType,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true, 
				simulateTouch: true,
				centeredSlides: centerVar,
				effect: slideEffect,
                coverflow: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows : false
                },
				direction: directMode,
				freeMode: freeMode,
                updateTranslate: true,
                observer:true,
                preventClicks: true,
                longSwipesRatio: 0.1,
                
                onInit: function(swiper){
                    var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex; 
                    if (swiper.activeIndex == 0) {
                      $t.closest('.arrow-closest').find('.swiper-arrow-left.hide_button').hide();
                      $t.closest('.arrow-closest').find('.swiper-arrow-right.hide_button').show();
                      $t.closest('.arrow-closest').find('.swiper-arrow-left.check').addClass('end');
                      $t.closest('.arrow-closest').find('.swiper-arrow-right.check').removeClass('end');
                      $t.closest('.arrow-closest').find('.swiper-arrow-left.check2').addClass('end');
                      $t.closest('.arrow-closest').find('.swiper-arrow-right.check2').removeClass('end');
                    } 
                 },
                  onSlideChangeStart: function(swiper){  
     /*===========================================*/
	/* DEACTIVATE SLIDER BUTTON (ARTICLE FASHION) */
	/*============================================*/
                  	var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex; 
                    if (swiper.activeIndex == 0) {
                      $t.closest('.arrow-closest').find('.swiper-arrow-left.hide_button').hide();
                      $t.closest('.arrow-closest').find('.swiper-arrow-right.hide_button').show();
                    }
                    else if (swiper.activeIndex == swiper.slides.length-2) {
                      $t.closest('.arrow-closest').find('.swiper-arrow-left.hide_button').show();
                      $t.closest('.arrow-closest').find('.swiper-arrow-right.hide_button').hide();                      
                    }
                    else {
                      $t.closest('.arrow-closest').find('.swiper-arrow-left.hide_button').show();
                      $t.closest('.arrow-closest').find('.swiper-arrow-right.hide_button').show();
                    }

	/*=====================================*/
	/* DEACTIVATE SLIDER BUTTON (MAIN-PAGE) */
	/*======================================*/

                    if (swiper.activeIndex == 0) {
                      $t.closest('.arrow-closest').find('.swiper-arrow-left.check').addClass('end');
                      $t.closest('.arrow-closest').find('.swiper-arrow-right.check').removeClass('end');
                    }
                    else if (swiper.activeIndex == swiper.slides.length-1) {
                      $t.closest('.arrow-closest').find('.swiper-arrow-left.check').removeClass('end');
                      $t.closest('.arrow-closest').find('.swiper-arrow-right.check').addClass('end');                      
                    }
                    else {
                      $t.closest('.arrow-closest').find('.swiper-arrow-left.check').removeClass('end');
                      $t.closest('.arrow-closest').find('.swiper-arrow-right.check').removeClass('end');
                    }
    /*======================================*/

     /*=====================================*/
	/* DEACTIVATE SLIDER BUTTON (ARTICLE) */
	/*======================================*/               
                    if($(window).width() > 992){
	                    if (swiper.activeIndex == 0) {
	                      $t.closest('.arrow-closest').find('.swiper-arrow-left.check2').addClass('end');
	                      $t.closest('.arrow-closest').find('.swiper-arrow-right.check2').removeClass('end');
	                    }
                	  	else if (swiper.activeIndex == swiper.slides.length-3) {
	                    $t.closest('.arrow-closest').find('.swiper-arrow-left.check2').removeClass('end');
	                    $t.closest('.arrow-closest').find('.swiper-arrow-right.check2').addClass('end');                      
	                }
	                    else {
                      	$t.closest('.arrow-closest').find('.swiper-arrow-left.check2').removeClass('end');
                      	$t.closest('.arrow-closest').find('.swiper-arrow-right.check2').removeClass('end');
                    	}
	                }
                    if($(window).width() >= 768 && $(window).width() <= 992){
                    	if (swiper.activeIndex == 0) {
	                      $t.closest('.arrow-closest').find('.swiper-arrow-left.check2').addClass('end');
	                      $t.closest('.arrow-closest').find('.swiper-arrow-right.check2').removeClass('end');
	                    }
                	  	else if (swiper.activeIndex == swiper.slides.length-2) {
	                    $t.closest('.arrow-closest').find('.swiper-arrow-left.check2').removeClass('end');
	                    $t.closest('.arrow-closest').find('.swiper-arrow-right.check2').addClass('end');                      
	                }
	                    else {
                      	$t.closest('.arrow-closest').find('.swiper-arrow-left.check2').removeClass('end');
                      	$t.closest('.arrow-closest').find('.swiper-arrow-right.check2').removeClass('end');
                    	}
                    }
                    if($(window).width() < 768){
                    	if (swiper.activeIndex == 0) {
	                      $t.closest('.arrow-closest').find('.swiper-arrow-left.check2').addClass('end');
	                      $t.closest('.arrow-closest').find('.swiper-arrow-right.check2').removeClass('end');
	                    }
                	  	else if (swiper.activeIndex == swiper.slides.length-1) {
	                    $t.closest('.arrow-closest').find('.swiper-arrow-left.check2').removeClass('end');
	                    $t.closest('.arrow-closest').find('.swiper-arrow-right.check2').addClass('end');                      
	                }
	                    else {
                      	$t.closest('.arrow-closest').find('.swiper-arrow-left.check2').removeClass('end');
                      	$t.closest('.arrow-closest').find('.swiper-arrow-right.check2').removeClass('end');
                    	}
                    }
    /*======================================*/               
                         
                },
                 onSlideChangeEnd: function(swiper){
                      var activeIndex = (loopVar===1)?swiper.activeLoopIndex:swiper.activeIndex;
                        $t.closest('.slider-swiching').find('.swich-parent .swiper-slide').removeClass('active');
                          $t.closest('.slider-swiching').find('.swich-parent .slide-swich').parent().eq(activeIndex).addClass('active');
                }
			});
			
			swipers['swiper-'+index].update();
			initIterator++;
		});
	}
               
    
           
    $(document).on('click', '.swiper-arrow-left', function(){
		swipers['swiper-'+$(this).closest('.arrow-closest').find('.swiper-container').attr('id')].slidePrev();
	});
                    
	$(document).on('click', '.swiper-arrow-right', function(){
		swipers['swiper-'+$(this).closest('.arrow-closest').find('.swiper-container').attr('id')].slideNext();  
	});
	$(document).on('click','.slide-swich', function(){
  var swichIndex = $(this).closest('.slider-swiching').find('.slide-swich').index(this);
   $(this).closest('.slider-swiching').find('.slide-swich').removeClass('active'); 
    $(this).addClass('active'); 
   swipers['swiper-'+$(this).closest('.slider-swiching').find('.container-swich').attr('id')].slideTo(swichIndex);  
  
 });
	
	/*============================*/
	/* WINDOW LOAD */
	/*============================*/
	
	$(window).load(function(){
	    $('.preloader').fadeOut(500);
	    initSwiper();
	    initialize();
        
	});

	$(document).ready(function() {
	  $('.image-open').magnificPopup({type:'image'});
	});
     /*============================*/
	/* Header change color and banner hide*/
	/*============================*/          
    $(window).scroll(function() {
  		if($(window).scrollTop()>86){
  			$(".header").addClass("scroll");
  			$('.header>.container-fluid').css({'background-color': '#f8f8f8'});
  			$('.header>.container-fluid').css({'transition': 'all 0.65s ease-in'});
  			if($(window).width()>992){
  				$(".banner").slideUp(200);
  			}
  		}
  		else{
  			$(".header").removeClass("scroll");
  			$('.header>.container-fluid').css({'background': 'none'});
  			if($(window).width()>992){
  				$(".banner").slideDown(200);
  			}
  		}

  		if($(window).scrollTop()>250){
  			if($(window).width()>992){
  				$(".banner_2").slideUp(200);
  			}
  		}
  		else{
  			if($(window).width()>992){
  				$(".banner_2").slideDown(200);
  			}
  		}
});          
/*===============================================*/	

/*============================*/
/* CLEAR SEARCH INPUT*/
/*============================*/

	$('.clear-input').on('click', function(){
   $(this).parent().find('input').val('','');
 });
/*===============================================*/	

/*============================*/
/* MAKE FULL SCREEN */
/*============================*/
	$('.full').on('click', function () {
        $('.container-swich').find('.swiper-slide-active .image-open').click();
        return false;
	});
/*===============================================*/	
if($(window).width()<=480){
	$('.just-section').find('.row').addClass('vh');
	$('.video-block').removeClass('vh');
}
/*============================*/
/* SHOW/HIDE MENU */
/*============================*/
	$(document).on('click', '.menu', function () {
                       if ($(".navigation").is(":hidden")) {  
                               $('.header>.container-fluid').css({'background-color': '#f8f8f8'});   
                               $('.header>.container-fluid').css({'transition': 'all 0.35s ease-in'});     			
                               $('.navigation').slideDown( 500);
                               $('#toggle').addClass('close-line');
                               if($(window).width()>992){
                               		$('.banner').slideUp(500);
                               		$('.banner_2').slideUp(500);
                           		}
                           	   if($(window).width()<992){
                               		$('#logo').hide();
                               		$('.search_wrapper').hide();
                           	   }
                               $('body').addClass('overflow');
                               $('.layer').addClass('black');
                        }
                        else {
                       		   $('.header>.container-fluid').css({'background': 'none'});
                       		   $('.header>.container-fluid').css({'transition': 'all 0.95s ease-in'});
                               $('.navigation').slideUp(500);                                        				   
                              
                               $('#toggle').removeClass('close-line');                
                               $('body').removeClass('overflow');
                               $('.layer').removeClass('black');
                               if($(window).width()>992){
                               		if($(window).scrollTop()<86){
						  				$('.banner').slideDown(500);
						  				$('.banner_2').slideDown(500);
						  			}
					  			}
					  			if($(window).width()<992){
                               		$('#logo').show();
                               		$('.search_wrapper').show();
                           	   }
                                		
                       }
 return false;
});

$(document).on('click', '.layer', function () {
		$(".menu").click();
	});
/*===============================================*/

/*============================*/
/* SHOW/HIDE SEARCH */
/*============================*/
	
	$(document).on('click', '.search', function () {
			 if ($('.wrapper').is(':hidden')) { 
			 	$('body').addClass('overflow');
			 }
			 else{
			 	$("body").removeClass("overflow");
			 }
		});
		$(document).on('click', '.search.close', function () {
			 	$("body").removeClass("overflow");
	    });

	$(document).on('click', '.search', function () {
       if ($(".search_input").is(":hidden")) {
       		   $(".wrapper").animate({height: 'show'});
               $(".search_input").animate({width: 'show'});                               
               $(".search").hide();
               $(".close").show();                               
       } else {
               $(".search_input").animate({width: 'hide'});  
               $(".wrapper").animate({height: 'hide'});          				   
               $(".search").show();
               $(".close").hide();
       }
return false;
});
/*===============================================*/

/*============================*/
/* DROPDOWN FOOD*/
/*============================*/ 
	
	$(document).on('click', '.dropDown_food', function () {
		if ($(window).width()<992) {
			$(this).parent().find(".dropDown").slideToggle(300);
	}
	});
/*===============================================*/

/*============================*/
/* ACTIVATE POINT*/
/*============================*/   
	
	$('.point').on('click', function () {
		if($(this).hasClass('active_point')){
			$(this).parent().find('.thing').hide(200);
			$(this).removeClass('active_point');
		}
		else{
			$('.thing').hide();
			$(this).parent().find('.thing').show(200);
			$('.point').removeClass('active_point');
			$(this).addClass('active_point');			
		}
	});
/*===============================================*/

/*============================*/
/* SHOW/HIDE FILTR*/
/*============================*/ 
	 if($(window).width()>1200){
		$('.select, .filtr_block').on('mouseenter', function(){
				$('.filtr_block').addClass("filtr_show");
				$(this).find('.fa-angle-down').addClass('fa_hover');
		});
		$('.select, .filtr_block').on('mouseleave', function(){
				$('.filtr_block').removeClass("filtr_show");
				$(this).find('.fa-angle-down').removeClass('fa_hover');			
		});
	}

	if($(window).width()<=1200){
		$('.select').on('click', function () {		
		 if($('.filtr_block').hasClass('filtr_show')){
		 	$('.filtr_block').removeClass('filtr_show');
		 	$(this).find('.fa-angle-down').removeClass('fa_hover');	 	
		 }
		 else{
		 	$('.filtr_block').addClass('filtr_show');
		 	$(this).find('.fa-angle-down').addClass('fa_hover');
		 }
		 return false;
	});}
/*===============================================*/	
		
/*============================*/
/* SHOW/HIDE DETAILS BLOCK*/
/*============================*/ 
	 $(document).on('click', '.section_description', function () {
	 	var counter = $('.section_description').index(this);
      $('.details_block').slideUp(300);
	 	   if ($(this).hasClass('active_border')) {
	 	   	   $(this).removeClass('active_border');
               $(this).find('.point').removeClass('point_rotate'); 
	 	   }else{
	 	   	   $('.section_description').removeClass('active_border');
	 	   	   $(this).addClass('active_border');
	 	   	    $('.details_block').eq(counter).slideDown(300);
	 	   	    $(this).find('.point').addClass('point_rotate');
	 	   }
	 	   return false;
	 });
/*============================*/
/* SHOW/HIDE DETAILS BLOCK (MOBILE)*/
/*============================*/ 
     $(document).on('click', '.mobile-tab', function () {
     	var count = $('.mobile-tab').index(this);
     	$('.details_block').slideUp(300);
     	$('.point').removeClass('point_rotate');
     	if($('.details_block').eq(count).is(':visible')){
     		$('.details_block').eq(count).slideUp(300);
     		$(this).find('.point').removeClass('point_rotate');
     	}
     	else{
     		$('.details_block').eq(count).slideDown(300);
     		$(this).find('.point').addClass('point_rotate');
     	}
     });
/*===============================================*/	

/*============================*/
/* SHOW/HIDE CONTACT FORM*/
/*============================*/
$(document).on('click', '.contact', function () {
           if ($(".contact_container").is(":hidden")) {
           		if($(window).width() > 768){
       			$(".close").show();
       		}	
       			$(this).find('.fa-angle-down').addClass('fa_hover');	
           		$(".contact_container").animate({height: 'show'});   
           		$(".contact_layer").animate({height: 'show'});                            
           } else {
               	$(".close").hide();
               	$(".contact_layer").animate({height: 'hide'});
                $(".contact_container").animate({height: 'hide'});   
                $(this).find('.fa-angle-down').removeClass('fa_hover');	 
               }
 return false;

});
	$(document).on('click', '.close', function () {
		$('.contact_container').animate({height: 'hide'});
		$('.contact_layer').animate({height: 'hide'});
	});	
/*===============================================*/			
			
 /*============================*/
 /*     GOOGLE MAP */
 /*============================*/
                    
    var marker = [], infowindow = [], map, image = $('.map-wrapper').attr('data-marker');

     function addMarker(location,name,contentstr){
        marker[name] = new google.maps.Marker({
            position: location,
            map: map,
   icon: image
        });
        marker[name].setMap(map);

  infowindow[name] = new google.maps.InfoWindow({
   content:contentstr
  });
  
  google.maps.event.addListener(marker[name], 'click', function() {
   infowindow[name].open(map,marker[name]);
  });
     }
 
  function initialize() {

  var lat = $('#map-canvas').attr("data-lat");
  var lng = $('#map-canvas').attr("data-lng");
  var mapStyle = $('#map-canvas').attr("data-style");

  var myLatlng = new google.maps.LatLng(lat,lng);

  var setZoom = parseInt($('#map-canvas').attr("data-zoom"),10);

  var styles = "";

  if (mapStyle=="1"){
   styles = [
    {"featureType": "administrative", "elementType": "labels.text.fill", "stylers": [ { "color": "#444444"}]},{"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"}]}, {"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "poi", "elementType": "labels.text", "stylers": [{"visibility": "off"}]}, {"featureType": "road","elementType": "all", "stylers": [{"saturation": -100},{"lightness": 45}]}, {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"}]}, {"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"}]},{"featureType": "water", "elementType": "all", "stylers": [{"color": "#dbdbdb"}, {"visibility": "on"}]}];
  }else{
            if (mapStyle=="2"){
              styles = [{"featureType":"administrative.land_parcel","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape.man_made","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#f49935"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#fad959"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#a1cdfc"},{"saturation":30},{"lightness":49}]}];   
            } 
        }
  var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
        
        var draggMap;
        if (!_ismobile) {
           draggMap = true;  
        }else{
           draggMap = false;  
        }
         
  var mapOptions = {
   zoom: setZoom,
   disableDefaultUI: false,
   scrollwheel: false,
   zoomControl: true,
   streetViewControl: true,
   center: myLatlng,
            draggable: draggMap
  };
  map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  
  map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');
  

  $('.addresses-block a').each(function(){
   var mark_lat = $(this).attr('data-lat');
   var mark_lng = $(this).attr('data-lng');
   var this_index = $('.addresses-block a').index(this);
   var mark_name = 'template_marker_'+this_index;
   var mark_locat = new google.maps.LatLng(mark_lat, mark_lng);
   var mark_str = $(this).attr('data-string');
   addMarker(mark_locat,mark_name,mark_str); 
  });
  } 	
/*===========================================*/

/*============================*/
/* HIDE PRODUCT(CHECKOUT)*/
/*============================*/
	$(document).on('click', '.hide_product', function(){
		$(this).parent().parent().hide();
	});
/*============================================*/

/*============================*/
/* SHOW/HIDE CHECKOUT BLOCKS*/
/*============================*/
	 $(document).on('click', '.section_checkout.first_block', function () {
	 	$('.checkout_block').hide()
	 	$('.section_checkout.second_block').removeClass('active_border');
	 	$('.your_basket_block').show();	 
	 	$('.section_checkout.first_block').addClass('active_border');	   
	 	   return false;
	 });
	  $(document).on('click', '.section_checkout.second_block', function () {
	 	$('.your_basket_block').hide();	 
	 	$('.section_checkout.first_block').removeClass('active_border');
	 	$('.checkout_block').show();
	 	$('.section_checkout.second_block').addClass('active_border');	   
	 	   return false;
	 });

/*===============================================*/
/*				SELECT STYLE 					*/
/*===============================================*/

	  function tamingselect()
{
	if(!document.getElementById && !document.createTextNode){return;}
	
// Classes for the link and the visible dropdown
	var ts_selectclass='turnintodropdown'; 	// class to identify selects
	var ts_listclass='turnintoselect';		// class to identify ULs
	var ts_boxclass='dropcontainer'; 		// parent element
	var ts_triggeron='activetrigger'; 		// class for the active trigger link
	var ts_triggeroff='trigger';			// class for the inactive trigger link
	var ts_dropdownclosed='dropdownhidden'; // closed dropdown
	var ts_dropdownopen='dropdownvisible';	// open dropdown
/*
	Turn all selects into DOM dropdowns
*/
	var count=0;
	var toreplace=new Array();
	var sels=document.getElementsByTagName('select');
	for(var i=0;i<sels.length;i++){
		if (ts_check(sels[i],ts_selectclass))
		{
			var hiddenfield=document.createElement('input');
			hiddenfield.name=sels[i].name;
			hiddenfield.type='hidden';
			hiddenfield.id=sels[i].id;
			hiddenfield.value=sels[i].options[0].value;
			sels[i].parentNode.insertBefore(hiddenfield,sels[i])
			var trigger=document.createElement('a');
			ts_addclass(trigger,ts_triggeroff);
			trigger.href='#';
			trigger.onclick=function(){
				ts_swapclass(this,ts_triggeroff,ts_triggeron)
				ts_swapclass(this.parentNode.getElementsByTagName('ul')[0],ts_dropdownclosed,ts_dropdownopen);
				return false;
			}
			trigger.appendChild(document.createTextNode(sels[i].options[0].text));
			sels[i].parentNode.insertBefore(trigger,sels[i]);
			var replaceUL=document.createElement('ul');
			for(var j=0;j<sels[i].getElementsByTagName('option').length;j++)
			{
				var newli=document.createElement('li');
				var newa=document.createElement('a');
				newli.v=sels[i].getElementsByTagName('option')[j].value;
				newli.elm=hiddenfield;
				newli.istrigger=trigger;
				newa.href='#';
				newa.appendChild(document.createTextNode(
				sels[i].getElementsByTagName('option')[j].text));
				newli.onclick=function(){ 
					this.elm.value=this.v;
					ts_swapclass(this.istrigger,ts_triggeron,ts_triggeroff);
					ts_swapclass(this.parentNode,ts_dropdownopen,ts_dropdownclosed)
					this.istrigger.firstChild.nodeValue=this.firstChild.firstChild.nodeValue;
					return false;
				}
				newli.appendChild(newa);
				replaceUL.appendChild(newli);
			}
			ts_addclass(replaceUL,ts_dropdownclosed);
			var div=document.createElement('div');
			div.appendChild(replaceUL);
			ts_addclass(div,ts_boxclass);
			sels[i].parentNode.insertBefore(div,sels[i])
			toreplace[count]=sels[i];
			count++;
		}
	}
	
/*
	Turn all ULs with the class defined above into dropdown navigations
*/	

	var uls=document.getElementsByTagName('ul');
	for(var i=0;i<uls.length;i++)
	{
		if(ts_check(uls[i],ts_listclass))
		{
			var newform=document.createElement('form');
			var newselect=document.createElement('select');
			for(j=0;j<uls[i].getElementsByTagName('a').length;j++)
			{
				var newopt=document.createElement('option');
				newopt.value=uls[i].getElementsByTagName('a')[j].href;	
				newopt.appendChild(document.createTextNode(uls[i].getElementsByTagName('a')[j].innerHTML));	
				newselect.appendChild(newopt);
			}
			newselect.onchange=function()
			{
				window.location=this.options[this.selectedIndex].value;
			}
			newform.appendChild(newselect);
			uls[i].parentNode.insertBefore(newform,uls[i]);
			toreplace[count]=uls[i];
			count++;
		}
	}
	for(i=0;i<count;i++){
		toreplace[i].parentNode.removeChild(toreplace[i]);
	}
	function ts_check(o,c)
	{
	 	return new RegExp('\\b'+c+'\\b').test(o.className);
	}
	function ts_swapclass(o,c1,c2)
	{
		var cn=o.className
		o.className=!ts_check(o,c1)?cn.replace(c2,c1):cn.replace(c1,c2);
	}
	function ts_addclass(o,c)
	{
		if(!ts_check(o,c)){o.className+=o.className==''?c:' '+c;}
	}
}

window.onload=function()
{
	tamingselect();
	// add more functions if necessary
}

});

