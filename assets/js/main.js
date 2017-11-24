
(function() {
    html_pre_events ();
    html_structure_events ();
}());


function html_pre_events () {
    
    var MobileOS = getMobileOperatingSystem();

    if (($('.tap-phone').size() !== 0) || ($('.no-tap-phone').size() !== 0)) {
        if ((MobileOS === "Android") || (MobileOS === "iOS" )){
            $('.no-tap-phone').remove();
        } else {
            $('.tap-phone').remove();
        }
    }

    if ($('.boton_ios').size() !== 0) {
        
        if (MobileOS === "Android") {
            $('.boton_ios').remove();
        } else if (MobileOS === "iOS" ) {
            $('.boton_android').remove();
        };
    }

    var URLhash = window.location.hash;
    if (URLhash.search("#simulador") !== -1 ) {
        setTimeout(function(){ $("#simulador_container").addClass("abierto"); }, 150);        
    };

}


function html_structure_events () {
  
    posicionar_elementos();
  
    $( window ).resize(function() {
        posicionar_elementos();
    });
}


function posicionar_elementos() {



}


function getOffset(el) {
  el = el.getBoundingClientRect();
  //console.log (el.top + window.scrollY);
  return {
    left: (el.left + window.scrollX),
    top: (el.top + window.scrollY)
  };
}


function getVendorPrefix(prop, value) {
    var webkit = '-webkit-' + prop;
    var moz = '-moz-' + prop;
    var ms = '-ms-' + prop;
    var o = '-o-' + prop;
    var css = prop;

    var prefixed = {};
    prefixed[webkit] = value;
    prefixed[moz] = value;
    prefixed[ms] = value;
    prefixed[o] = value;
    prefixed[css] = value;

    return prefixed;
}


$(document).ready(function() {



    $('.accordion-section-title').on( "click", function(e) {
        var myAccordion=$(this).parents('.accordion');
        e.preventDefault();
        // Grab current anchor value
        var currentAttrValue = $(this).attr('href');

        if($(this).hasClass('active')) {
            var currentTitle=$(e.target)
            currentTitle.removeClass('active');
            //closed solo active si se pulsa sobre el
            currentTitle.next().slideUp( 500, function() {
                // Animation complete.
                currentTitle.next().removeClass('open').addClass('closed');
            });
        }
        else {
            close_accordion_section(myAccordion);
            // Add active class to section title
            $(this).addClass('active');
            // Open up the hidden content panel
            var myContent=$(this).parents('.accordion').find(currentAttrValue);
            myContent.slideDown( 500, function() {
                // Animation complete.
                myContent.removeClass('closed').addClass('open').removeAttr('style');
            });
 
        }
    });

    var footerContentsAccordion= $("footer .accordion-section-content");
    $(window).on('resize', function(){  
        // comprobamos si  sobrecabecera: #sobre_cab (no visible en responsive movil o vertical tablet)
        // por lo que estamos en la version de footer
        // sin acordeon retiramos el display none si existiera
        if($('#sobre_cab').is(":visible")){
           footerContentsAccordion.css({'display':''});

        }

    });







    if (!$('body').hasClass('404')) {
        $( "body" ).one("pointerdown", ".slick-slider", function(e) {
            $(this).slick("slickPause");
        });

        global_events();
        menu_events();
        home_events();
        ventajas_events();
        partners_events();
        registro_events();
        agenda_events();
        app_events();
    }

    var myElement = document.getElementById('cierra_menu_compacto');

    var mc = new Hammer(myElement);
    mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });

    mc.on("swipeup", function(ev) {
        $("#menu_cabecera_compacto_bloque").toggleClass("abierto");
        $("#cierra_menu_compacto").toggleClass("abierto");
        $("#menu_cabecera_compacto_bloque").scrollTop(0);
        $("html,body").toggleClass("fixed");
    });

});


