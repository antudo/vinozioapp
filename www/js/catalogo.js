/**
 * Created by Antonio Di Mariano on 03/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */


function init_catalogo(query, tour) {
    console.log("---------------------INIT CATALOGO--------------------------")
    var imported = document.createElement('script');
    imported.src = 'js/filteringFunctions.js';
    document.head.appendChild(imported);

    var access_token = window.localStorage.getItem("access_token");
    console.log("init_catalogo access_token---> " + access_token);
    update_bind_cart();
    refresh_bind();
    $('.vino').unbind("tap");


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

    var url = 'https://obscure-anchorage-5846.herokuapp.com/api/storages?filter[include]=product';
    var data = '';
    var accessToken = access_token;
    sendPOSTRequest(url, 'GET', data, accessToken, function (storage_products) {
        console.log("----[Callback from init_catalog]----");
        response_string = JSON.stringify(storage_products)
        storage_products_decodedJson = JSON.parse(response_string);
        console.log("storage_products.length: " + storage_products.length)
        if (storage_products.length > 0) {
            productEntry = [];
            for (var i = 0; i < storage_products.length; i++) {

                var retail_price = storage_products_decodedJson[i].retail_price;
                var product_name = storage_products_decodedJson[i].product.name;
                var main_category = storage_products_decodedJson[i].product.maincategory;
                var sub_category = storage_products_decodedJson[i].product.subcategory;
                var year = storage_products_decodedJson[i].product.year;
                var nation = 'Italy'; // to fix with nation number identification

                /*

                 console.log("PARAMS: " + retail_price)
                 console.log("PARAMS: " + product_name)
                 console.log("PARAMS: " + main_category)
                 console.log("PARAMS: " + sub_category)
                 console.log("PARAMS: " + year)
                 console.log("PARAMS: " + nation)
                 */

                productEntry += '<div data-id="' + storage_products_decodedJson[i].id + '" data-tag="' + main_category + '" data-pack="110" data-naz="1" data-vino="273" class="vino">\
                 <p class="vino_nome">' + product_name + '</p>\
                 <div class="clprezzo">&euro;' + retail_price + '</div>\
                 <div class="cluster dx">\
                 <div class="dettagli icon-glass"></div>\
                 <div class="dettagli">' + main_category + '</div>\
                 </div>\
                 <div class="cluster ultimo dx anno">\
                 <div class="dettagli icon-annata"></div>\
                 <div class="dettagli">' + year + '</div>\
                 </div>\
                 <div class="cluster">\
                 <div style="float:left;" class="dettagli flag n1"></div>\
                 <div class="dettagli">' + nation + '</div>\
                 </div>\
                 <div class="clear"></div>\
                 </div>';

            }
            var container = '<div class="contenitore_vini">\
                             <div class="pd"></div>\
                             <div class="ps"></div>';
            console.log("----------------CICLO FINITO. RENDER ")
            $('.content0').html(topbar + container + productEntry + '</div>');


            $('.filter').on("tap", function (e) {
                e.preventDefault();
                e.stopPropagation();
                $(this).addClass("sel");
            });
            $('.vino').on("tap", function (e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("ID VINO--->" + $(this).attr("data-id"))
                alert(e.target.getAttribute("data-id"));
                //showVino(getVinoById(e.target.getAttribute("data-tag"), JSONResponse));
            });


        } else {
            productEntry = 'Nessun Prodotto presente in magazzino'
            $('.content0').html(topbar + productEntry);
        }
    })


    /*
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
     \
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
     */


}


function showProductPage(productId) {

    update_bind_cart();
    $('.content0').html("");
    porta_su();
    for (i = 0; i < 5; i++)
        stelle += '<div data-icon="j" class="stella stella_p"></div>';
    for (i = 0; i < 0; i++)
        stelle += '<div data-icon="j" class="stella"></div>';
    var foto = "";
    colvin = lingua[12];

    carat = "";
    var locazione = ""
    var anno = ""
    var cantina = ""
    var denominazione = ""
    var vitigno = ""
    var gradazione = ""
    tipodisp = "";
    /*

     if (rows.item(0).pack[0] == "1") {
     tipodisp += '<div class="bottiglia"></div>';
     tipo = 'bottiglia';
     }
     if (rows.item(0).pack[1] == "1") {
     tipodisp += '<div class="mezzo"></div>';
     tipo = 'mezzo';
     }
     if (rows.item(0).pack[2] == "1") {
     tipodisp += '<div class="calice"></div>';
     tipo = 'calice';
     }
     */

    var prz = "";


    vinoDOM = '<div class="legno"><div class="tovaglia"><div class="gd"></div><div class="gs"></div></div></div><div class="contenitore_prodotto"><div class="prodotto"><div class="goback">' + lingua[22] + '</div>\
					<h1>' + rows.item(0).nome + '</h1>\
					<div class="cluster ultimo">\
						<div class="dettagli flag n' + rows.item(0).loc + '"></div><div class="dettagli">' + rows.item(0).locazione + regione + '</div>\
					</div>\
					<div class="cluster ultimo">\
						<div class="dettagli icon-glass"></div><div class="dettagli">' + colvin + '</div>\
					</div>\
					<div class="cluster ultimo">\
						<div class="dettagli icon-annata"></div><div class="dettagli">' + rows.item(0).anno + '</div>\
					</div>\
					<div class="clear"></div>\
					<div class="line"></div>\
					<div class="acquisto">\
						<div class="prezzi">&euro; <span class="prezBot">' + rows.item(0).prezzo + '</span>' + prz + '</div>\
						\
						<div class="clear"></div>\
						<div class="fbot" style="float:left;margin-top:20px;">' + tipodisp + '</div>\
						<div class="btn-qnt"><div class="men" style="float: left;margin-left: 20px;font-size: 20px;width:50px;">-</div>\
						<div class="qnt" style="float: left;text-align: center;width: 40px;">1</div>\
						<div class="piu" style="float: right;margin-right: 20px;font-size: 20px;width:50px;">+</div></div>\
						<div data-id="' + rows.item(0).id + '" class="btn-a">' + lingua[23] + '</div>\
					</div>\
					<div class="clear"></div><!--\
					<div class="stelle">\
						' + stelle + '\
					</div>\
					<div class="clear"></div>-->\
					' + foto + '\
					<div class="caratteristiche">\
						<table style="width:100%;">\
							' + carat + '\
						</table>\
					</div>\
					<div class="clear"></div>\
					<div class="descrizione">\
						' + rows.item(0).desc + '\
					</div>\
					<div class="clear"></div>\
					</div></div>';
}
