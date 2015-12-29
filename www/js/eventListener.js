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

        // added for supporting init_catalogo() with params
        var params = $(this).attr("data-query-params");
        console.log("PARAMS = "+params);

        var query = null;
        if(typeof params !== "undefined")
        {
          query = VIN.config.url.filterByproducts;
          if(params == 'vino')
            query += '/?filter[where][and][0][maincategory]=Vino';
          else if(params == 'birra')
            query += '/?filter[where][and][0][maincategory]=Birra';
          else if(params == 'distillato')
            query += '/?filter[where][and][0][maincategory]=Distillato';
        }

        $(this).addClass("voce_o");
        console.log("VOCE:"+voce);
        window['init_' + voce](query);
        update_bind_cart();
        menu_close();
    });
}
