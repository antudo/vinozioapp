/**
 * Created by Antonio Di Mariano on 04/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */
langg = "ita";


lingua_it = new Array();
lingua_it[0] = "Che tipo di vino preferisci bere?";
lingua_it[1] = "";
lingua_it[2] = "Con cosa vuoi abbinare il vino?";
lingua_it[3] = "";
lingua_it[4] = "Quanto vorresti spendere?";
lingua_it[5] = "Nazione";
lingua_it[6] = "Cantina";
lingua_it[7] = "Grado Alcolico %";
lingua_it[8] = "Vitigno";
lingua_it[9] = "Denominazione";
lingua_it[10] = "Anno";
lingua_it[11] = "Tipo di vino";
lingua_it[12] = "Vino Rosso";
lingua_it[13] = "Vino Bianco";
lingua_it[14] = "Spumante";
lingua_it[15] = "Vino Rosato";
lingua_it[16] = "Formato";
lingua_it[17] = "Pesce";
lingua_it[18] = "Carne";
lingua_it[19] = "Formaggi";
lingua_it[20] = "Pizza";
lingua_it[21] = "Nessun vino trovato. <div style='color: #9c243f; text-decoration:underline;' onclick='init_catalogo(\"\",0);'>Vai al catalogo</div>";
lingua_it[22] = "Indietro";
lingua_it[23] = "ORDINA";
lingua_it[24] = "Inizia il tour";
lingua_it[25] = "Catalogo";
lingua_it[26] = "Ristorante";
lingua_it[27] = "Inglese";
lingua_it[28] = "Esci";
lingua_it[29] = "Nessun vino presente.";


lingua_en = new Array();
lingua_en[0] = "What type of wine do you prefer to drink?";
lingua_en[1] = "";
lingua_en[2] = "What type of food do you want to pair with this wine?";
lingua_en[3] = "";
lingua_en[4] = "How much are you willing to spend?";
lingua_en[5] = "Country";
lingua_en[6] = "Producer";
lingua_en[7] = "Alcohol %";
lingua_en[8] = "Grape Type";
lingua_en[9] = "Classification";
lingua_en[10] = "Vintage Year";
lingua_en[11] = "Wine Type";
lingua_en[12] = "Red Wine";
lingua_en[13] = "White Wine";
lingua_en[14] = "Sparkling";
lingua_en[15] = "Rosé Wine";
lingua_en[16] = "Size";
lingua_en[17] = "Fish";
lingua_en[18] = "Meat";
lingua_en[19] = "Cheese";
lingua_en[20] = "Pizza";
lingua_en[21] = "No wine found. <div style='color: #9c243f; text-decoration:underline;' onclick='init_catalogo(\"\",0);'>Go to catalogue</div>";
lingua_en[22] = "Back";
lingua_en[23] = "ORDER";
lingua_en[24] = "Start tour";
lingua_en[25] = "Catalogue";
lingua_en[26] = "Restourant";
lingua_en[27] = "Italian";
lingua_en[28] = "Exit";
lingua_en[29] = "No wine found.";


voce = "tour";
old = "tour";

lingua = lingua_it;

_topURL = "http://www.vinozio.com/crm/APP/";
var server_url = "https://obscure-anchorage-5846.herokuapp.com";


first = 0;

avanti = function () {
};
indietro = function () {
};


