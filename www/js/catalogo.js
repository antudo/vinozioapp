/**
 * Created by Antonio Di Mariano on 03/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */

var prices = [] // hashTable to store prices associated to different product size

var selectedProduct = { name: '' };
var cart = [
  // { name: '', quantity: 2, category: 'calice' }
];

var product_selected = [];

/**
 *
 * @param query
 * @param tour
 */
function init_catalogo(query, selezionato) {
    console.log("---------------------INIT CATALOGO--------------------------")
    var imported = document.createElement('script');
    imported.src = 'js/filteringFunctions.js';
    document.head.appendChild(imported);

    var access_token = window.localStorage.getItem("access_token");
    console.log("init_catalogo access_token---> " + access_token);
    carica()
    $('*').not(".header").not(".btn").not(".voce").unbind("tap");
    //todo: spostare in una funzione function renderCatalogoTopBar()
    var topbar = [

        ' <div class="barra">\
        <div class="filtri">\
            <div class="filter" data-fnaz="0" data-filtro="naz">Nazione</div>\
            <div class="filtra naz">\
            <div class="libera nazz" style="display: none;">Nazione</div>\
            <div data-naz="9" class="nazz" style="display: none; ">Germania</div>\
            <div data-naz="8" class="nazz" style="display: none;">Australia</div>\
            <div data-naz="7" class="nazz" style="display: none;">Cile</div>\
            <div data-naz="6" class="nazz" style="display: none;>Sud Africa</div>\
            <div data-naz="5" class="nazz" style="display: none;">California</div>\
            <div data-naz="4" class="nazz" style="display: none;">Portogallo</div>\
            <div data-naz="3" class="nazz" style="display: none;">Francia</div>\
            <div data-naz="2" class="nazz" style="display: none;">Spagna</div>\
            <div data-naz="1" class="nazz">Italy</div>\
            </div>\
                <div data-filter="header-filter" class="filColori">\
                    <div class="legend">Tipo di vino</div>\
                    <div data-colore="Vino Rosso" class="red"></div>\
                    <div data-colore="Vino Bianco" class="white"></div>\
                    <div data-colore="Spumante" class="spum"></div>\
                    <div data-colore="Vino Rosato" class="rosa"></div>\
                </div>\
                <div data-filter="header_bottles" class="fbot">\
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

    if (!query) {

        // var config = window.localStorage.getItem('config');
        var config = VIN.config;
        var url_config = config;
        var url = url_config.url.getStorageAndIncludeProducts;
        //var url = 'https://obscure-anchorage-5846.herokuapp.com/api/storages?filter[include]=product';

    } else {
        var url = query
    }

    console.log("URL: " + url)

    var data = '';
    var accessToken = access_token;


    sendAPIRequest(url, 'GET', data, accessToken, function (storage_products) {
        console.log("----[Callback from init_catalog]----");

        if(!storage_products) {
            productEntry = '<div class="vino"><p> Nessun Prodotto trovato</p></div>'
            stop_carica()
            return $('.content0').html(topbar + productEntry); //render HTML
        }
        else {
            response_string = JSON.stringify(storage_products)
            storage_products_decodedJson = JSON.parse(response_string);
            console.log("storage_products.length: " + storage_products.length)
                console.log("storage_products: " + JSON.stringify(storage_products_decodedJson))


            if (storage_products && storage_products.length > 0) {
                productEntry = ''; // ready to store HTML to render
                for (var i = 0; i < storage_products.length; i++) {

                    if(storage_products_decodedJson[i].external) {
                        console.log("EXTERNAL-----------> "+storage_products_decodedJson[i].external.name)
                    }
                    var retail_price = storage_products_decodedJson[i].retail_price ;
                    var product_name  = (storage_products_decodedJson[i].product) ? storage_products_decodedJson[i].product.name : storage_products_decodedJson[i].external.name;
                    var main_category = (storage_products_decodedJson[i].product) ? storage_products_decodedJson[i].product.maincategory :  storage_products_decodedJson[i].external.name;
                    var sub_category = (storage_products_decodedJson[i].product)  ? storage_products_decodedJson[i].product.subcategory : storage_products_decodedJson[i].external.name;
                    var year = (storage_products_decodedJson[i].product) ? storage_products_decodedJson[i].product.year : storage_products_decodedJson[i].external.name;
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
                    showProductPage($(this).attr("data-id"))
                });
            } else {
                productEntry = '<div class="vino"><p> Nessun Prodotto trovato</p></div>'
                $('.content0').html(topbar + productEntry); //render HTML
                stop_carica()
            }
            update_bind_cart();
            refresh_bind();
            bindProductSizeButtons()
            bindFilterKindOfWineButtons()
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
 *  todo: da inserire l'url per il GET della foto
 *  todo: da salvare in un data-tag il nome del prodotto, in modo che sia visibile in fase di inserimento nel carrello, nella funzione function bindOrderNowButton() {..}
 *
 *
 * @param productId
 */
function showProductPage(productId) {

    console.log("[showProductPage]" + productId)
    var access_token = window.localStorage.getItem("access_token");
    console.log("init_catalogo access_token---> " + access_token);

    // var config = window.localStorage.getItem('config');
    var config = VIN.config;
    var url_config = config
    var url = url_config.url.getStorage+'/'+ productId + '?filter[include]=product';


    //var url = 'https://obscure-anchorage-5846.herokuapp.com/api/storages/' + productId + '?filter[include]=product';
    var data = '';
    var accessToken = access_token;

    carica()

    sendAPIRequest(url, 'GET', data, accessToken, function (storage_products) {
        console.log("----[Callback from showProductPage]---- " + storage_products);

        response_string = JSON.stringify(storage_products)
        storage_products_decodedJson = JSON.parse(response_string);

        if (response_string.length > 0) {

            var product_in_storage_id = storage_products_decodedJson.id;
            var product_name = (storage_products_decodedJson.product) ? storage_products_decodedJson.product.name : storage_products_decodedJson.external.name;
            var location = "Italia"; //todo: ricavare nazione dal codice numerico presente nel payload
            var regione = "Sicilia"; //todo: rivavare regione dal codice numerico presente nel payload
            var anno = (storage_products_decodedJson.product) ? storage_products_decodedJson.product.year : storage_products_decodedJson.external.year || '';
            var cantina = (storage_products_decodedJson.product) ? storage_products_decodedJson.product.cantina :  '';
            var denominazione = (storage_products_decodedJson.product) ? storage_products_decodedJson.product.denomitation : storage_products_decodedJson.external.denomitation;
            var vitigno = (storage_products_decodedJson.product) ? storage_products_decodedJson.product.vitigno : '';
            var gradazione =(storage_products_decodedJson.product) ? storage_products_decodedJson.product.proof : storage_products_decodedJson.external.proof || '';
            var prezzo =  storage_products_decodedJson.retail_price;
            var formato_disponibile =  storage_products_decodedJson.size;

            // update selected product
            selectedProduct.name = product_name;

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
            //stars = buildFeedbackStars();
            product_availability_format = buildProductSizeDetails(formato_disponibile);
            format_prices = buildPricesForProductAvailableFormats(formato_disponibile);
            var descrizione = storage_products_decodedJson.product.description;
            colvin = lingua[12]; // capire perchè è sempre lingua[12]


            var foto = ""; // todo: da inserire l'url per il GET della foto

            vinoDOM = '<div class="legno"><div class="tovaglia"><div class="gd"></div><div class="gs"></div></div></div><div class="contenitore_prodotto"><div class="prodotto"><div class="goback">' + lingua[22] + '</div>\
					<h3>' + product_name + '</h3>\
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

        // bottiglia is selected by default
        product_selected = ['bottiglia'];
        $('.bottiglia').addClass('sel');

        update_bind_cart();
        porta_su();
        bindGoBackButton();
        bindProductQtyButtons();
        bindOrderNowButton(selectedProduct);
        bindProductSizeButtons();

    })

}


function bindFilterKindOfWineButtons() {
    console.log("----bindFilterKindOfWineButtons----")

    $('.filColori div').not('.legend').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        refresh_bind();
        $('.fbot div').not('.legend').removeClass('sel');
        $(this).toggleClass('selezione');
        $('.vino').hide();

        var pack = $('.fbot').attr('data-pack');
        var data_filter = $('.filColori').attr('data-filter');

        // usato per identificare i filtri con la stessa classe .fbot, visualizzati in pagina catalogo piuttosto che nella scheda del prodotto
        console.log("data_filter:" + data_filter)

        if (data_filter == 'header-filter') {
            if ($('.filter').attr('data-fnaz') == '0') {
                $('.filColori div').not('.legend').each(function () {
                    if ($(this).hasClass("selezione")) {
                        console.log("VALORE:" + $(this).attr("data-colore"))
                        var wine_subcategory = $(this).attr("data-colore");
                        $('.vino[data-tag="' + $(this).attr("data-colore") + '"]').show();
                        // var config = window.localStorage.getItem('config');
                        var config = VIN.config;
                        var url_config = config;
                        var query = url_config.url.filterByproducts+'/?filter[where][and][0][maincategory]=Vino&' +
                            'filter[where][and][1][subcategory]='+wine_subcategory;

                     //   var query = 'https://obscure-anchorage-5846.herokuapp.com/api/storages/filter-by-product-match?filter[where][and][0][maincategory]=Vino&' +
                            'filter[where][and][1][subcategory]='+wine_subcategory;
                       init_catalogo(query,$(this).attr("class")+' selezione');

                    }
                    if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione')) {
                        console.log("VINO SHOW")
                        init_catalogo();
                       // $('.vino').show();
                    }
                });
            }
            else {
                // todo: porzione di codice ancora da analizzare
                console.log("DA ANALIZZARE_1")
                $('.filColori div').not('.legend').each(function () {
                    if ($(this).hasClass("selezione"))
                        $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-tag="' + $(this).attr("data-colore") + '"]').show();
                    if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))
                        $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + ']').show();
                });

            }
        }
        else {
            // todo: porzione di codice ancora da analizzare
            console.log("DA ANALIZZARE_2")
            if ($('.filter').attr('data-fnaz') == '0') {
                $('.filColori div').not('.legend').each(function () {
                    console.log("3")
                    if ($(this).hasClass("selezione"))
                        $('.vino[data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                    if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))
                        $('.vino[data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                });


            }
            else {
                // todo: porzione di codice ancora da analizzare
                console.log("DA ANALIZZARE_3")
                $('.filColori div').not('.legend').each(function () {
                    if ($(this).hasClass("selezione"))
                        $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                    if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))
                        $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                });

            }
        }

    });


}


