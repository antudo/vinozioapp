/**
 * Created by Antonio Di Mariano on 04/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */
function onConfirm() {

    $('.sono').addClass('io');

    var txt = new Array();
    i = 0;

    $('.cartArea table tr').each(function () {
        if ($(this).data("tipo") != "calice") {
            txt[i] = {"ID": $(this).attr('data-id-v'), "QNT": $(this).attr('data-qnt')};
            i++;
        }
    });
    vini = JSON.stringify(txt);

    $.ajax({
        url: _topURL + "content.php",
        type: "POST",
        data: {
            cont: "buy_cart",
            elem: vini
        }
    }).done(function (asd) {
        $('.cartArea table').html('');
        $('.totaleVal span').html('0.00');
        $('.cartArea table').attr('data-tot', "0");
        close_cart();
        stop_carica();
        $('.ordina').unbind("tap");
        $('.cameriere').fadeOut();
        $('.sono').removeClass('io');
        init_tour();
    }).fail(function () {
        alert("No internet connection!!");
        sync_db(_topURL + "content.php", {
            cont: "buy_cart",
            elem: vini
        });

        close_cart();
        stop_carica();
        $('.cartArea table').html('');
        $('.totaleVal span').html('0.00');
        $('.cartArea table').attr('data-tot', "0");
        $('.ordina').unbind("tap");
        $('.sono').removeClass('io');

    });


}
function buy_cart() {
    //if(confirm('Vuoi ordinare questi vini?')){
    navigator.notification.confirm(
        'Vuoi ordinare questi vini?', // message
        cameriere,            // callback to invoke with index of button pressed
        'Vinozio',           // title
        'Si,No'     // buttonLabels
    );


}
function add_to_cart(nome, tipo, qnt, prezzo, id_v) {

    if (nome.length > 25)
        nome = nome.substr(0, 25) + "...";


    var cartDOM = '<tr data-tipo="' + tipo + '" data-id-v="' + id_v + '" data-qnt="' + qnt + '" data-prezzo="' + parseFloat(parseFloat(prezzo).toFixed(2) * qnt).toFixed(2) + '">\
		<td>' + nome + '</td>\
		<td><div class="' + tipo + '"></div></td>\
		<td><span class="cartQnt">' + qnt + '</span> x &euro; ' + parseFloat(prezzo).toFixed(2) + '</td>\
		<td>&nbsp;</td>\
	</tr>';

    qntchiam = qnt;
    if ($('.cartArea table tr[data-id-v="' + id_v + '"][data-tipo="' + tipo + '"]').length <= 0)
        $('.cartArea table').append(cartDOM);
    else {
        oldqnt = $('.cartArea table tr[data-id-v="' + id_v + '"][data-tipo="' + tipo + '"]').attr('data-qnt');

        qnt = (qnt * 1) + (oldqnt * 1);
        oldprezzo = $('.cartArea table tr[data-id-v="' + id_v + '"][data-tipo="' + tipo + '"]').attr('data-prezzo');
        newprezzo = (oldprezzo / oldqnt) * qnt;
        $('.cartArea table tr[data-id-v="' + id_v + '"][data-tipo="' + tipo + '"]').attr('data-qnt', qnt);
        $('.cartArea table tr[data-id-v="' + id_v + '"][data-tipo="' + tipo + '"]').attr('data-prezzo', newprezzo);
        $('.cartArea table tr[data-id-v="' + id_v + '"][data-tipo="' + tipo + '"] .cartQnt').html(qnt);
    }
    qnt = qntchiam;
    var tot = $('.cartArea table').attr('data-tot');
    tot = parseFloat(
        (

            parseFloat(prezzo).toFixed(2) * qnt

        ) + (tot * 1)
    ).toFixed(2);
    $('.cartArea table').attr('data-tot', tot);
    $('.totaleVal span').text($('.cartArea table').attr('data-tot'));
    $('.ordina').unbind("tap").bind("tap", function () {
        buy_cart();
    });
    update_bind_cart();
}
function apri_cart() {
    console.log("apri_cart")
    $('.cartArea').addClass('sel');
    $('.btn-cart').addClass('sel');
}
function close_cart() {
    console.log("close_cart")
    $('.cartArea').removeClass('sel');
    $('.btn-cart').removeClass('sel');
}
function update_bind_cart() {
    $('.totaleVal span').text($('.cartArea table').attr('data-tot'));
    $('.btn-cart').unbind('tap').bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).toggleClass('sel');
        $('.cartArea').toggleClass('sel');

    });
    $('.cartArea').unbind('tap').bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        update_bind_cart();
        $('.btn-cart').removeClass('sel');
        $('.cartArea').removeClass('sel');
    });
    $('.cartArea').on("scrollstart", function (e) {
        e.preventDefault();
        e.stopPropagation();
        update_bind_cart();
        $('.btn-cart').removeClass('sel');
        $('.cartArea').removeClass('sel');
    });
    $('.cartArea .pannello .area table tr').unbind('tap').bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        update_bind_cart();
        $('.cartArea .pannello .area table tr').removeClass('trsel');
        $(this).addClass('trsel');
        $('.cartArea .pannello .area table tr.trsel').unbind('tap').bind("tap", function (e) {
            e.preventDefault();
            e.stopPropagation();


            $(this).fadeOut(function () {

                $('.cartArea table').attr('data-tot',
                    parseFloat(
                        $('.cartArea table').attr('data-tot') - (
                            parseFloat($(this).attr('data-prezzo')) /* * $(this).attr('data-qnt') */
                        )
                    ).toFixed(2)
                );
                $(this).remove();
                update_bind_cart();
            });

        });
    });
}
