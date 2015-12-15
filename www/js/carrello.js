/**
 * Created by Antonio Di Mariano on 04/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */
store_product =[]
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
       // $('.totaleVal span').html('0.00');
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
        //$('.totaleVal span').html('0.00');
        $('.cartArea table').attr('data-tot', "0");
        $('.ordina').unbind("tap");
        $('.sono').removeClass('io');

    });


}
/**
 * issue: al momento si presenta questo errore quando la funzione viene invocata
 * Uncaught TypeError: Cannot read property 'confirm' of undefined
 *
 */
function buy_cart(products,total) {

    console.log("----buy_cart "+products);
    for(var i = 0; i<products.length;i++ ) {
        console.log("PRODOTTI "+JSON.stringify(products[i]));
    }
    console.log("----buy_cart Total "+total);

    var product_length = products.length;





    //if(confirm('Vuoi ordinare questi vini?')){

    /*
    navigator.notification.confirm(
        'Vuoi ordinare questi vini?', // message
        cameriere,            // callback to invoke with index of button pressed
        'Vinozio',           // title
        'Si,No'     // buttonLabels
    );
    */


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
    //$('.totaleVal span').text($('.cartArea table').attr('data-tot'));

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


/**
 *
 * @param productToAdd
 */
function addToCart(productToAdd) {
    console.log("---------addToCart"+JSON.stringify(productToAdd))
    window.localStorage.setItem('addedToCart', JSON.stringify(productToAdd));
    var tmp_cart = window.localStorage.getItem('addedToCart');

    store_product.push(productToAdd);

    var prodotto =JSON.parse(tmp_cart);
    console.log("PRODOTTO "+prodotto.price)

    renderCart(prodotto);

}

/**
 *
 * @param productJustAdded
 */
function renderCart(productJustAdded) {

  /*
   Formato di productJustAdded

   {"product_size":"bottiglia","qty":"2","productId":"566ed23f7f669c03002e3741","price":25,"subtotal":50}
   */
    var product_size = productJustAdded.product_size;
    var productId = productJustAdded.productId;
    var qty = productJustAdded.qty;
    var price = productJustAdded.price;
    var subtotal = productJustAdded.subtotal;
    var product_name = 'DA METTERE'
    var totale='';

    var cartDOM = '<tr data-tipo="' + product_size + '" data-id-v="' + productId + '" data-qnt="' + qty + '" data-prezzo="' + parseFloat(parseFloat(price).toFixed(2) * qty).toFixed(2) + '">\
		<td>' + product_name + '</td>\
		<td><div class="' + product_size + '"></div></td>\
		<td><span class="cartQnt">' + qty + '</span> x &euro; ' + parseFloat(price).toFixed(2) + '</td>\
		<td>&nbsp;</td>\
	</tr>';


    var partial_totale = window.localStorage.getItem('partial_cart_total');
    if(!partial_totale) {
        console.log("!partial_table")
        partial_totale = subtotal;
        window.localStorage.setItem('partial_cart_total',partial_totale)

    } else {
        console.log("TROVATO PARZIALE "+partial_totale)
        var new_partial = Number(partial_totale) + Number(subtotal)
        partial_totale = new_partial;
        console.log("nuovo parziale "+partial_totale)
        window.localStorage.setItem('partial_cart_total',Number(partial_totale))

    }
    console.log("TOTALE: "+partial_totale);
    $('.cartArea table').append(cartDOM);

    $('.totaleVal span').text(partial_totale);


    $('.ordina').unbind("tap").bind("tap", function () {
        var productsToBuy = window.localStorage.getItem('addedToCart');

        buy_cart(store_product,partial_totale);
    });
    update_bind_cart();



}
