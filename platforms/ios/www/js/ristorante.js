/**
 * Created by Antonio Di Mariano on 04/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */

function init_ristorante() {


    //porta_su();
    var restaurant_view = [
        '<div class="profile_top">\
            <div class="gradient_profile">\
                <div style="padding-top: 4em;" class="center_pro">\
                    <div class="foto" style="background-image: url(http://www.vinozio.com/crm/uploads/1412865942guest.png);"></div>\
                    <div class="p_nome">Ristorante Guest</div>\
                    <div class="p_bio"></div>\
                    <span class="sinistra">www.sitofantastico.com</span>\
                    <span class="destra">ristorante@gmail.com</span>\
                </div>\
            </div>\
            </div>\
            <div style="width: 830px; margin: 0 auto;">\
            <div data-foto="14290238552.jpg" style="background-image: url(\'http://vinozio.com/crm/APP/uploads/14290238552.jpg\');" class="foto_rist"></div>\
            ']
    restaurant_footer = ['\
            <div class="clear"></div>\
            </div>\
            ']

    $('.content0').html(restaurant_view+restaurant_footer);
    var sel = $('.botton.sel').attr("data-div");
    $('.contenitore[data-div='+sel+']').show();
    $('.botton').bind("tap",function(e){
        e.preventDefault();
        e.stopPropagation();
        $('.botton').removeClass('sel');
        $(this).addClass("sel");
        var sel = $(this).attr("data-div");
        $('.contenitore').hide();
        $('.contenitore[data-div='+sel+']').show();
    });
    $('.foto_rist').unbind("tap").bind("tap",function(e){
        e.preventDefault();
        e.stopPropagation();
        $('body').append('<div class="oscuratore"></div>');
        $('.oscuratore').html('<div style="background-image: url('+_topURL+'uploads/'+$(this).attr('data-foto')+');" class="foto_g_rist"></div>').show();
        $('.oscuratore').unbind("tap").bind("tap",function(e){
            e.preventDefault();
            e.stopPropagation();
            $('.oscuratore').remove();
        });
    });

}