// aggiungere il deviceready
$(document).ready(function () {
    console.log("----addEvent---")
    window.localStorage.clear()
    $.getJSON('../application_setup.json', function(data) {
        console.log("data---->"+JSON.stringify(data));
        window.localStorage.setItem('config',JSON.stringify(data));
        console.log("CONFIG:--"+window.localStorage.getItem('config'))
        renderLoginPage();

    });
    //start_app();
    //document.addEventListener("deviceready", start_app, false);
});
function print_r(array, return_val) {

    var output = '',
        pad_char = ' ',
        pad_val = 4,
        d = this.window.document,
        getFuncName = function (fn) {
            var name = (/\W*function\s+([\w\$]+)\s*\(/)
                .exec(fn);
            if (!name) {
                return '(Anonymous)';
            }
            return name[1];
        };
    repeat_char = function (len, pad_char) {
        var str = '';
        for (var i = 0; i < len; i++) {
            str += pad_char;
        }
        return str;
    };
    formatArray = function (obj, cur_depth, pad_val, pad_char) {
        if (cur_depth > 0) {
            cur_depth++;
        }

        var base_pad = repeat_char(pad_val * cur_depth, pad_char);
        var thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char);
        var str = '';

        if (typeof obj === 'object' && obj !== null && obj.constructor && getFuncName(obj.constructor) !==
            'PHPJS_Resource') {
            str += 'Array\n' + base_pad + '(\n';
            for (var key in obj) {
                if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
                    str += thick_pad + '[' + key + '] => ' + formatArray(obj[key], cur_depth + 1, pad_val, pad_char);
                } else {
                    str += thick_pad + '[' + key + '] => ' + obj[key] + '\n';
                }
            }
            str += base_pad + ')\n';
        } else if (obj === null || obj === undefined) {
            str = '';
        } else { // for our "resource" class
            str = obj.toString();
        }

        return str;
    };

    output = formatArray(array, 0, pad_val, pad_char);

    if (return_val !== true) {
        if (d.body) {
            this.echo(output);
        } else {
            try {
                d = XULDocument; // We're in XUL, so appending as plain text won't work; trigger an error out of XUL
                this.echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">' + output + '</pre>');
            } catch (e) {
                this.echo(output); // Outputting as plain text may work in some plain XML
            }
        }
        return true;
    }
    return output;
}
function stripslashes(str) {
    return (str + '')
        .replace(/\\(.?)/g, function (s, n1) {
            switch (n1) {
                case '\\':
                    return '\\';
                case '0':
                    return '\u0000';
                case '':
                    return '';
                default:
                    return n1;
            }
        });
}
function carica() {
    $('#caricatore').show();
}
function stop_carica() {
    $('#caricatore').hide();
}
function init_cambia() {

    if (langg == "ita") {
        langg = "eng";
        lingua = lingua_en;
    }
    else {
        langg = "ita";
        lingua = lingua_it;
    }

    $('.voci div[data-cont="tour"]').text(lingua[24]);
    $('.voci div[data-cont="catalogo"]').text(lingua[25]);
    $('.voci div[data-cont="ristorante"]').text(lingua[26]);
    $('.voci div[data-cont="cambia"]').text(lingua[27]);
    $('.voci div[data-cont="esci"]').text(lingua[28]);

    $('.voce_o').removeClass("voce_o");
    $('[data-cont="' + old + '"]').addClass("voce_o");
    window['init_' + old]();

    voce = old;

    menu_close();

}
function start_app() {



    /*
     db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);
     console.log("----DB-----", db);
     window.localStorage.setItem("lang", "ita");

     log_default(function () {
     $('.lente').hide();//DA LEVARE
     menu_close();

     $('.content0').addClass("content0_log");
     update_menu();
     init_tour();

     stop_carica();
     update_bind_cart();

     });
     */
}
function porta_su() {
    menu_close(function () {
        window.scrollTo(0, 0);
    });

}
function refresh_bind() {
    $('.vino').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();

        showProductPage($(this).attr("data-id"))
    });

    $(document).on("scrollstart", function () {
        $('.vino').unbind("tap")
        setTimeout(function () {
            $('.vino').unbind("tap").bind("tap", function (e) {
                e.preventDefault();
                e.stopPropagation();
                showProductPage($(this).attr("data-id"))

            });
        }, 50);

    });
    update_bind_cart();
}

function init_esci() {
    console.log("---INIT ESCI--- Chiamo Logout")
    logout()
    /*window.localStorage.clear();
    window.localStorage.setItem("id_r", "");
    window.localStorage.setItem("id", "");
    $('.btn-cart').hide();
    $('.content0').removeClass("content0_log");
    init_login(function () {


        $('.lente').hide();//DA LEVARE
        menu_close();

        $('.content0').addClass("content0_log");
        update_menu();
        init_tour();

        stop_carica();
        update_bind_cart();
    });*/
}