function menu_events() {

    $('#menu_cabecera_compacto_item_principal').click(function (e) {
        e.preventDefault();
        $("#menu_cabecera_compacto_bloque").toggleClass("abierto");
        $("html,body").toggleClass("fixed");

        
        var alto_menu = $("#menu_cabecera_compacto_bloque").height();
        if($("#menu_cabecera_compacto").height() > $(window).height()){
            $("#cierra_menu_compacto").toggleClass("abierto");
            if($("#menu_elclub").hasClass("fixed")){
                $("#cierra_menu_compacto").css("top",(alto_menu - 30)+"px");
            }
            else{
                $("#cierra_menu_compacto").css("top",(alto_menu - 48 + 59 - $(window).scrollTop())+"px");
            }
        }
        

    });

    $('#cierra_menu_compacto').click(function (e) {
        e.preventDefault();
        $("#menu_cabecera_compacto_bloque").toggleClass("abierto");
        $("#cierra_menu_compacto").toggleClass("abierto");
        $("#menu_cabecera_compacto_bloque").scrollTop(0);
        $("html,body").toggleClass("fixed");
    });

    $('.submenu_cabecera_compacto_abre_subsub').click(function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("abierto");

        $("#menu_cabecera_compacto_bloque").stop().animate({scrollTop:$(this).offset().top - 48}, 400, "swing");


        var alto_menu = $("#menu_cabecera_compacto_bloque").height();
        if($("#menu_elclub").hasClass("fixed")){
            $("#cierra_menu_compacto").css("top",(alto_menu - 30)+"px");
        }
        else{
            $("#cierra_menu_compacto").css("top",(alto_menu - 48 + 59 - $(window).scrollTop())+"px");
        }
    });
}

function global_events() {
    $('body').addClass('load');



    $(window).scroll(function() {
        if($(window).width() > 769){
            if($(window).scrollTop() > 145){
                $("#menu_elclub").addClass("fixed");
            }
            else{
                $("#menu_elclub").removeClass("fixed");
            }
        }
        else{
            if($(window).scrollTop() > 60){
                $("#menu_elclub").addClass("fixed");
            }
            else{
                $("#menu_elclub").removeClass("fixed");
            }
        }
    });
    


    $("#boton_simulador, .abre_simulador").click(function (e) {
        e.preventDefault();
        if($(window).width() > 767){
            //animate_scroll(0, 500, "swing");
        }
        else{
            toggle_fixed();
        }
        $("#simulador_container").addClass("abierto");

        $("html,body").addClass("fixed");
    });
    $("#cierra_simulador").click(function (e) {
        e.preventDefault();
        $("#simulador_container").removeClass("abierto");
        $("html,body").removeClass("fixed");
        
    });
    $("#simulador_container").click(function (e) {
        if(e.target.id === "simulador_container"){
            e.preventDefault();
            $("#simulador_container").removeClass("abierto");
            $("html,body").removeClass("fixed");
        }
        
    });

    $(".rango_input").rangeslider({
        polyfill: false,
        // Callback function
        onInit: function() {},

        // Callback function
        onSlide: function(position, value) {




            valor_formateado = (""+value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + "." });

            $(this.$element[0]).parent().find(".etiqueta_rango_valor").text(valor_formateado);
            var izq = $(this.$element[0]).parent().find(".rangeslider__handle").css("left");

            $(this.$element[0]).parent().find(".etiqueta_rango").css("left",parseFloat(izq));

            var percent_ahorro = parseInt($(this.$element[0]).closest(".bloque_rango_simulador").data("ahorro"));

            var id = $(this.$element[0]).closest(".bloque_rango_simulador").attr("id");
            if(id === "bloque_rango_simulador_orange"){
                if(value < 90){
                    percent_ahorro = 24;
                }
            }

            var ahorro = ""+value * percent_ahorro / 100;
            $(this.$element[0]).closest(".bloque_rango_simulador").find(".ahorro").text(ahorro.replace(".",","));

            calcula_ahorro_total();

        },

        // Callback function
        onSlideEnd: function(position, value) {
            var id = $(this.$element[0]).closest(".bloque_rango_simulador").attr("id");
            if($("#gasto_unico").length > 0 && id === $("#gasto_unico").data("general")){
                $("#gasto_unico").val(value).change();
            }
        }
    });

    function calcula_ahorro_total(){
        var new_ahorro = 0;
        $( ".ahorro:not(.unico)" ).each(function( index ) {

            var ahorro = $(this).text().replace(",",".");

            new_ahorro = new_ahorro + parseFloat(ahorro);

            var new_new_ahorro = new_ahorro.toFixed(2).replace(/./g, function(c, i, a) {
                                        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
                                    });

            //Cambio puntos por comas y comas por puntos
            new_new_ahorro = new_new_ahorro.replace(",","|");
            new_new_ahorro = new_new_ahorro.replace(".",",");
            new_new_ahorro = new_new_ahorro.replace("|",".");

            $("#ahorro_total_valor").text(new_new_ahorro);
        });
    }
}


