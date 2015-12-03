/**
 * Created by Antonio Di Mariano on 03/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */

function initEvents() {
    $('.header .btn').bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        menu_open();
    });
    $('.menu .btn').bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        menu_close();
    });
    $('.searchbox').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        porta_su();
        $('.searchbox').focus();
    });
    $('.searchbox').keyup(function (e) {
        if (e.which == 13) {
            $('.lente').removeClass('open');
            if ($('.searchbox').val() != "")
                init_ricerca($('.searchbox').val());
            $('.searchbox').val("");
        }
    });
    $('.lente').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if ($(this).hasClass("open")) {
            if ($('.searchbox').val() != "")
                init_ricerca($('.searchbox').val());
            else
                $('.searchbox').blur();
            $('.searchbox').val("");
        }
        $(this).toggleClass('open');
    });
    $(document).bind("swiperight", function (e) {
        e.preventDefault();
        e.stopPropagation();
        menu_open();

    });
    $(document).bind("swipeleft", function (e) {
        e.preventDefault();
        e.stopPropagation();
        menu_close();
        //indietro();
    });
    $('.voce').bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.voce_o').removeClass("voce_o");
        old = voce;
        voce = $(this).attr("data-cont");
        $(this).addClass("voce_o");
        window['init_' + voce]();
        update_bind_cart();
        menu_close();
    });
}
