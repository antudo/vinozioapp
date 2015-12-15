/**
 * Created by Antonio Di Mariano on 03/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */

var prices = [] // hashTable to store prices associated to different product size
/**
 *
 * @param query
 * @param tour
 */
function init_catalogo(query, tour) {
    console.log("---------------------INIT CATALOGO--------------------------")
    var imported = document.createElement('script');
    imported.src = 'js/filteringFunctions.js';
    document.head.appendChild(imported);

    var access_token = window.localStorage.getItem("access_token");
    console.log("init_catalogo access_token---> " + access_token);
    carica()
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
            productEntry = ''; // ready to store HTML to render
            for (var i = 0; i < storage_products.length; i++) {

                var retail_price = storage_products_decodedJson[i].retail_price;
                var product_name = storage_products_decodedJson[i].product.name;
                var main_category = storage_products_decodedJson[i].product.maincategory;
                var sub_category = storage_products_decodedJson[i].product.subcategory;
                var year = storage_products_decodedJson[i].product.year;
                var nation = 'Italy'; // to fix with nation number identification


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
            stop_carica(); // stop loading
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
                //alert(e.target.getAttribute("data-id"));
                showProductPage($(this).attr("data-id"))
                //showVino(getVinoById(e.target.getAttribute("data-tag"), JSONResponse));
            });


        } else {
            productEntry = 'Nessun Prodotto presente in magazzino'
            $('.content0').html(topbar + productEntry); //render HTML
        }
    })
}
/**
 *
 * @param options
 * @returns {string}
 */
function buildProductDetails(options) {

    console.log("OPTIONS" + options.vitigno)


    var vitigno = options.vitigno || '';
    var location = options.location || '';
    var cantina = options.cantina || '';
    var gradazione = options.gradazione || '';
    var denominazione = options.denomination || '';
    var tipo_vino = options.colvin || '';

    /**
     * Costruisco le caratteristiche del prodotto
     * @type {string}
     */
    var product_details = '';
    product_details += '<tr><td style="font-weight:400;">' + lingua[5] + '</td><td style="font-weight:200;">' + location + '</td></tr>';
    product_details += '<tr><td style="font-weight:400;">' + lingua[11] + '</td><td style="font-weight:200;">' + tipo_vino + '</td></tr>';
    product_details += '<tr><td style="font-weight:400;">' + lingua[6] + '</td><td style="font-weight:200;">' + cantina + '</td></tr>';
    product_details += '<tr><td style="font-weight:400;">' + lingua[9] + '</td><td style="font-weight:200;">' + denominazione + '</td></tr>';
    product_details += '<tr><td style="font-weight:400;">' + lingua[8] + '</td><td style="font-weight:200;">' + vitigno + '</td></tr>';
    product_details += '<tr><td style="font-weight:400;">' + lingua[7] + '</td><td style="font-weight:200;">' + gradazione + '</td></tr>';

    return product_details;


}
/**
 *
 * @param available_size
 * @returns {string}
 */
function buildPricesForProductAvailableFormats(available_size) {
    var format_price = '';
    if (!available_size)
        return format_price
    for (var i = 0; i < available_size.length; i++) {
        if (available_size[i].name == "calice") {
            format_price += '<span class="calice_price">' + available_size[i].price + '</span>';
            prices[available_size[i].name] = available_size[i].price;

        }
        /*
        if (available_size[i].name == "bottiglia") {
            format_price += '<span class="bottle_price">' + available_size[i].price + '</span>';

        }
        */
        if (available_size[i].name == "mezzo") {
            format_price += '<span class="half_price">' + available_size[i].price + '</span>';
            prices[available_size[i].name] = available_size[i].price;
        }
    }
    return format_price;

}
/**
 *
 * @param available_size
 * @returns {string}
 */
function buildProductSizeDetails(available_size) {

    var size = '';
    if (!available_size)
        return size

    for (var i = 0; i < available_size.length; i++) {
        if (available_size[i].name == "calice") {
            size += '<div class="calice"></div>';
            tipo = 'calice';
        }
        if (available_size[i].name == "bottiglia") {
            size += '<div class="bottiglia"></div>';
            tipo = 'bottiglia';
        }
        if (available_size[i].name == "mezzo") {
            size += '<div class="mezzo"></div>';
            tipo = 'mezzo';
        }
    }
    return size;
}