function toggle_fixed(){
    $("html,body").toggleClass("fixed");
}

function is_touch_device() {
  return 'ontouchstart' in window        // works on most browsers 
      || navigator.maxTouchPoints;       // works on IE10/11 and Surface
};

function home_events() {

	$('#slide_cabecera_bloque').slick({
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
	});

    $('#slide_pie_bloque').slick({
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
    });

	$('#unete_bloque_contenedor_mobile').slick({
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        prevArrow: '<span class="nav_slide izq_slide"></span>',
        nextArrow: '<span class="nav_slide der_slide"></span>'
	});

    var numero = 1;
    $("body").on('touchend', function(e) {
        if(e.target.id === "tooltip_cheque"){
        
        }
        else if($(e.target).hasClass("cheque_tooltip")){
            var mas_left = 30;
            var mas_top = 35;

            if($(e.target).hasClass("tooltip_ventajas")){
                var mas_left = 130;
                var mas_top = 75;
            }

            var izq = Math.floor($(e.target).offset().left + mas_left - $("#tooltip_cheque").width()/2);
            var top = Math.floor($(e.target).offset().top + mas_top);
            $("#tooltip_cheque").css("left",izq+"px");
            $("#tooltip_cheque").css("top",top+"px");
            $("#tooltip_cheque").show();
        }
        else if($(e.target).hasClass("legal_numero")){  
            if(!$(e.target).parent().hasClass("activo")){
                $(".legales_puntos_item").removeClass("activo");
                $(e.target).parent().addClass("activo");
            }
            else{
                $(".legales_puntos_item").removeClass("activo");

            }

        }
        else{
            $("#tooltip_cheque").hide();
            //$(".legales_puntos_item").removeClass("activo");

        }
    });
    
    if(!is_touch_device()){
        $(".legales_puntos_item").addClass("no_touch");
        $(".legal_numero").mouseenter(function(){
            $(this).parent().addClass("activo");
        });
        
        $(".legal_numero").mouseleave(function(){
            $(this).parent().removeClass("activo");
            
        });
    }
    
    
    $(".cheque_tooltip").mouseenter(function(){


        var mas_left = 30;
        var mas_top = 35;

        if($(this).hasClass("tooltip_ventajas")){
            var mas_left = 130;
            var mas_top = 75;
        }

        var izq = Math.floor($(this).offset().left + mas_left - $("#tooltip_cheque").width()/2);
        var top = Math.floor($(this).offset().top + mas_top);
        $("#tooltip_cheque").css("left",izq+"px");
        $("#tooltip_cheque").css("top",top+"px");
        $("#tooltip_cheque").show();
    });
    
    $(".cheque_tooltip").mouseleave(function(){
        $("#tooltip_cheque").hide();
    });
    

}

function ventajas_events() {
    $('#slider_descuentos').slick({
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
    });

    $("#consulta_boton_a").click(function (e) {
        e.preventDefault();

        $(this).toggleClass("cerrado");
        animate_scroll($(".consulta_boton").offset().top, 500, "swing");

 
        if($("#ventajas_centros_comerciales").is(":visible")){
            $("#consulta_boton_abajo").css("display","block");
            $("#consulta_boton_arriba").css("display","none");
            $("#ventajas_centros_comerciales").slideUp();

        }
        else{
            $("#consulta_boton_abajo").css("display","none");
            $("#consulta_boton_arriba").css("display","block");
            $("#ventajas_centros_comerciales").slideDown();

        }
    });
}

