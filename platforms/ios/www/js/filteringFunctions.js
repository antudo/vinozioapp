/**
 * Created by Antonio Di Mariano on 04/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */


$('.filColori div.selezione').removeClass('selezione');
refresh_bind();

$('.goback').unbind("tap").bind("tap", function (e) {
    e.preventDefault();
    e.stopPropagation();
    init_tour();
});

$('.filColori div').not('.legend').unbind("tap").bind("tap", function (e) {
    e.preventDefault();
    e.stopPropagation();
    refresh_bind();
    $('.fbot div').not('.legend').removeClass('sel');
    $(this).toggleClass('selezione');
    $('.vino').hide();

    var pack = $('.fbot').attr('data-pack');

    if (pack == '111') {

        if ($('.filter').attr('data-fnaz') == '0') {

            $('.filColori div').not('.legend').each(function () {
                if ($(this).hasClass("selezione"))
                    $('.vino[data-tag="' + $(this).attr("data-colore") + '"]').show();
                if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))

                    $('.vino').show();
            });

        }
        else {


            $('.filColori div').not('.legend').each(function () {
                if ($(this).hasClass("selezione"))
                    $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-tag="' + $(this).attr("data-colore") + '"]').show();
                if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))

                    $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + ']').show();
            });

        }
    }
    else {

        if ($('.filter').attr('data-fnaz') == '0') {

            $('.filColori div').not('.legend').each(function () {
                if ($(this).hasClass("selezione"))
                    $('.vino[data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))
                //alert($(this).attr("data-colore"));
                    $('.vino[data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
            });


        }
        else {

            $('.filColori div').not('.legend').each(function () {
                if ($(this).hasClass("selezione"))
                    $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))
                //alert($(this).attr("data-colore"));
                    $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
            });

        }
    }

});
$('.fbot div').not('.legend').unbind("tap").bind("tap", function (e) {
    e.preventDefault();
    e.stopPropagation();
    refresh_bind();
    $(this).toggleClass("sel");
    var pack = '';
    if ($('.fbot .bottiglia').hasClass('sel'))
        pack += '1';
    else
        pack += '0';
    if ($('.fbot .mezzo').hasClass('sel'))
        pack += '1';
    else
        pack += '0';
    if ($('.fbot .calice').hasClass('sel'))
        pack += '1';
    else
        pack += '0';
    if (pack == '000')
        pack = '111';
    $('.fbot').attr('data-pack', pack);
    $('.vino').hide();
    if (pack == '111') {
        if ($('.filter').attr('data-fnaz') == '0') {
            $('.filColori div').not('.legend').each(function () {
                if ($(this).hasClass("selezione"))
                    $('.vino[data-tag="' + $(this).attr("data-colore") + '"]').show();
                if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))

                    $('.vino').show();
            });
        }
        else {
            $('.filColori div').not('.legend').each(function () {
                if ($(this).hasClass("selezione"))
                    $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-tag="' + $(this).attr("data-colore") + '"]').show();
                if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))

                    $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + ']').show();
            });
        }
    }
    else {

        if ($('.filter').attr('data-fnaz') == '0') {
            $('.filColori div').not('.legend').each(function () {
                if ($(this).hasClass("selezione"))
                    $('.vino[data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))
                    $('.vino[data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
            });
        }
        else {
            $('.filColori div').not('.legend').each(function () {
                if ($(this).hasClass("selezione"))
                    $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))
                //alert($(this).attr("data-colore"));
                    $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
            });
        }
    }
});



