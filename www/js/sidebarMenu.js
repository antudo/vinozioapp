/**
 * Created by Antonio Di Mariano on 03/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */
/**
 *
 */
function update_menu() {

    console.log("UPDATE MENU");

    $(".profile .foto").css("background-image", "url('" + window.localStorage.getItem("photo_r") + "')");
    $(".profile .name").html(window.localStorage.getItem("nome_r"));
    $('.voce').show();
    if (window.localStorage.getItem("rist_log") != "1") {
        $('.voce[data-cont=catalogo]').hide();
        $('.voce[data-cont=tour]').hide();
        $('.voce[data-cont=ristorante]').hide();
    } else {
        $('.voce[data-cont=profilo]').remove();
        $('.voce[data-cont=impostazioni]').remove();
        //$('.voce[data-cont=esci]').hide();
    }
}

/**
 *
 * @param callback
 */
function menu_open(callback) {
    console.log("MENU OPEN " + callback)
    if (typeof callback != "function")
        callback = function () {
        };
    $(".menu").stop().animate({
        "width": "17em"
    }, 300, function () {
        callback();
    });
    width = $(window).width() / parseFloat($("body").css("font-size"));
    width -= 16;
    $(".content0").stop().animate({
        "padding-left": "16em",
        "width": width + "em"
    }, 300);
    $('.pd').hide();

}

/**
 *
 * @param callback
 */
function menu_close(callback) {
    if (typeof callback != "function")
        callback = function () {
        };

    $(".menu").stop().animate({
        "width": "0"
    }, 300, function () {
        callback();
    });

    $(".content0").stop().animate({
        "padding-left": "0",
        "width": "100%"
    }, 300);
    setTimeout(function () {
        $('.pd').fadeIn();
    }, 300);
}
