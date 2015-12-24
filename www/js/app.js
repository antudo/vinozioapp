var VIN = VIN || {};

VIN.App = function()
{
  this.bindEvents();
}

VIN.App.prototype =
{
  constructor: VIN.App,

  bindEvents: function()
  {
    $('.voci [data-cont=catalogo]').click(function(){
      var subMenu = $('.voci .submenu');

      $('.voce_o').removeClass("voce_o");
      $(this).addClass("voce_o");
      // menu_close();

      var numElements = $('.voci .submenu li').length;
      var elHeight = $('.voci .submenu li').outerHeight();
      if(subMenu.height() === 0)
        subMenu.height(numElements*elHeight+'px');
      else
        subMenu.height(0);
    });
  }
}

// init
var vin = new VIN.App();