/**
 * todo: non dovrebbe essere + necessario mostrare il feedback, dato che non è previsto il voto.
 * Chiedere per maggior conferma
 */
function buildFeedbackStars() {
    /* vecchia procedura
     for (j = 0; j < parseInt(rec.rows.item(i).voto); j++)
     stelle += '<div data-icon="j" class="stella stella_p"></div>';
     for (j = 0; j < (5 - parseInt(rec.rows.item(i).voto)); j++)
     stelle += '<div data-icon="j" class="stella"></div>';

     */
    var stars = ''
    for (var i = 0; i < 5; i++)
        stars += '<div data-icon="j" class="stella stella_p"></div>';
    for (var i = 0; i < 0; i++)
        stars += '<div data-icon="j" class="stella"></div>';
    return stars;
}

/**
 *
 * @param productId
 */
function showProductPage(productId) {

    console.log("[showProductPage]" + productId)
    var access_token = window.localStorage.getItem("access_token");
    console.log("init_catalogo access_token---> " + access_token);
    var url = 'https://obscure-anchorage-5846.herokuapp.com/api/storages/' + productId + '?filter[include]=product';
    var data = '';
    var accessToken = access_token;

    carica()

    sendPOSTRequest(url, 'GET', data, accessToken, function (storage_products) {
        console.log("----[Callback from showProductPage]---- " + storage_products);

        response_string = JSON.stringify(storage_products)
        storage_products_decodedJson = JSON.parse(response_string);

        if (response_string.length > 0) {

            var product_in_storage_id = storage_products_decodedJson.id;
            var product_name = storage_products_decodedJson.product.name;
            var location = "Italia";
            var regione = "Sicilia";
            var anno = storage_products_decodedJson.product.year || '';
            var cantina = storage_products_decodedJson.product.cantina || '';
            var denominazione = storage_products_decodedJson.product.denomitation;
            var vitigno = storage_products_decodedJson.product.vitigno || '';
            var gradazione = storage_products_decodedJson.product.proof || '';
            var prezzo = storage_products_decodedJson.retail_price;
            var formato_disponibile = storage_products_decodedJson.size;

            prices['bottiglia'] = prezzo;


            console.log("FORMATO" + formato_disponibile)
            var options = {
                location: location,
                denomination: denominazione,
                cantania: cantina,
                vitigno: vitigno,
                gradazione: gradazione,
                colvin: lingua[12]
            }

            product_details = buildProductDetails(options);
            stars = buildFeedbackStars();
            product_availability_format = buildProductSizeDetails(formato_disponibile);
            format_prices = buildPricesForProductAvailableFormats(formato_disponibile);
            var descrizione = storage_products_decodedJson.product.description;
            colvin = lingua[12]; // capire perchè è sempre lingua[12]
            var foto = "";

            vinoDOM = '<div class="legno"><div class="tovaglia"><div class="gd"></div><div class="gs"></div></div></div><div class="contenitore_prodotto"><div class="prodotto"><div class="goback">' + lingua[22] + '</div>\
					<h1>' + product_name + '</h1>\
					<div class="cluster ultimo">\
						<div class="dettagli flag n' + location + '"></div><div class="dettagli">' + location + regione + '</div>\
					</div>\
					<div class="cluster ultimo">\
						<div class="dettagli icon-glass"></div><div class="dettagli">' + colvin + '</div>\
					</div>\
					<div class="cluster ultimo">\
						<div class="dettagli icon-annata"></div><div class="dettagli">' + anno + '</div>\
					</div>\
					<div class="clear"></div>\
					<div class="line"></div>\
					<div class="acquisto">\
						<div class="prezzi">&euro; <span class="bottle_price">' + prezzo + '</span>' + format_prices + '</div>\
						\
						<div class="clear"></div>\
						<div class="fbot" style="float:left;margin-top:20px;">' + product_availability_format + '</div>\
						<div class="btn-qnt"><div class="minus_icon" style="float: left;margin-left: 20px;font-size: 20px;width:50px;">-</div>\
						<div class="qnt" style="float: left;text-align: center;width: 40px;">1</div>\
						<div class="plus_icon" style="float: right;margin-right: 20px;font-size: 20px;width:50px;">+</div></div>\
						<div data-id="' + product_in_storage_id + '" class="btn-a">' + lingua[23] + '</div>\
					</div>\
					<div class="clear"></div>\
					<div class="stelle">\
						' + stars + '\
					</div>\
					<div class="clear"></div>\
					' + foto + '\
					<div class="caratteristiche">\
						<table style="width:100%;">\
							' + product_details + '\
						</table>\
					</div>\
					<div class="clear"></div>\
					<div class="descrizione">\
						' + descrizione + '\
					</div>\
					<div class="clear"></div>\
					</div></div>';

        } else {
            vinoDOM = '<div class="legno"><div class="tovaglia"><div class="gd"></div><div class="gs"></div></div></div><div class="contenitore_prodotto"><div class="prodotto"><div class="goback">' + lingua[22] + '</div>\
					<h1>No more information available</h1>\
					<div class="clear"></div>\
					</div></div>'

        }
        stop_carica();
        $('.content0').html(vinoDOM);
        var product_selected=[];
        update_bind_cart();
        porta_su();
        bindGoBackButton();
        bindProductQtyButtons();
        bindOrderNowButton();
        bindProductSizeButtons();

    })

}
/**
 *
 */
