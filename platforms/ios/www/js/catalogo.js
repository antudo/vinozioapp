/**
 * Created by Antonio Di Mariano on 03/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */


function init_catalogo(query, tour) {

    var imported = document.createElement('script');
    imported.src = 'js/filteringFunctions.js';
    document.head.appendChild(imported);


    console.log("init_catalogo")
    update_bind_cart();
    refresh_bind();
    $('.vino').unbind("tap");
    avanti = function () {
    };
    indietro = function () {
    };

    $('*').not(".header").not(".btn").not(".voce").unbind("tap");
    filtrocolore = '<div class="filColori"><div class="legend">' + lingua[11] + '</div><div data-colore="' + lingua[12] + '" class="red selezione"></div><div data-colore="' + lingua[13] + '" class="white selezione"></div><div data-colore="' + lingua[14] + '" class="spum selezione"></div><div data-colore="' + lingua[15] + '" class="rosa selezione"></div></div>';

    var topbar = [

        ' <div class="barra">\
        <div class="filtri">\
            <div class="filter" data-fnaz="0" data-filtro="naz">Nazione</div>\
            <div class="filtra naz">\
            <div class="libera nazz" style="display: none;">Nazione</div>\
            <div data-naz="9" class="nazz" style="display: none;">Germania</div>\
            <div data-naz="8" class="nazz" style="display: none;">Australia</div>\
            <div data-naz="7" class="nazz" style="display: none;">Cile</div>\
            <div data-naz="6" class="nazz">Sud Africa</div>\
            <div data-naz="5" class="nazz" style="display: none;">California</div>\
            <div data-naz="4" class="nazz" style="display: none;">Portogallo</div>\
            <div data-naz="3" class="nazz" style="display: none;">Francia</div>\
            <div data-naz="2" class="nazz" style="display: none;">Spagna</div>\
            <div data-naz="1" class="nazz">Italy</div>\
            </div>\
                <div class="filColori">\
                    <div class="legend">Tipo di vino</div>\
                    <div data-colore="Vino Rosso" class="red"></div>\
                    <div data-colore="Vino Bianco" class="white"></div>\
                    <div data-colore="Spumante" class="spum"></div>\
                    <div data-colore="Vino Rosato" class="rosa"></div>\
                </div>\
                <div data-pack="111" class="fbot">\
                    <div class="legend">Formato</div>\
                    <div class="bottiglia"></div>\
                    <div class="mezzo"></div>\
                    <div class="calice"></div>\
                </div>\
            </div>\
            </div>\
            <div style="clear:both; height:8em;"></div>\
            <div class="legno">\
            <div class="tovaglia">\
                <div class="gd"></div>\
                <div class="gs"></div>\
            </div>\
            </div>'

    ]
    var products_list = [

        '<div class="contenitore_vini">\
        <div class="pd"></div>\
                <div class="ps"></div>\
                <div data-tag="Spumante" data-pack="110" data-naz="1" data-vino="273" class="vino">\
                    <p class="vino_nome">FRANCIACORTA BRUT CUVE...</p>\
                    <div class="clprezzo">€ 55,811</div>\
                    <div class="cluster dx">\
                        <div class="dettagli icon-glass"></div>\
                        <div class="dettagli">Spumante</div>\
                    </div>\
                    <div class="cluster ultimo dx anno">\
                        <div class="dettagli icon-annata"></div>\
                        <div class="dettagli">2005</div>\
                    </div>\
                    <div class="cluster">\
                        <div style="float:left;" class="dettagli flag n1"></div>\
                        <div class="dettagli">Italy</div>\
                    </div>\
                    <div class="clear"></div>\
                </div>\
                <div class="clear"></div>\
                <div data-tag="Vino Bianco" data-pack="111" data-naz="1" data-vino="293" class="vino">\
                    <p class="vino_nome">Vino new Roman</p>\
                    <div class="clprezzo">€ 90,00</div>\
                    <div class="cluster dx">\
                        <div class="dettagli icon-glass"></div>\
                        <div class="dettagli">Vino Bianco</div>\
                    </div>\
                    <div class="cluster ultimo dx anno">\
                        <div class="dettagli icon-annata"></div>\
                        <div class="dettagli">1922</div>\
                    </div>\
                    <div class="cluster">\
                        <div style="float:left;" class="dettagli flag n1"></div>\
                        <div class="dettagli">Italy</div>\
                    </div>\
                    <div class="clear"></div>\
                </div>\
                <div class="clear"></div>\
                <div data-tag="Vino Rosso" data-pack="111" data-naz="6" data-vino="297" class="vino">\
                    <p class="vino_nome">Vino San benedetto</p>\
                    <div class="clprezzo">€ 89,00</div>\
                    <div class="cluster dx">\
                        <div class="dettagli icon-glass"></div>\
                        <div class="dettagli">Vino Rosso</div>\
                    </div>\
                    <div class="cluster ultimo dx anno">\
                        <div class="dettagli icon-annata"></div>\
                        <div class="dettagli">1922</div>\
                    </div>\
                    <div class="cluster">\
                        <div style="float:left;" class="dettagli flag n6"></div>\
                        <div class="dettagli">Sud Africa</div>\
                    </div>\
                    <div class="clear"></div>\
                </div>\
                <div class="clear"></div>\
            </div>\
        '];

    $('.content0').html(topbar+products_list);



}