/**
 * It binds the goBack button
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
 * It binds the + and - symbol on the product page
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
 * todo: Da completare.
 *
 *
 *
 * per i filtri in header devo comporre la query selezionando il prodotto in base alla disponibilità alla vendita in bottilia,calice,mezza bottiglia.
 *  chiamare init_catalogo(query) come per i filtri di maincategory e subcategory
 *
 *
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
        var header_bottles = $('.fbot').attr('data-filter');
        console.log("header_bottles :"+header_bottles)



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
        //$('.vino').hide();
        console.log("TIPO: " + tipo);
        product_selected = tipo;

    })
}
/**
 * todo: da completare la logica per inserire l'ordine nel carrello
 */
function bindOrderNowButton(product) {
    $('.btn-a').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var productId = $(this).attr("data-id");
        var qtyToOrder = $('.qnt').text();

        //todo : da inserire anche il nome del prodotto. Ricavarlo come productId e qtyToOrder, dalla scheda del prodotto

        var order_to_add = {
            name: product.name,
            product_size: product_selected[0],
            qty: qtyToOrder,
            productId: productId,
            price: prices[product_selected[0]],
            subtotal: prices[product_selected[0]] * qtyToOrder
        }

        console.log("****order_to_add****: " + JSON.stringify(order_to_add))
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
