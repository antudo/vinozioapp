var VIN = VIN || {};

VIN.App = function()
{
  this.cart = new VIN.Cart(this);
  this.pin = 0;
  this.fileSystem = null;
  this.bindEvents();
  this.init();
}

VIN.App.prototype =
{
  constructor: VIN.App,

  init: function()
  {
    var that = this;

    var bootstrapApp = function(from)
    {
      window.localStorage.clear();
      renderLoginPage();
    }

    $(document).ready(function () {
      bootstrapApp();

      document.addEventListener("deviceready", function(){
        that.checkConnection(function(connectionAvailable){
          if(connectionAvailable)
          {
            that.logger("CONNECTION AVAILABLE!");

            bootstrapApp("deviceready");

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
              function(fs){
                that.fileSystem = fs;

                // TODO: refactor me
                console.log("[app.js] GOT FILE SYSTEM!");
                that.readPIN(function(pinExists, pin){
                  // if PIN doesn't exists,
                  // write a default one
                  if(!pinExists)
                  {
                    that.writePIN();
                  }
                  else
                  {
                    that.logger("PIN = "+pin);
                  }
                })
              },
              function(){ console.log("[app.js] FILE SYSTEM ERROR!") }
            );
          }
        });
      }, false);
    });
  },

  logger: function(str)
  {
    // TODO: add log levels (it shouldn't log anything in production environment)
    console.log("[app.js] "+str);
  },

  checkConnection: function(cb)
  {
    var networkState = navigator.connection.type;

    if(networkState === Connection.NONE)
    {
      alert("Rete non disponibile. Ti preghiamo di collegarti e riavviare l'app");
      cb(false);
    }

    cb(true);
  },

  bindEvents: function()
  {
    var that = this;

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

    // handle close functionality for all overlays
    $('.overlay button.close').bind('tap', function(){
      $(this).parents('.overlay').hide();
    });

    this.cart.bindEvents();
  },

  writePIN: function(pin, cb)
  {
    function fail(evt)
    {
        console.log(evt);
        cb(false);
    }

    var that = this;
    pin = (typeof pin !== "undefined") ? pin : '1337';

    this.fileSystem.root.getFile("/vinozio_pin.txt", {create: true}, function(fileEntry){
      fileEntry.createWriter(function(writer){
        writer.onwriteend = function(evt) {
          console.log("[app.js] completed pin writing!");
          that.pin = pin;
          cb(true, pin);
        };
        writer.write(pin);
      }, fail);
    }, fail);
  },

  readPIN: function(cb)
  {
    function fail(evt)
    {
        console.log(evt);
        cb(false);
    }

    var that = this;

    this.fileSystem.root.getFile("/vinozio_pin.txt", {create: false}, function(fileEntry){
      fileEntry.file(function(file){
        var reader = new FileReader();
        reader.onloadend = function(evt){
          console.log("[app.js] read success");
          that.pin = evt.target.result;
          cb(true, evt.target.result);
        };
        reader.readAsText(file);
      }, fail);
    }, fail);

  }
}

// init
var vin = new VIN.App();
