var VIN = VIN || {};

VIN.Cart = function(app)
{
  this.app = app;
}

VIN.Cart.prototype = {
  constructor: VIN.Cart,

  bindEvents: function()
  {
    var that = this;

    $('.cartArea .ordina').unbind('tap').bind('tap', function(){
      console.log('### ENTER ORDINA ');

      // store_product is an array containing
      // all the product added to the cart (see carrello.js)
      // TODO: wrap the array inside this class and totally remove carrello.js,
      // where everything is inside the global scope
      if(store_product.length == 0)
      {
        alert("Non ci sono prodotti nel carrello.");
        return;
      }

      // write wines
      var list = $('.overlay.conferma-ordine .choice');
      // empty list
      list.html('');

      for(var i=0; i < store_product.length; i++)
      {
        var prod = store_product[i];
        list.append("<li>"+prod.name+' | '+prod.qty+' x '+prod.product_size+"</li>");
      }

      $('.overlay.conferma-ordine').show();
    });

    $('.overlay.conferma-ordine button.cta').unbind('tap').bind('tap', function(){
      $('.overlay.validate-pin').show();
    });

    $('.overlay.validate-pin button.send').unbind('tap').bind('tap',function(){
      var pinEntered = $('.overlay.validate-pin input.pin').val();
      var tableName = $('.overlay.validate-pin input.table-name').val();

      console.log("tapped on send button");

      // send order
      that.app.readPIN(function(pinExists, pin){
        console.log(pinEntered);
        console.log(pinExists);
        console.log(pin);
        if(pinEntered == pin)
        {
          // TODO: remove this alert
          alert("Il pin è corretto, invio l'ordine");
          that.sendOrder(tableName);
        }
        else
        {
          alert("Il pin non è valido, inseriscilo nuovamente");
        }
      });
    });

    $('.overlay.validate-pin button.back').unbind('tap').bind('tap', function(){
      $('.overlay.validate-pin').hide();
      // $('.overlay.conferma-ordine').show();
    });
  },

  sendOrder: function(tableName)
  {
    if(tableName === '')
    {
      alert("E' necessario inserire il nome del tavolo");
      return;
    }

    // TODO: write ajax function for sending order to server
    alert("Sending order...");

    var products = [];

    // process data
    for (var i = 0; i < store_product.length; i++)
    {
      var prod = {};
      prod.productId = store_product[i].productId;
      prod.productQty = store_product[i].qty;
      products.push(prod);
    }

    var url = VIN.config.url.sendOrder;
    var accessToken = window.localStorage.getItem("access_token");

    var data = {
      products: JSON.stringify(products),
      tableName: tableName, // remove hardcoded value
      myaccesstoken: accessToken
    }

    sendAPIRequest(url, 'POST', data, accessToken, function (response) {
      console.log(response);

      if (response)
      {
        alert("L'ordine è stato inviato con successo.");
      }
      else
      {
        alert("Errore nell'invio della richiesta.");
      }
    });
  }
}
