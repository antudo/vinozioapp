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

    $('.cartArea .ordina').bind('tap', function(){
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

    $('.overlay.conferma-ordine button.cta').bind('tap', function(){
      $('.overlay.validate-pin').show();
    });

    $('.overlay.validate-pin button.send').bind('tap',function(){
      var pinEntered = $('.overlay.validate-pin input').val();

      console.log("tapped on send button");

      // send order
      that.app.readPIN(function(pinExists, pin){
        if(pinEntered == pin)
        {
          // TODO: remove this alert
          alert("Il pin è corretto, invio l'ordine");
          that.sendOrder();
        }
        else
        {
          alert("Il pin non è valido, inseriscilo nuovamente");
        }
      });
    });

    $('.overlay.validate-pin button.back').bind('tap', function(){
      $('.overlay.validate-pin').hide();
      // $('.overlay.conferma-ordine').show();
    });
  },

  sendOrder: function()
  {
    // TODO: write ajax function for sending order to server
    alert("Sending order...");
  }
}