function bindGoBackButton() {
    console.log("[bindGoBackButton]");
    $('.goback').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        init_catalogo();
        refresh_bind();
    });
}
/**
 *
 */
function bindProductQtyButtons() {
    console.log("[bindProductQtyButtons]")


    $('.minus_icon').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (parseInt($('.qnt').text()) > 1)
            $('.qnt').text(parseInt($('.qnt').text()) - 1);
    });

    $('.plus_icon').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (parseInt($('.qnt').text()) < 10)
            $('.qnt').text(parseInt($('.qnt').text()) + 1);
    });
}

/**
 * todo : capire se possono esserci selezioni multiple
 *  if (pack == '000')
            pack = '111';
    if (pack == '111') {
            console.log("PACK 111 "+pack)
        }
 */
function bindProductSizeButtons() {
    $('.fbot div').not('.legend').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        refresh_bind();
        $(this).toggleClass("sel");
        var pack = '';
        var tipo = [];
        pack += '0';

        if ($('.fbot .bottiglia').hasClass('sel')) {
            tipo.push("bottiglia");
            $('.fbot .mezzo').removeClass('sel');
            $('.fbot .calice').removeClass('sel');

        }
        if ($('.fbot .mezzo').hasClass('sel')) {
            tipo.push("mezzo")
            $('.fbot .bottiglia').removeClass('sel');
            $('.fbot .calice').removeClass('sel');

        }
        if ($('.fbot .calice').hasClass('sel')) {
            tipo.push("calice")
            $('.fbot .mezzo').removeClass('sel');
            $('.fbot .bottiglia').removeClass('sel');
        }
        $('.fbot').attr('data-pack', pack);
        $('.vino').hide();
        console.log("TIPO: " + tipo );
        product_selected = tipo;

    })
}
/**
 * todo: da inserire la logica per inserire l'ordine nel carrello
 */
function bindOrderNowButton() {
    $('.btn-a').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var productId = $(this).attr("data-id");
        var qtyToOrder = $('.qnt').text();


        var order_to_add = {
            "product_size" : product_selected[0],
            "qty":qtyToOrder,
            "productId":productId,
            price : prices[product_selected[0]],
            subtotal : prices[product_selected[0]] * qtyToOrder


        }


        console.log("order_to_add: "+JSON.stringify(order_to_add))
        addToCart(order_to_add);
        $('.btn-a').css('background', '#9f223f').css('color', '#fff').html('AGGIUNTO');

        setTimeout(function () {
            apri_cart();

            $('.btn-a').css('background', 'none').css('color', '#9f223f').html('ORDINA');
            $('.qnt').text('1');
        }, 200);


        /*if (tipo != "") {
         if (tipo == "bottiglia")
         add_to_cart(rows.item(0).nome, tipo, qnt, rows.item(0).prezzo, id_vin);
         else if (tipo == "calice")
         add_to_cart(rows.item(0).nome, tipo, qnt, rows.item(0).prezzo_cal, id_vin);
         else
         add_to_cart(rows.item(0).nome, tipo, qnt, rows.item(0).prezzo_mez, id_vin);

         $('.btn-a').css('background', '#9f223f').css('color', '#fff').html('AGGIUNTO');

         setTimeout(function () {
         apri_cart();

         $('.btn-a').css('background', 'none').css('color', '#9f223f').html('ORDINA');
         $('.qnt').text('1');
         }, 200);
         }
         */
    });
}