function partners_events() {




    $("#gasto_unico").rangeslider({
        polyfill: false,
        // Callback function
        onInit: function() {},

        // Callback function
        onSlide: function(position, value) {

            var id_general = $(this.$element[0]).data("general");
            $('#'+id_general+' input[type="range"]').val(value).change();


            valor_formateado = (""+value).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + "." });

            $(this.$element[0]).parent().find(".etiqueta_rango_valor").text(valor_formateado);

            var izq = $(this.$element[0]).parent().find(".rangeslider__handle").css("left");
            $(this.$element[0]).parent().find(".etiqueta_rango").css("left",izq);

            var percent_ahorro = parseInt($(this.$element[0]).data("ahorro"));

            var id = $(this.$element[0]).closest(".bloque_simulador_unico").attr("id");
            if(id === "bloque_rango_simulador_unico_orange"){
                if(value < 90){
                    percent_ahorro = 24;
                }
            }
            
            var ahorro = "" + value * percent_ahorro / 100;
            $(this.$element[0]).closest(".bloque_simulador_unico").find(".ahorro").text(ahorro.replace(".",","));

        },

        // Callback function
        onSlideEnd: function(position, value) {

        }
    });



    $("#consulta_gasolineras_boton_a").click(function (e) {
        e.preventDefault();

        animate_scroll($("#consulta_gasolineras_boton").offset().top, 500, "swing");

 
        if($("#partners_estaciones_servicio").is(":visible")){
            $("#consulta_boton_abajo").show();
            $("#consulta_boton_arriba").hide();
            $("#partners_estaciones_servicio").slideUp();

        }
        else{
            $("#consulta_boton_abajo").hide();
            $("#consulta_boton_arriba").show();
            $("#partners_estaciones_servicio").slideDown();

        }
    });

    var ciudad_abierta = false;


    $(window).click(function (e) {
        if(!$(e.target).hasClass("ciudad")){
            if(ciudad_abierta && $(e.target).closest(".ciudades").length <= 0){
                $(".flecha").hide();  
                $(".ciudades").hide();  
                ciudad_abierta = false;
            }
        }
    });

    $(".ciudad").click(function (e) {
        e.preventDefault();
        ciudad_abierta = true;
        $(".ciudades").hide();
        $(".flecha").hide();
        var ciudad = $(this).data("ciudad");
        var top_ciudades = $(this).offset().top + 30 - $("#partners_estaciones_servicio_bloque").offset().top;
        $("#"+ciudad).css("top",top_ciudades+"px");


        $(this).parent().find(".flecha").show();  
        $("#"+ciudad).show();

    });

    
    

    $(".cerrar_ciudades").click(function (e) {
        e.preventDefault();
        $(".flecha").hide();  
        $(this).parent().hide();
    });
}

function agenda_events(){


    $('#slide_cabecera_agenda_bloque').slick({
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        slide: ".slide_cabecera_item"
    });

    $(".agenda_selector").click(function (e) {
        e.preventDefault();
        $(this).toggleClass("activo");
    });

}

function animate_scroll(donde, velocidad, easing, callback){
    var body = $("html, body");
    body.stop().animate({scrollTop:donde}, velocidad, easing, callback);
    if(callback){
        callback();
    }
}


function registro_events(){

    $("#si_recibir").click(function (e) {
        e.preventDefault();
        $(this).addClass("activo");
        $("#no_recibir").removeClass("activo");
        $("#mandar_a_casa").slideDown();
    });

    $("#no_recibir").click(function (e) {
        e.preventDefault();
        $(this).addClass("activo");
        $("#si_recibir").removeClass("activo");
        $("#mandar_a_casa").slideUp();
    });
}


function app_events() {

}
