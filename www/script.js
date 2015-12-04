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

$(document).ready(function () {
    console.log("----addEvent---")
    my_login();
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
function sync_db(surl, sdata) {
    if (surl != "" && sdata != "")
        scrivi_db("INSERT INTO sync_db (url,data) VALUES ('" + surl + "','" + sdata + "')");
    leggi_db("SELECT * FROM sync_db LIMIT 1", function (op) {
        if (op.rows.length > 0) {
            $.ajax({
                type: "POST",
                url: op.rows.item(0).url,
                data: $.parseJSON(op.rows.item(0).data)
            }).done(function () {
                scrivi_db("DELETE FROM sync_db WHERE id='" + op.rows.item(0).id + "'");
            }).fail(function () {
                sync_db("", "");
            });
        }
    });
}

function init_db(tables, callback) {
    tab_to_erase = new Array();
    scrivi_db("CREATE TABLE IF NOT EXISTS sync_db (id unique,url,data)");
    scrivi_db("DROP TABLE IF EXISTS vini");
    scrivi_db("CREATE TABLE IF NOT EXISTS vini ( id UNIQUE, nome, cantina, denominazione, vitigno, grado, desc, prezzo, anno, loc, reg, valutazione, n_val,tipo,pack,prezzo_cal,prezzo_mez)");
    //scrivi_db("CREATE TABLE IF NOT EXISTS last_update (id unique,tempo)");


    if (tables instanceof Array) {
        for (i = 0; i < tables.length; i++) {
            tab_to_erase.push("DROP TABLE IF EXISTS " + tables[i]);

        }
        scrivi_db(tab_to_erase, callback);
    } else {
        scrivi_db("DROP TABLE IF EXISTS " + tables, callback);

    }


}
function scarica_db(db, callback) {

    first = 1;
    $.ajax({
        type: "POST",
        url: _topURL + "content.php",
        data: {
            cont: "scarica_db",
            id: window.localStorage.getItem("id_r")//,
            //last: temp
        }
    }).done(function (prova) {

        if (prova == "null" || prova == null)
            return;


        json = $.parseJSON(prova);
        tables = new Array();


        $.each(json, function (k, v) {
            if (tables.indexOf(k) < 0)
                tables.push(k);
        });


        init_db(tables, function () {

            queries = new Array();
            tabelle = new Array();
            var test = new Array();
            $.each(json, function (tab, _id) {


                $.each(_id, function (campi, campo) {

                    tab_campi = new Array();
                    tab_row = new Array();

                    $.each(campo, function (nome, valore) {

                        if (nome != "id")
                            tab_campi.push(nome);

                        tab_row.push('"' + stripslashes(valore) + '"');

                    });

                    // DA TOGLIERE
                    if (test.indexOf(tab) < 0) {
                        test.push(tab);
                        queries.push("CREATE TABLE IF NOT EXISTS " + tab + " (id UNIQUE, " + tab_campi.join() + ")");

                    }

                    queries.push("INSERT INTO " + tab + " (id, " + tab_campi.join() + ") VALUES (" + tab_row.join() + ")");

                });

            });

            scrivi_db(queries, callback);

        });

    }).fail(function () {
        alert("Attenzione l'applicazione funzionerà con una versione non aggiornata dei vini");

    });


}
function scrivi_db(query, callback) {
    if (typeof callback == "undefined") {
        callback = function () {

        }
    }
    var i = 0;
    if (query instanceof Array) {

    }
    else {
        var a = query;
        query = new Array();
        query.push(a);
    }
    var tmp = setInterval(function () {
        db.transaction(function (tx) {
            if (!(typeof query[i] == "undefined" || query[i] == "undefined"))
                tx.executeSql(query[i]);

            if (i >= query.length) {
                clearInterval(tmp);
                callback();
            }
            i++;
        }, function (err) {

        });

    }, 30);

}
function leggi_db(query, callback) {
    db.transaction(function (tx) {
        tx.executeSql(query, [], function (tx, results) {
            callback(results);
        }, function () {

        });
    });

}

function porta_su() {
    menu_close(function () {
        window.scrollTo(0, 0);
    });

}

/*function update_menu() {
    $(".profile .foto").css("background-image", "url('" + window.localStorage.getItem("photo_r") + "')");
    $(".profile .name").html(window.localStorage.getItem("nome_r"));
    $('.voce').show();
    if (window.localStorage.getItem("rist_log") != "1") {
        $('.voce[data-cont=catalogo]').hide();
        $('.voce[data-cont=tour]').hide();
        $('.voce[data-cont=ristorante]').hide();
    } else {
        $('.voce[data-cont=profilo]').remove();
        $('.voce[data-cont=impostazioni]').remove();
        //$('.voce[data-cont=esci]').hide();
    }

}
var cont_vin;

function menu_open(callback) {
    console.log("MENU OPEN "+callback)
    if (typeof callback != "function")
        callback = function () {
        };
    if (window.localStorage.getItem("id_r") != "") {
        $(".menu").stop().animate({
            "width": "17em"
        }, 300, function () {
            callback();
        });
        width = $(window).width() / parseFloat($("body").css("font-size"));
        width -= 16;
        $(".content0").stop().animate({
            "padding-left": "16em",
            "width": width + "em"
        }, 300);

        $('.pd').hide();

    }

}
function menu_close(callback) {
    if (typeof callback != "function")
        callback = function () {
        };

    $(".menu").stop().animate({
        "width": "0"
    }, 300, function () {
        callback();
    });

    $(".content0").stop().animate({
        "padding-left": "0",
        "width": "100%"
    }, 300);
    setTimeout(function () {
        $('.pd').fadeIn();
    }, 300);
}*/
/*function listnerEvents() {


    $('.header .btn').bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        menu_open();
    });
    $('.menu .btn').bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        menu_close();
    });
    //var lente=0;
    $('.searchbox').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        porta_su();
        $('.searchbox').focus();
    });
    $('.searchbox').keyup(function (e) {
        if (e.which == 13) {
            $('.lente').removeClass('open');

            if ($('.searchbox').val() != "")
                init_ricerca($('.searchbox').val());

            $('.searchbox').val("");
        }
    });
    $('.lente').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();


        if ($(this).hasClass("open")) {
            if ($('.searchbox').val() != "")
                init_ricerca($('.searchbox').val());
            else
                $('.searchbox').blur();
            $('.searchbox').val("");
        }

        $(this).toggleClass('open');


    });

    $(document).bind("swiperight", function (e) {
        e.preventDefault();
        e.stopPropagation();
        menu_open();

    });

    $(document).bind("swipeleft", function (e) {
        e.preventDefault();
        e.stopPropagation();
        menu_close();
        //indietro();
    });

    $('.voce').bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.voce_o').removeClass("voce_o");

        old = voce;
        voce = $(this).attr("data-cont");


        $(this).addClass("voce_o");
        window['init_' + voce]();


        update_bind_cart();
        menu_close();

    });

}*/
function fly_login() {
    flylogDOM = '<div class="boxVota">\
	<p style="color:#9c243f;font-size: 20px;margin-top: 30px;margin-left:100px;">User</p>\
	<input type="email" class="user"/>\
	<p style="color:#9c243f;font-size: 20px;margin-top: 10px;margin-left:100px;">Password</p>\
	<input type="password" class="passw"/><div class="btngh">LOGIN</div>\
	</div>';
    $('.boxVota').remove();
    $('body').append(flylogDOM);
    $('.boxVota').fadeIn();
    $('.boxVota').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $('body').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.boxVota').fadeOut(function () {
            $('.boxVota').remove();
        });
    });
    $('.btngh').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('input').blur();
        carica();
        contn = "logga";

        $.ajax({
            url: _topURL + "content.php",
            type: "POST",
            data: {
                cont: contn,
                user: $('input[type=email]').val(),
                pass: $('input[type=password]').val()
            }
        }).done(function (msg) {
            if (msg != "no") {
                json = $.parseJSON(msg);
                $(".voce_o").removeClass("voce_o");
                $('.voce[data-cont=ristorante]').addClass("voce_o");

                var id = json.info.id;
                var photo = json.foto;
                var nome = json.info.nome;
                var email = json.info.email;
                var sito = json.info.sito;
                var bio = json.info.bio;
                var citta = json.info.citta;

                window.localStorage.setItem("id", id);
                window.localStorage.setItem("photo", photo);
                window.localStorage.setItem("nome", nome);
                window.localStorage.setItem("email", email);
                window.localStorage.setItem("sito", sito);
                window.localStorage.setItem("bio", bio);
                window.localStorage.setItem("citta", citta);

                $('.boxVota').fadeOut(function () {
                    $('.boxVota').remove();
                });

            }
        });
    });
}
function init_login(callback) {
    console.log("init_login");
    callback();
}
/*
 {
 $(".voce_o").removeClass("voce_o");
 loginDOM = '\
 \
 <div class="login">\
 <div class="cover">\
 <div class="center_log">\
 <input value="ristorante@gmail.com" type="email" />\
 <input value="cibo" type="password" />\
 <div class="singup">ENTRA</div>\
 \
 </div>\
 </div>\
 \
 ';
 $('.content0').html(loginDOM);

 if(window.localStorage.getItem("id_r") != "")
 {
 update_menu();
 $('.content0').addClass("content0_log");
 //init_profilo(id);
 //SICCOME APRO IL CATALOGO:
 $(".voce_o").removeClass("voce_o");
 $('.voce[data-cont=tour]').addClass("voce_o");
 init_tour();


 }


 $('.singup').bind("tap",function(e){
 e.preventDefault();
 e.stopPropagation();
 $('input').blur();
 carica();
 contn="logga_admin";
 $.ajax({
 url: _topURL+"content.php",
 type: "POST",
 data:{
 cont: contn,
 user: $('input[type=email]').val(),
 pass: $('input[type=password]').val()
 }
 }).done(function(msg){
 if(msg!="no")
 {

 json=$.parseJSON(msg);

 $(".voce_o").removeClass("voce_o");
 $('.voce[data-cont=tour]').addClass("voce_o");

 var id_r=json.id;
 var photo_r=json.foto;
 var nome_r=json.nome;
 var email_r=json.email;
 var pass_r=json.password;
 var sito_r=json.sito;
 var bio_r=json.info;
 var citta_r=json.citta;

 window.localStorage.setItem("id_r", id_r);
 window.localStorage.setItem("photo_r", photo_r);
 window.localStorage.setItem("nome_r", nome_r);
 window.localStorage.setItem("email_r", email_r);
 window.localStorage.setItem("pass_r", pass_r);
 window.localStorage.setItem("sito_r", sito_r);
 window.localStorage.setItem("bio_r", bio_r);
 window.localStorage.setItem("citta_r", citta_r);

 window.localStorage.setItem("rist_log","1");


 scarica_db("",function(){

 listnerEvents();

 callback();


 });



 }





 });
 });

 }
 */


function log_default(asd) {
    console.log("log_default");
}

/*
 {

 $.ajax({
 url: _topURL+"content.php",
 type: "POST",
 data:{
 cont: "logga_admin",
 user: "ristorante@gmail.com",
 pass: "cibo"
 }
 }).done(function(msg){

 if(msg!="no")
 {

 json=$.parseJSON(msg);

 $(".voce_o").removeClass("voce_o");
 $('.voce[data-cont=tour]').addClass("voce_o");

 var id_r=json.id;
 var photo_r=json.foto;
 var nome_r=json.nome;
 var email_r=json.email;
 var pass_r=json.password;
 var sito_r=json.sito;
 var bio_r=json.info;
 var citta_r=json.citta;

 window.localStorage.setItem("id_r", id_r);
 window.localStorage.setItem("photo_r", photo_r);
 window.localStorage.setItem("nome_r", nome_r);
 window.localStorage.setItem("email_r", email_r);
 window.localStorage.setItem("pass_r", pass_r);
 window.localStorage.setItem("sito_r", sito_r);
 window.localStorage.setItem("bio_r", bio_r);
 window.localStorage.setItem("citta_r", citta_r);

 window.localStorage.setItem("rist_log","1");


 scarica_db("",function(){

 listnerEvents();


 asd();
 navigator.splashscreen.hide();

 });



 }else
 {
 //alert("error");
 asd();
 navigator.splashscreen.hide();
 }

 }).fail(function(){
 alert("No internet connection!");
 //alert("L'App funzioner&agrave; con una versione non aggiornata dei vini",function(){},"Nessuna Connessione");
 window.localStorage.setItem("id_r", "7");
 window.localStorage.setItem("rist_log","1");
 listnerEvents();
 menu_close();
 $('.content0').addClass("content0_log");
 update_menu();
 init_tour();
 stop_carica();
 update_bind_cart();

 navigator.splashscreen.hide();
 });
 }
 */
function log_admin(callback) {
    if (window.localStorage.getItem("rist_log") == "1") {
        $.ajax({
            url: _topURL + "content.php",
            type: "POST",
            data: {
                cont: "logga_admin",
                user: window.localStorage.getItem("email_r"),
                pass: window.localStorage.getItem("pass_r")
            }
        }).done(function (msg) {
            callback();
        });
    }
}
function toggle_login() {
    if (window.localStorage.getItem("rist") == null || window.localStorage.getItem("rist") == "null" || window.localStorage.getItem("rist") == "user")
        window.localStorage.setItem("rist", "rist");
    else
        window.localStorage.setItem("rist", "user");

    if (window.localStorage.getItem("rist") == "user") {
        $('.seirist').html("Sei un ristorante?");
        $('input[type=email]').val("alexmanno96@gmail.com");
        $('input[type=password]').val("alessandro");
    } else {
        $('.seirist').html("Sei un cliente?");
        $('input[type=email]').val("ristorante@gmail.com");
        $('input[type=password]').val("cibo");
    }
}
function init_profilo(_id) {
    $('.content0').html("");
    porta_su();
    if (_id == window.localStorage.getItem("id") || typeof _id == "undefined" || _id == "") {
        _id = window.localStorage.getItem("id");
        leggi_db("SELECT v.* FROM `vini_consumatori` as r JOIN (SELECT v.*, r.nome as regione, n.nome as locazione, t.nome as tag FROM vini as v JOIN regioni as r ON (v.reg = r.id) JOIN nazioni as n ON (v.loc= n.id) JOIN (SELECT g.id_vino as id,a.nome as nome FROM tag as a JOIN vini_tag as g ON(g.id_tag = a.id) WHERE LOWER(a.nome) LIKE 'vin%' ) as t ON (t.id=v.id) WHERE v.id != '0' GROUP BY v.id) as v ON (r.id_v=v.id) WHERE r.id_c = '" + _id + "'", function (vini) {
            leggi_db("SELECT rec.testo, rec.voto, vin.* FROM `recensioni` as rec JOIN (SELECT v.*, r.nome as regione, n.nome as locazione, t.nome as tag FROM vini as v JOIN regioni as r ON (v.reg = r.id) JOIN nazioni as n ON (v.loc= n.id) JOIN (SELECT g.id_vino as id,a.nome as nome FROM tag as a JOIN vini_tag as g ON(g.id_tag = a.id) WHERE LOWER(a.nome) LIKE 'vin%' ) as t ON (t.id=v.id) WHERE v.id != '0' GROUP BY v.id ) as vin ON (rec.id_v=vin.id) WHERE rec.id_u = '" + _id + "' GROUP BY rec.id", function (rec) {
                mieivin = "";
                mierec = "";


                for (i = 0; i < vini.rows.length; i++) {
                    if (vini.rows.item(i).regione != "-") {
                        regione = ', ' + vini.rows.item(i).regione;
                    }
                    else
                        regione = "";

                    if (i == vini.rows.length - 1)
                        bnone = 'style="border:none;"';
                    else
                        bnone = "";
                    mieivin += '<div ' + bnone + ' class="vino">\
						<p data-vino="' + vini.rows.item(i).id + '" class="vino_nome">' + vini.rows.item(i).nome + '</p>\
						<div class="cluster">\
							<div class="dettagli icon-glass"></div><div class="dettagli">' + vini.rows.item(i).tag + '</div>\
						</div>\
						<div class="cluster ultimo">\
							<div class="dettagli icon-annata"></div><div class="dettagli">' + vini.rows.item(i).anno + '</div>\
						</div>\
						<div class="cluster">\
							<div class="dettagli flag n' + vini.rows.item(i).loc + '"></div><div class="dettagli">' + vini.rows.item(i).locazione + regione + '</div>\
						</div>\
						<div class="clear"></div>\
					</div>\
					<div class="clear"></div>';

                }

                for (i = 0; i < rec.rows.length; i++) {

                    if (rec.rows.item(i).regione != "-") {
                        regione = ', ' + rec.rows.item(i).regione;
                    }
                    else
                        regione = "";

                    stelle = "";
                    for (j = 0; j < parseInt(rec.rows.item(i).voto); j++)
                        stelle += '<div data-icon="j" class="stella stella_p"></div>';
                    for (j = 0; j < (5 - parseInt(rec.rows.item(i).voto)); j++)
                        stelle += '<div data-icon="j" class="stella"></div>';

                    if (i == rec.rows.length - 1)
                        bnone = 'style="border:none;"';
                    else
                        bnone = "";

                    mierec += '<div ' + bnone + ' class="vino">\
						<p data-vino="' + rec.rows.item(i).id + '" class="vino_nome">' + rec.rows.item(i).nome + '</p>\
						<div class="stelle">' + stelle + '</div><br/>\
						<div class="descrizione">' + rec.rows.item(i).testo + '</div>\
					</div>\
					<div class="clear"></div>';

                }

                var profiloDOM = '\
				<div class="profile_top">\
					<div class="gradient_profile">\
						<div style="padding-top: 4em;" class="center_pro">\
							<div class="foto" style="background-image: url(' + window.localStorage.getItem("photo") + ');"></div>\
							<div class="p_nome">' + window.localStorage.getItem("nome") + '</div>\
							<div class="p_bio">' + window.localStorage.getItem("bio") + '</div>\
							<span class="sinistra">' + window.localStorage.getItem("sito") + '</span>\
							<span class="destra">' + window.localStorage.getItem("email") + '</span>\
						</div>\
					</div>\
				</div>\
				\
				<div class="tabbled">\
					<div class="t_head">\
						<div class="botton sel" data-div="0">I miei vini</div>\
						<div class="botton last" data-div="1">Le mie recensioni</div>\
						<div class="clear"></div>\
					</div>\
					\
					<div class="contenitore" data-div="0">\
						' + mieivin + '\
					</div>\
					<div class="contenitore" data-div="1">\
						' + mierec + '\
					</div>\
					\
				</div>';
                $('.content0').html(profiloDOM);

                var sel = $('.botton.sel').attr("data-div");
                $('.contenitore[data-div=' + sel + ']').show();
                $('.botton').bind("tap", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $('.botton').removeClass('sel');
                    $(this).addClass("sel");
                    var sel = $(this).attr("data-div");
                    $('.contenitore').hide();
                    $('.contenitore[data-div=' + sel + ']').show();
                });
                $('.vino_nome').bind("tap", function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    init_vino($(this).attr("data-vino"));
                });

            });
        });

    } else {
        leggi_db("SELECT * FROM consumatori WHERE id='" + _id + "'", function (json) {
            json = json.rows.item(0);
            leggi_db("SELECT v.* FROM `vini_consumatori` as r JOIN (SELECT v.*, r.nome as regione, n.nome as locazione, t.nome as tag FROM vini as v JOIN regioni as r ON (v.reg = r.id) JOIN nazioni as n ON (v.loc= n.id) JOIN (SELECT g.id_vino as id,a.nome as nome FROM tag as a JOIN vini_tag as g ON(g.id_tag = a.id) WHERE LOWER(a.nome) LIKE 'vin%' ) as t ON (t.id=v.id) WHERE v.id != '0' GROUP BY v.id) as v ON (r.id_v=v.id) WHERE r.id_c = '" + _id + "'", function (vini) {
                leggi_db("SELECT rec.testo, rec.voto, vin.* FROM `recensioni` as rec JOIN (SELECT v.*, r.nome as regione, n.nome as locazione, t.nome as tag FROM vini as v JOIN regioni as r ON (v.reg = r.id) JOIN nazioni as n ON (v.loc= n.id) JOIN (SELECT g.id_vino as id,a.nome as nome FROM tag as a JOIN vini_tag as g ON(g.id_tag = a.id) WHERE LOWER(a.nome) LIKE 'vin%' ) as t ON (t.id=v.id) WHERE v.id != '0' GROUP BY v.id ) as vin ON (rec.id_v=vin.id) WHERE rec.id_u = '" + _id + "' GROUP BY rec.id", function (rec) {
                    mieivin = "";
                    mierec = "";


                    for (i = 0; i < vini.rows.length; i++) {
                        if (vini.rows.item(i).regione != "-") {
                            regione = ', ' + vini.rows.item(i).regione;
                        }
                        else
                            regione = "";

                        if (i == vini.rows.length - 1)
                            bnone = 'style="border:none;"';
                        else
                            bnone = "";
                        mieivin += '<div ' + bnone + ' class="vino">\
							<p data-vino="' + vini.rows.item(i).id + '" class="vino_nome">' + vini.rows.item(i).nome + '</p>\
							<div class="cluster">\
								<div class="dettagli flag n' + vini.rows.item(i).loc + '"></div><div class="dettagli">' + vini.rows.item(i).locazione + regione + '</div>\
							</div>\
							<div class="cluster">\
								<div class="dettagli icon-glass"></div><div class="dettagli">' + vini.rows.item(i).tag + '</div>\
							</div>\
							<div class="cluster ultimo">\
								<div class="dettagli icon-annata"></div><div class="dettagli">' + vini.rows.item(i).anno + '</div>\
							</div>\
							<div class="clear"></div>\
						</div>\
						<div class="clear"></div>';

                    }

                    for (i = 0; i < rec.rows.length; i++) {

                        if (rec.rows.item(i).regione != "-") {
                            regione = ', ' + rec.rows.item(i).regione;
                        }
                        else
                            regione = "";

                        stelle = "";
                        for (j = 0; j < parseInt(rec.rows.item(i).voto); j++)
                            stelle += '<div data-icon="j" class="stella stella_p"></div>';
                        for (j = 0; j < (5 - parseInt(rec.rows.item(i).voto)); j++)
                            stelle += '<div data-icon="j" class="stella"></div>';

                        if (i == rec.rows.length - 1)
                            bnone = 'style="border:none;"';
                        else
                            bnone = "";

                        mierec += '<div ' + bnone + ' class="vino">\
							<p data-vino="' + rec.rows.item(i).id + '" class="vino_nome">' + rec.rows.item(i).nome + '</p>\
							<div class="stelle">' + stelle + '</div>\
							<div class="descrizione">' + rec.rows.item(i).testo + '</div>\
						</div>\
						<div class="clear"></div>';

                    }

                    var profiloDOM = '\
					<div class="profile_top">\
						<div class="gradient_profile">\
							<div style="padding-top: 4em;" class="center_pro">\
								<div class="foto" style="background-image: url(' + json.foto + ');"></div>\
								<div class="p_nome">' + json.nome + '</div>\
								<div class="p_bio">' + json.bio + '</div>\
								<span class="sinistra">' + json.sito + '</span>\
								<span class="destra">' + json.email + '</span>\
							</div>\
						</div>\
					</div>\
					\
					<div class="tabbled">\
						<div class="t_head">\
							<div class="botton sel" data-div="0">I vini di ' + json.nome + '</div>\
							<div class="botton last" data-div="1">Le recensioni di ' + json.nome + '</div>\
							<div class="clear"></div>\
						</div>\
						\
						<div class="contenitore" data-div="0">\
							' + mieivin + '\
						</div>\
						<div class="contenitore" data-div="1">\
							' + mierec + '\
						</div>\
						\
					</div>';
                    $('.content0').html(profiloDOM);

                    var sel = $('.botton.sel').attr("data-div");
                    $('.contenitore[data-div=' + sel + ']').show();
                    $('.botton').bind("tap", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $('.botton').removeClass('sel');
                        $(this).addClass("sel");
                        var sel = $(this).attr("data-div");
                        $('.contenitore').hide();
                        $('.contenitore[data-div=' + sel + ']').show();
                    });
                    $('.vino_nome').bind("tap", function (e) {
                        e.preventDefault();
                        e.stopPropagation();

                        init_vino($(this).attr("data-vino"));
                    });

                });
            });
        });
    }
}

/*
var step = 0;
var scelte = new Array();
var prezzo = 0;


function init_tour() {
    $('.content0').html("");
    porta_su();
    $(".voce").removeClass("voce_o");
    $('.voce[data-cont=tour]').addClass("voce_o");
    step = 0;
    scelte = new Array();
    prezzo = new Array();
    domande = new Array('colore', 'gradazione', 'perfetto', 'retrogusto', 'prezzo');
    risp = '<tr><td>\
	<div class="risposta" data-dom="colore" data-tag="1"><span>' + lingua[12] + '</span></div></td>\
	<td><div class="risposta" data-dom="colore" data-tag="2"><span>' + lingua[13] + '</span></div></td>\
	<td><div class="risposta" data-dom="colore" data-tag="5"><span>' + lingua[14] + '</span></div></td>\
	<td><div class="risposta" data-dom="colore" data-tag="13"><span>' + lingua[15] + '</span></div></td>\
	\
	<td><div class="risposta" data-dom="perfetto" data-tag="3"><span>' + lingua[17] + '</span></div></td>\
	<td><div class="risposta" data-dom="perfetto" data-tag="4"><span>' + lingua[18] + '</span></div></td>\
	<td><div class="risposta" data-dom="perfetto" data-tag="10"><span>' + lingua[19] + '</span></div></td>\
	<td><div class="risposta" data-dom="perfetto" data-tag="14"><span>' + lingua[20] + '</span></div></td>\
	\
	<td><div class="risposta" data-dom="prezzo" data-prez="5-15"><span>&euro;5-15</span></div></td>\
	<td><div class="risposta" data-dom="prezzo" data-prez="15-25"><span>&euro;15-25</span></div></td>\
	<td><div class="risposta" data-dom="prezzo" data-prez="25-40"><span>&euro;25-40</span></div></td>\
	<td><div class="risposta" data-dom="prezzo" data-prez="40"><span>&euro;40+</span></div></td>\
	</tr>';

    var tourDOM = '\
		<div data-dom="colore" class="tour">\
			<div class="cover"><div class="domanda">Colore</div>\
			<div class="risposte"><table>' + risp + '</table></div>\
			<div class="switcher">\
			<div data-dom="colore" data-id-dom="0" class="switch"></div>\
		<!--<div data-dom="gradazione" data-id-dom="1" class="switch"></div>-->\
			<div data-dom="perfetto" data-id-dom="2" class="switch"></div>\
		<!--<div data-dom="retrogusto" data-id-dom="3" class="switch"></div>-->\
			<div data-dom="prezzo" data-id-dom="4" class="switch"></div>\
			<div class="clear"></div>\
			</div>\
			<div class="frecciadx"></div>\
			<div class="frecciasx"></div>\
			</div>\
		</div>\
	';
    $('.content0').html(tourDOM);
    $('.risposta').hide();
    /!*$('.risposta[data-dom='+domande[step]+']').show();
     *!/
    dom();
    $('.switch').removeClass("sel");
    $('.switch[data-dom=' + domande[step] + ']').addClass("sel");
    $('.frecciadx').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (step > 0) {
            step--;
            if (step == 3)
                step = 2;
            if (step == 1)
                step = 0;
            dom();
        }
    });
    $('.frecciasx').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (step < domande.length) {
            step++;
            if (step == 3)
                step = 4;
            if (step == 1)
                step = 2;
            dom();
        }
    });

    $('.risposta').unbind("taphold").bind("taphold", function () {

        if ($(this).hasClass("sel")) {
            if (typeof $(this).attr('data-tag') != "undefined") {
                var index = scelte.indexOf("'" + $(this).attr('data-tag') + "'");
                if (index > -1) {
                    scelte.splice(index, 1);
                }
                $(this).removeClass("sel");
            } else {
                //prezzo=$(this).attr('data-prez');
                var index = prezzo.indexOf("'" + $(this).attr('data-prez') + "'");
                if (index > -1) {
                    prezzo.splice(index, 1);
                }
                $(this).removeClass("sel");
                //init_catalogo("","1");
            }
        } else {
            if (typeof $(this).attr('data-tag') != "undefined") {
                var index = scelte.indexOf("'" + $(this).attr('data-tag') + "'");
                if (index == -1) {
                    scelte.push("'" + $(this).attr('data-tag') + "'");
                }
                $(this).addClass("sel");
            } else {
                /!*prezzo=$(this).attr('data-prez');
                 init_catalogo("","1");*!/
                var index = prezzo.indexOf("'" + $(this).attr('data-prez') + "'");
                if (index == -1) {
                    prezzo.push("'" + $(this).attr('data-prez') + "'");
                }
                $(this).addClass("sel");
            }

        }
    });
    $('.risposta').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();

        console.log("DOMANDE"+domande[i])
        if ($(this).hasClass("sel")) {
            if (typeof $(this).attr('data-tag') != "undefined") {
                var index = scelte.indexOf("'" + $(this).attr('data-tag') + "'");
                if (index > -1) {
                    scelte.splice(index, 1);
                }
                $(this).removeClass("sel");
            } else {
                //prezzo=$(this).attr('data-prez');
                var index = prezzo.indexOf("'" + $(this).attr('data-prez') + "'");
                if (index > -1) {
                    prezzo.splice(index, 1);
                }
                $(this).removeClass("sel");
                //init_catalogo("","1");
            }
        } else {
            if (typeof $(this).attr('data-tag') != "undefined") {
                var index = scelte.indexOf("'" + $(this).attr('data-tag') + "'");
                if (index == -1) {
                    scelte.push("'" + $(this).attr('data-tag') + "'");
                }
                $(this).addClass("sel");
            } else {
                /!*prezzo=$(this).attr('data-prez');
                 init_catalogo("","1");*!/
                var index = prezzo.indexOf("'" + $(this).attr('data-prez') + "'");
                if (index == -1) {
                    prezzo.push("'" + $(this).attr('data-prez') + "'");
                }
                $(this).addClass("sel");
            }
            var flag = 0;
            $('.risposta[data-dom=' + domande[step] + ']').each(function () {
                if ($(this).hasClass("sel"))
                    flag++;
            });
            if (flag == 1 /!*&& step!=domande.length-1*!/) {
                step++;
                if (step == 3)
                    step = 4;
                if (step == 1)
                    step = 2;
                dom();
            }

        }


        /!*step++;
         dom();*!/
    });
    t = 0;
    indietro = function () {
        if (t == 0) {
            step++;
            if (step == 3)
                step = 4;
            if (step == 1)
                step = 2;
            dom();
            t = 1;
        }
        setTimeout(function () {
            t = 0;
        }, 300);

    };
    avanti = function () {
        if (t == 0) {


            if (step > 0) {
                step--;
                if (step == 3)
                    step = 2;
                if (step == 1)
                    step = 0;
                dom();
                t = 1;
            }

        }
        setTimeout(function () {
            t = 0;
        }, 300);

    };
}
function dom() {
    if (step >= domande.length) {
        init_catalogo("", "1");

    }
    else {
        $('.tour').attr("data-dom", domande[step]);


        $('.switch').removeClass("sel");
        $('.switch[data-dom=' + domande[step] + ']').addClass("sel");

        $('.domanda').html(lingua[step]);

        $('.risposta span').fadeOut(500);
        $('.risposte').stop().animate({"margin-left": "-100%"}, 500, function () {
            $('.risposte').hide();
            $('.risposta').hide();
            $('.risposta[data-dom=' + domande[step] + ']').show();

            $('.risposte').stop().animate({"margin-left": "100%"}, 0);
            $('.risposte').find('table').css("width", '300%');
            $('.risposte').show();
            $('.risposte').find('table').stop().animate({width: '100%'}, 800, function () {
                $('.risposta span').fadeIn(500);
            });

            $('.risposte').stop().animate({"margin-left": "6%"}, 500);

        });
        $('.switch').unbind('tap');
        $('.switch').not('.sel').bind('tap', function (e) {
            e.preventDefault();
            e.stopPropagation();
            //if(step>$(this).attr('data-id-dom'))
            //{
            step = $(this).attr('data-id-dom');
            dom();
            //}
        });
    }
}
*/




function init_ricerca(stringa) {
    $('.searchbox').blur();
    carica();
    setTimeout(function () {
        $('.voce_o').removeClass("voce_o");
        $('.voce[data-cont=catalogo]').addClass("voce_o");
        init_catalogo(stringa);
        stop_carica();
    }, 150);

}




function init_catalogo_(query, tour) {

    update_bind_cart();
    refresh_bind();
    $('.vino').unbind("tap");
    avanti = function () {
    };
    indietro = function () {
    };

    $('*').not(".header").not(".btn").not(".voce").unbind("tap");
    if (typeof query == "undefined" || query == "")
        query = "";
    else
        query = "AND LOWER(v.nome) LIKE LOWER('%" + query + "%')";

    if (tour != "1") {
        //dati="SELECT v.*, r.nome as regione, n.nome as locazione, t.nome as tag FROM vini as v JOIN regioni as r ON (v.reg = r.id) JOIN nazioni as n ON (v.loc= n.id) JOIN (SELECT g.id_vino as id,a.nome as nome FROM tag as a JOIN vini_tag as g ON(g.id_tag = a.id) WHERE LOWER(a.nome) LIKE 'vin%' ) as t ON (t.id=v.id) WHERE v.id != '0' "+query+" GROUP BY v.id ";
        goback = "";
        dati = "SELECT v.*, 'Lazio' as regione, n.nome as locazione, t.nome as tag FROM vini as v JOIN (SELECT g.id_vino as id,a.nome as nome FROM tag as a JOIN vini_tag as g ON(g.id_tag = a.id) WHERE LOWER(a.nome) LIKE 'vin%' ) as t ON (t.id=v.id) JOIN nazioni as n ON (v.loc= n.id) WHERE v.id != '0' GROUP BY v.id";

        filtrocolore = '<div class="filColori"><div class="legend">' + lingua[11] + '</div><div data-colore="' + lingua[12] + '" class="red selezione"></div><div data-colore="' + lingua[13] + '" class="white selezione"></div><div data-colore="' + lingua[14] + '" class="spum selezione"></div><div data-colore="' + lingua[15] + '" class="rosa selezione"></div></div>';
    } else {
        goback = '<div style="height:20px;"></div><div style="margin-left:20px;" class="goback">' + lingua[22] + '</div>';
        tag_ids = scelte.join(",");
        colore_vino = new Array();
        if (tag_ids.indexOf('1') != -1) {
            colore_vino.push('1');
        }
        if (tag_ids.indexOf('2') != -1) {
            colore_vino.push('2');
        }
        if (tag_ids.indexOf('5') != -1) {
            colore_vino.push('5');
        }
        if (tag_ids.indexOf('13') != -1) {
            colore_vino.push('13');
        }

        money = "AND (";
        for (i = 0; i < prezzo.length; i++) {
            if (prezzo[i].indexOf('-') != -1) {
                var da_p = (prezzo[i].substr(0, prezzo[i].indexOf('-')));
                var a_p = (prezzo[i].substr(prezzo[i].indexOf('-') + 1, prezzo[i].length));
                if (i == 0)
                    money += " ( CAST(v.prezzo AS INT) >= " + da_p + " AND CAST(v.prezzo AS INT) <= " + a_p + " ) ";
                else
                    money += " OR ( CAST(v.prezzo AS INT) >= " + da_p + " AND CAST(v.prezzo AS INT) <= " + a_p + " )";

            }
            if (prezzo[i].indexOf('40') != -1 && prezzo[i].indexOf('-') == -1) {
                if (i == 0)
                    money += " (CAST(v.prezzo AS INT) >= 40) ";
                else
                    money += " OR (CAST(v.prezzo AS INT) >= 40) ";
            }
        }
        money += ")";
        if (prezzo.length == 4 || prezzo.length == 0)
            money = "";

        if (colore_vino.length != 0)
            colors = "id_tag IN('" + colore_vino.join("','") + "') AND ";

        var filter = /[']/g;

        money = money.replace(filter, "");
        dati = "SELECT v.*, r.nome as regione, n.nome as locazione, t.nome as tag FROM (SELECT w.* FROM vini as w JOIN (SELECT l.id, count(*) as c FROM (SELECT v.*,t.id_tag FROM `vini` as v JOIN (SELECT * FROM vini_tag WHERE " + colors + " id_tag IN (" + tag_ids + ")) as t ON (v.id=t.id_vino) ORDER BY v.id) as l  GROUP BY id ORDER BY c DESC, l.id) as r ON (w.id=r.id)) as v JOIN regioni as r ON (v.reg = r.id) JOIN nazioni as n ON (v.loc= n.id) JOIN (SELECT g.id_vino as id,a.nome as nome FROM tag as a JOIN vini_tag as g ON(g.id_tag = a.id) WHERE LOWER(a.nome) LIKE 'vin%' ) as t ON (t.id=v.id) WHERE v.id != '0' " + money + " GROUP BY v.id ";


        fcoldiv = "";
        tst = 0;
        if (colore_vino.indexOf('1') != -1) {
            fcoldiv += '<div data-colore="' + lingua[12] + '" class="red"></div>';
            tst++;
        }
        if (colore_vino.indexOf('2') != -1) {
            fcoldiv += '<div data-colore="' + lingua[13] + '" class="white"></div>';
            tst++;
        }
        if (colore_vino.indexOf('5') != -1) {
            fcoldiv += '<div data-colore="' + lingua[14] + '" class="spum"></div>';
            tst++;
        }
        if (colore_vino.indexOf('13') != -1) {
            fcoldiv += '<div data-colore="' + lingua[15] + '" class="rosa"></div>';
            tst++;
        }
        if (tst == 1 || tst == 0)
            fcoldiv = "";
        else
            fcoldiv = '<div class="legend">' + lingua[11] + '</div>' + fcoldiv;
        filtrocolore = '<div class="filColori">' + fcoldiv + '</div>';
    }

        console.log("DATI"+dati);
    leggi_db(dati, function (res) {

        if (tour != "1")
            aux = '<div data-pack="111" class="fbot"><div class="legend">' + lingua[16] + '</div><div class="bottiglia"></div><div class="mezzo"></div><div class="calice"></div></div>';
        else
            aux = "";
        porta_su();

        if (tour == '1')
            stilo = 'style="display:none;"';
        else
            stilo = "";

        catalogoDOM = '<div ' + stilo + ' class="barra">\
			<div class="filtri">\
				<div class="filter" data-fnaz="0" data-filtro="naz">' + lingua[5] + '</div><div class="filtra naz"></div>\
             ' + filtrocolore + '\
				' + aux + '\
			</div>\
		</div><div style="clear:both; height:8em;"></div><div class="legno"><div class="tovaglia"><div class="gd"></div><div class="gs"></div></div></div><div class="contenitore_vini">' + goback + '<div class="pd"></div><div class="ps"></div>';
        rows = res.rows;

        nessuno = 0;
        if (rows.length == 0) {
            if (tour == "1")
                catalogoDOM += '<div class="notfound">' + lingua[21] + '</div>';
            else
                catalogoDOM += '<div class="notfound">' + lingua[29] + '</div>';
            nessuno = 1;
        }

        for (i = 0; i < rows.length; i++) {

            if (rows.item(i).regione != "-") {
                regione = ', ' + rows.item(i).regione;
            }
            else
                regione = "";
            _id = rows.item(i).id;
            var tipotag = rows.item(i).tag;


            if (tipotag.indexOf('osso') != -1)
                tipotag = lingua[12];
            else if (tipotag.indexOf('anco') != -1)
                tipotag = lingua[13];
            else if (tipotag.indexOf('umante') != -1)
                tipotag = lingua[14];
            else if (tipotag.indexOf('osat') != -1)
                tipotag = lingua[15];


            //var dove=rows.item(i).locazione+regione;
            var dove = rows.item(i).locazione;

            if (dove.length > 15)
                dove = dove.substr(0, 15) + "...";
            var nom = rows.item(i).nome;
            if (nom.length > 22)
                nom = nom.substr(0, 22) + "...";

            //alert(rows.item(i).pack);
            if (nessuno != 1) {
                catalogoDOM += '<div data-tag="' + tipotag + '" data-pack="' + rows.item(i).pack + '" data-naz="' + rows.item(i).loc + '" data-vino="' + rows.item(i).id + '" class="vino">\
					<p class="vino_nome">' + nom + '</p>\
					<div class="clprezzo">&euro; ' + rows.item(i).prezzo + '</div>\
					<div class="cluster dx">\
						<div class="dettagli icon-glass"></div><div class="dettagli">' + tipotag + '</div>\
					</div>\
					<div class="cluster ultimo dx anno">\
						<div class="dettagli icon-annata"></div><div class="dettagli">' + rows.item(i).anno + '</div>\
					</div>\
					<div class="cluster">\
						<div style="float:left;" class="dettagli flag n' + rows.item(i).loc + '"></div><div class="dettagli">' + dove + '</div>\
					</div>\
					<div class="clear"></div>\
				</div>\
				<div class="clear"></div>';
            }


        }


        if (typeof colore_vino != "undefined" && colore_vino.length >= 1)
            query = "SELECT v.*, r.nome as regione, n.nome as locazione, t.nome as tag FROM (SELECT w.* FROM vini as w JOIN (SELECT l.id, count(*) as c FROM (SELECT v.*,t.id_tag FROM `vini` as v JOIN (SELECT * FROM vini_tag WHERE id_tag IN ('" + colore_vino.join("','") + "')) as t ON (v.id=t.id_vino) ORDER BY v.id) as l  GROUP BY id ORDER BY c DESC, l.id) as r ON (w.id=r.id)) as v JOIN regioni as r ON (v.reg = r.id) JOIN nazioni as n ON (v.loc= n.id) JOIN (SELECT g.id_vino as id,a.nome as nome FROM tag as a JOIN vini_tag as g ON(g.id_tag = a.id) WHERE LOWER(a.nome) LIKE 'vin%' ) as t ON (t.id=v.id) WHERE v.id != '0'  GROUP BY v.id  LIMIT 5";
        else
            query = "SELECT v.*, r.nome as regione, n.nome as locazione, t.nome as tag FROM vini as v JOIN regioni as r ON (v.reg = r.id) JOIN nazioni as n ON (v.loc= n.id) JOIN (SELECT g.id_vino as id,a.nome as nome FROM tag as a JOIN vini_tag as g ON(g.id_tag = a.id) WHERE LOWER(a.nome) LIKE 'vin%' ) as t ON (t.id=v.id) WHERE v.id != '0' GROUP BY v.id  LIMIT 5";


        leggi_db(query, function (res) {

            if (nessuno == 1) {

                rows = res.rows;

                for (i = 0; i < rows.length; i++) {

                    if (rows.item(i).regione != "-") {
                        regione = ', ' + rows.item(i).regione;
                    }
                    else
                        regione = "";
                    _id = rows.item(i).id;
                    var tipotag = rows.item(i).tag;

                    if (tipotag.indexOf('osso') != -1) {
                        tipotag = lingua[12];
                        num_T = 1;
                    }
                    else if (tipotag.indexOf('anco') != -1) {
                        tipotag = lingua[13];
                        num_T = 2;
                    }
                    else if (tipotag.indexOf('umante') != -1) {
                        tipotag = lingua[14];
                        num_T = 5;
                    } else if (tipotag.indexOf('osat') != -1) {
                        tipotag = lingua[15];
                        num_T = 13;
                    }
                    //var dove=rows.item(i).locazione+regione;
                    var dove = rows.item(i).locazione;

                    if (dove.length > 15)
                        dove = dove.substr(0, 15) + "...";
                    var nom = rows.item(i).nome;
                    if (nom.length > 20)
                        nom = nom.substr(0, 20) + "...";


                    if (colore_vino.indexOf(num_T) >= 0)
                        catalogoDOM += '<div data-tag="' + tipotag + '" data-pack="' + rows.item(i).pack + '" data-naz="' + rows.item(i).loc + '" data-vino="' + rows.item(i).id + '" class="vino">\
						<p class="vino_nome">' + nom + '</p>\
						<div class="clprezzo">&euro; ' + rows.item(i).prezzo + '</div>\
						<div class="cluster dx">\
							<div class="dettagli icon-glass"></div><div class="dettagli">' + tipotag + '</div>\
						</div>\
						<div class="cluster ultimo dx anno">\
							<div class="dettagli icon-annata"></div><div class="dettagli">' + rows.item(i).anno + '</div>\
						</div>\
						<div class="cluster">\
							<div class="dettagli">' + dove + '</div><div style="float:left;" class="dettagli flag n' + rows.item(i).loc + '"></div>\
						</div>\
						<div class="clear"></div>\
						</div>\
						<div class="clear"></div>';

                }
            }
            catalogoDOM += "</div>";
            $('.content0').html(catalogoDOM);

            /* BIND FUNZIONI */
            $('.filColori div.selezione').removeClass('selezione');
            refresh_bind();

            $('.goback').unbind("tap").bind("tap", function (e) {
                e.preventDefault();
                e.stopPropagation();
                init_tour();
            });

            $('.filColori div').not('.legend').unbind("tap").bind("tap", function (e) {
                e.preventDefault();
                e.stopPropagation();
                refresh_bind();
                $('.fbot div').not('.legend').removeClass('sel');
                $(this).toggleClass('selezione');
                $('.vino').hide();

                var pack = $('.fbot').attr('data-pack');

                if (pack == '111') {

                    if ($('.filter').attr('data-fnaz') == '0') {

                        $('.filColori div').not('.legend').each(function () {
                            if ($(this).hasClass("selezione"))
                                $('.vino[data-tag="' + $(this).attr("data-colore") + '"]').show();
                            if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))

                                $('.vino').show();
                        });

                    }
                    else {


                        $('.filColori div').not('.legend').each(function () {
                            if ($(this).hasClass("selezione"))
                                $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-tag="' + $(this).attr("data-colore") + '"]').show();
                            if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))

                                $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + ']').show();
                        });

                    }
                }
                else {

                    if ($('.filter').attr('data-fnaz') == '0') {

                        $('.filColori div').not('.legend').each(function () {
                            if ($(this).hasClass("selezione"))
                                $('.vino[data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                            if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))
                            //alert($(this).attr("data-colore"));
                                $('.vino[data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                        });


                    }
                    else {

                        $('.filColori div').not('.legend').each(function () {
                            if ($(this).hasClass("selezione"))
                                $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                            if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))
                            //alert($(this).attr("data-colore"));
                                $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                        });

                    }
                }

            });
            $('.fbot div').not('.legend').unbind("tap").bind("tap", function (e) {
                e.preventDefault();
                e.stopPropagation();
                refresh_bind();
                $(this).toggleClass("sel");
                var pack = '';
                if ($('.fbot .bottiglia').hasClass('sel'))
                    pack += '1';
                else
                    pack += '0';
                if ($('.fbot .mezzo').hasClass('sel'))
                    pack += '1';
                else
                    pack += '0';
                if ($('.fbot .calice').hasClass('sel'))
                    pack += '1';
                else
                    pack += '0';

                if (pack == '000')
                    pack = '111';

                $('.fbot').attr('data-pack', pack);

                $('.vino').hide();
                if (pack == '111') {

                    if ($('.filter').attr('data-fnaz') == '0') {

                        $('.filColori div').not('.legend').each(function () {
                            if ($(this).hasClass("selezione"))
                                $('.vino[data-tag="' + $(this).attr("data-colore") + '"]').show();
                            if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))

                                $('.vino').show();
                        });

                    }
                    else {


                        $('.filColori div').not('.legend').each(function () {
                            if ($(this).hasClass("selezione"))
                                $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-tag="' + $(this).attr("data-colore") + '"]').show();
                            if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))

                                $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + ']').show();
                        });

                    }
                }
                else {

                    if ($('.filter').attr('data-fnaz') == '0') {

                        $('.filColori div').not('.legend').each(function () {
                            if ($(this).hasClass("selezione"))
                                $('.vino[data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                            if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))
                            //alert($(this).attr("data-colore"));
                                $('.vino[data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                        });


                    }
                    else {

                        $('.filColori div').not('.legend').each(function () {
                            if ($(this).hasClass("selezione"))
                                $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                            if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))
                            //alert($(this).attr("data-colore"));
                                $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                        });

                    }
                }

            });


            leggi_db("SELECT * FROM nazioni WHERE id!=0", function (rest) {
                $('.filtra.naz').html('<div class="libera nazz">' + lingua[5] + '</div>');
                for (i = 0; i < rest.rows.length; i++) {
                    $('.filtra.naz').append('<div data-naz="' + rest.rows.item(i).id + '" class="nazz">' + rest.rows.item(i).nome + '</div>');
                }
                leggi_db("SELECT * FROM regioni WHERE id!=0", function (regt) {
                    $('.filtra.reg').html('');
                    for (i = 0; i < regt.rows.length; i++) {
                        if (regt.rows.item(i).nome != "null")
                            $('.filtra.reg').append('<div data-naz="' + regt.rows.item(i).id_naz + '" class="nazz">' + regt.rows.item(i).nome + '</div>');
                    }
                    $('.filtra.reg .nazz').hide();
                    arnaz = new Array();
                    $('.vino').each(function () {
                        arnaz.push($(this).attr("data-naz"));
                    });
                    $('.filtra.naz .nazz').each(function () {
                        if (arnaz.indexOf($(this).attr("data-naz")) < 0)
                            $(this).hide();
                    });
                    $('.barra').bind("tap", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $('.filtra').hide();
                    });
                    $('.filter').bind("tap", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $(this).addClass("sel");
                        $('.filtra').hide();
                        $('.filtra.' + $(this).attr("data-filtro")).show();
                    });
                    $('.filtra.naz .nazz').unbind("tap").bind("tap", function () {
                        refresh_bind();
                        // alert('click nation');
                        var pack = $('.fbot').attr('data-pack');
                        if ($(this).hasClass("libera")) {

                            $('.filter[data-filtro=naz]').html(lingua[5]);
                            $('.filter[data-filtro=naz]').removeClass("sel");
                            $('.filtra.reg .nazz').hide();
                            $('.filter').attr('data-fnaz', '0');

                            if ($('.fbot').attr('data-pack') == '111') {
                                $('.filColori div').not('.legend').each(function () {
                                    if ($(this).hasClass("selezione"))
                                        $('.vino[data-tag="' + $(this).attr("data-colore") + '"]').show();
                                    if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))

                                        $('.vino').show();
                                });
                            }
                            else {
                                $('.filColori div').not('.legend').each(function () {
                                    if ($(this).hasClass("selezione"))
                                        $('.vino[data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                                    if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))
                                    //alert($(this).attr("data-colore"));
                                        $('.vino[data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                                });
                            }


                        } else {
                            $('.filtra.reg .nazz').hide();
                            $('.filtra.reg .nazz[data-naz=' + $(this).attr('data-naz') + ']').show();
                            $('.filter[data-filtro=naz]').html($(this).html());
                            $('.vino').hide();
                            $('.filter').attr('data-fnaz', $(this).attr('data-naz'));

                            if ($('.fbot').attr('data-pack') == '111') {
                                $('.filColori div').not('.legend').each(function () {
                                    if ($(this).hasClass("selezione"))
                                        $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-tag="' + $(this).attr("data-colore") + '"]').show();
                                    if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))

                                        $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + ']').show();
                                });
                            }
                            else {
                                $('.filColori div').not('.legend').each(function () {
                                    if ($(this).hasClass("selezione"))
                                        $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                                    if (!$('.red').hasClass('selezione') && !$('.white').hasClass('selezione') && !$('.spum').hasClass('selezione') && !$('.rosa').hasClass('selezione'))
                                    //alert($(this).attr("data-colore"));
                                        $('.vino[data-naz=' + $('.filter').attr('data-fnaz') + '][data-pack="' + pack + '"][data-tag="' + $(this).attr("data-colore") + '"]').show();
                                });
                            }

                        }
                        $('.filter[data-filtro=reg]').removeClass("sel");
                        $('.filter[data-filtro=reg]').html("Regione");
                        $('.filtra').hide();
                        $('.libera').show();

                    });
                    $('.filtra.reg .nazz').unbind("tap").bind("tap", function () {
                        /*$('.filtra.reg .nazz').hide();
                         $('.filtra.reg .nazz[data-naz='+$(this).attr('data-naz')+']').show();*/
                        if ($(this).hasClass("libera")) {
                            $('.filter[data-filtro=reg]').html("Regione");
                            $('.filter[data-filtro=reg]').removeClass("sel");
                            $('.vino[data-naz=' + $(this).attr('data-naz') + ']').show();
                        }
                        else {
                            $('.filter[data-filtro=reg]').html($(this).html());

                        }
                        $('.filtra').hide();
                        $('.libera').show();

                        /*$('.vino').hide();
                         $('.vino[data-naz='+$(this).attr('data-naz')+']').show();*/
                        refresh_bind();


                    });
                });

            });


        });
        if (tour != "1")
            scelte = new Array();
        /* FINE BIND FUNZIONI */
        refresh_bind();

    });
}
function refresh_bind() {
    $('.vino').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();

        init_vino($(this).attr("data-vino"));
    });

    $(document).on("scrollstart", function () {
        $('.vino').unbind("tap")
        setTimeout(function () {
            $('.vino').unbind("tap").bind("tap", function (e) {
                e.preventDefault();
                e.stopPropagation();

                init_vino($(this).attr("data-vino"));
            });
        }, 50);

    });
    update_bind_cart();
}
function cameriere(indice) {
    if (indice == 1) {
        $('.cameriere').fadeIn();
        $('.cameriere').unbind('tap').bind('tap', function (e) {
            e.preventDefault();
            e.stopPropagation();

        });
        $('.sono').unbind('tap').bind('tap', function (e) {
            e.preventDefault();
            e.stopPropagation();
            onConfirm();
        });
    }
}
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
        $('.totaleVal span').html('0.00');
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
        $('.totaleVal span').html('0.00');
        $('.cartArea table').attr('data-tot', "0");
        $('.ordina').unbind("tap");
        $('.sono').removeClass('io');

    });


}
function buy_cart() {
    //if(confirm('Vuoi ordinare questi vini?')){
    navigator.notification.confirm(
        'Vuoi ordinare questi vini?', // message
        cameriere,            // callback to invoke with index of button pressed
        'Vinozio',           // title
        'Si,No'     // buttonLabels
    );


}
function add_to_cart(nome, tipo, qnt, prezzo, id_v) {

    if (nome.length > 25)
        nome = nome.substr(0, 25) + "...";


    var cartDOM = '<tr data-tipo="' + tipo + '" data-id-v="' + id_v + '" data-qnt="' + qnt + '" data-prezzo="' + parseFloat(parseFloat(prezzo).toFixed(2) * qnt).toFixed(2) + '">\
		<td>' + nome + '</td>\
		<td><div class="' + tipo + '"></div></td>\
		<td><span class="cartQnt">' + qnt + '</span> x &euro; ' + parseFloat(prezzo).toFixed(2) + '</td>\
		<td>&nbsp;</td>\
	</tr>';

    qntchiam = qnt;
    if ($('.cartArea table tr[data-id-v="' + id_v + '"][data-tipo="' + tipo + '"]').length <= 0)
        $('.cartArea table').append(cartDOM);
    else {
        oldqnt = $('.cartArea table tr[data-id-v="' + id_v + '"][data-tipo="' + tipo + '"]').attr('data-qnt');

        qnt = (qnt * 1) + (oldqnt * 1);
        oldprezzo = $('.cartArea table tr[data-id-v="' + id_v + '"][data-tipo="' + tipo + '"]').attr('data-prezzo');
        newprezzo = (oldprezzo / oldqnt) * qnt;
        $('.cartArea table tr[data-id-v="' + id_v + '"][data-tipo="' + tipo + '"]').attr('data-qnt', qnt);
        $('.cartArea table tr[data-id-v="' + id_v + '"][data-tipo="' + tipo + '"]').attr('data-prezzo', newprezzo);
        $('.cartArea table tr[data-id-v="' + id_v + '"][data-tipo="' + tipo + '"] .cartQnt').html(qnt);
    }
    qnt = qntchiam;
    var tot = $('.cartArea table').attr('data-tot');
    tot = parseFloat(
        (

            parseFloat(prezzo).toFixed(2) * qnt

        ) + (tot * 1)
    ).toFixed(2);
    $('.cartArea table').attr('data-tot', tot);
    $('.totaleVal span').text($('.cartArea table').attr('data-tot'));
    $('.ordina').unbind("tap").bind("tap", function () {
        buy_cart();
    });
    update_bind_cart();
}
function apri_cart() {
    $('.cartArea').addClass('sel');
    $('.btn-cart').addClass('sel');
}
function close_cart() {
    $('.cartArea').removeClass('sel');
    $('.btn-cart').removeClass('sel');
}
function update_bind_cart() {
    $('.totaleVal span').text($('.cartArea table').attr('data-tot'));
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
function init_vino(_id) {

    update_bind_cart();
    $('.content0').html("");
    porta_su();
    leggi_db("SELECT v.*, r.nome as regione, n.nome as locazione FROM vini as v JOIN regioni as r ON (v.reg = r.id) JOIN nazioni as n ON (v.loc= n.id) WHERE v.id='" + _id + "'", function (res) {

        rows = res.rows;

        if (rows.item(0).regione != "-") {
            regione = ', ' + rows.item(0).regione;
        }
        else
            regione = "";

        stelle = "";

        for (i = 0; i < parseInt(rows.item(0).valutazione); i++)
            stelle += '<div data-icon="j" class="stella stella_p"></div>';
        for (i = 0; i < (5 - parseInt(rows.item(0).valutazione)); i++)
            stelle += '<div data-icon="j" class="stella"></div>';


        leggi_db("SELECT v.id_vino AS vino, t.nome AS nome, t.id AS codvin FROM `tag` AS t JOIN vini_tag AS v ON ( v.id_tag = t.id ) WHERE v.id_vino = '" + _id + "'", function (res) {

            //leggi_db("SELECT * FROM vini_consumatori WHERE id_c= '"+window.localStorage.getItem("id")+"'  AND id_v= '"+_id+"' ",function(pref){

            leggi_db("SELECT * FROM foto WHERE id_vino = '" + _id + "'", function (rec) {

                var foto = "";

                if (rec.rows.length >= 1)
                    foto = '<div class="infofoto" style="background-image:url(\'http://www.vinozio.com/crm/uploads/' + rec.rows.item(0).foto + '\');"></div>';

                var i = 0;
                colvin = lingua[12];


                for (var i = 0; i < res.rows.length; i++) {
                    if (res.rows.item(i).codvin == "1")
                        colvin = lingua[12];
                    if (res.rows.item(i).codvin == "2")
                        colvin = lingua[13];
                    if (res.rows.item(i).codvin == "5")
                        colvin = lingua[14];
                    if (res.rows.item(i).codvin == "13")
                        colvin = lingua[15];
                }


                carat = "";

                if (typeof rows.item(0).locazione != "undefined")
                    carat += '<tr><td style="font-weight:400;">' + lingua[5] + '</td><td style="font-weight:200;">' + rows.item(0).locazione + '</td></tr>';

                carat += '<tr><td style="font-weight:400;">' + lingua[10] + '</td><td style="font-weight:200;">' + rows.item(0).anno + '</td></tr>';

                if (typeof tipo != "undefined")
                    carat += '<tr><td style="font-weight:400;">' + lingua[11] + '</td><td style="font-weight:200;">' + colvin + '</td></tr>';

                if (rows.item(0).cantina != "")
                    carat += '<tr><td style="font-weight:400;">' + lingua[6] + '</td><td style="font-weight:200;">' + rows.item(0).cantina + '</td></tr>';
                if (rows.item(0).denominazione != "")
                    carat += '<tr><td style="font-weight:400;">' + lingua[9] + '</td><td style="font-weight:200;">' + rows.item(0).denominazione + '</td></tr>';
                if (rows.item(0).vitigno != "")
                    carat += '<tr><td style="font-weight:400;">' + lingua[8] + '</td><td style="font-weight:200;">' + rows.item(0).vitigno + '</td></tr>';
                if (rows.item(0).grado != "")
                    carat += '<tr><td style="font-weight:400;">' + lingua[7] + '</td><td style="font-weight:200;">' + rows.item(0).grado + '</td></tr>';


                tipodisp = "";

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
                var prz = "";

                if (typeof rows.item(0).prezzo_cal != "undefined")
                    prz += '<span class="prezCal">' + rows.item(0).prezzo_cal + '</span>';
                if (typeof rows.item(0).prezzo_mez != "undefined")
                    prz += '<span class="prezMez">' + rows.item(0).prezzo_mez + '</span>';


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


                $('.content0').html(vinoDOM);
                $('.btn-a').unbind("tap").bind("tap", function (e) {
                    e.preventDefault();
                    e.stopPropagation();

                    var id_vin = $(this).attr("data-id");
                    var qnt = $('.qnt').text();

                    if (tipo != "") {
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
                });
                $('.acquisto .fbot div').unbind("tap").bind("tap", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $('.fbot div').removeClass('sel');
                    tipo = $(this).attr('class');
                    $(this).addClass('sel');
                    $('.prezzi span').hide();
                    if (tipo == "bottiglia")
                        $('.prezBot').show();
                    else if (tipo == "calice")
                        $('.prezCal').show();
                    else
                        $('.prezMez').show();

                });
                $('.goback').unbind("tap").bind("tap", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (scelte.length >= 1)
                        init_catalogo("", "1");
                    else
                        init_catalogo();
                    refresh_bind();
                });

                $('.men').unbind("tap").bind("tap", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (parseInt($('.qnt').text()) > 1)
                        $('.qnt').text(parseInt($('.qnt').text()) - 1);
                });

                $('.piu').unbind("tap").bind("tap", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (parseInt($('.qnt').text()) < 10)
                        $('.qnt').text(parseInt($('.qnt').text()) + 1);
                });

                $('.prezzi span').hide();

                tipo = $('.acquisto .fbot div').first().attr('class');
                $('.acquisto .fbot div').first().addClass('sel');


                if (tipo == "bottiglia")
                    $('.prezBot').show();
                else if (tipo == "calice")
                    $('.prezCal').show();
                else
                    $('.prezMez').show();


                $(document).on("scrollstart", function () {
                    $('.btn-a').unbind("tap");
                });

                $(document).on("scrollstop", function () {
                    setTimeout(function () {

                        $('.acquisto .fbot div').unbind("tap").bind("tap", function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            $('.fbot div').removeClass('sel');
                            tipo = $(this).attr('class');
                            $(this).addClass('sel');
                            $('.prezzi span').hide();
                            if (tipo == "bottiglia")
                                $('.prezBot').show();
                            else if (tipo == "calice")
                                $('.prezCal').show();
                            else
                                $('.prezMez').show();

                        });
                        $('.btn-a').unbind("tap").bind("tap", function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            //carica();
                            var id_vin = $(this).attr("data-id");
                            var qnt = $('.qnt').text();
                            /*$.ajax({
                             url: _topURL+"content.php",
                             type: "POST",
                             data:{
                             id: id_vin,
                             cont: "compra",
                             qnt: $('.qnt').text()
                             }
                             }).done(function(){
                             setTimeout(function(){
                             stop_carica();
                             $('.btn-a').css('background','#9f223f').css('color','#fff').html('AGGIUNTO');
                             }, 1000);
                             });
                             cart=window.localstorage.getItem("cart");
                             cart=$.parseJSON(cart);
                             var asd={id_vin:qnt};
                             cart.push(asd);
                             cart=JSON.stringify(cart);
                             window.localstorage.setItem("cart",cart);*/
                            if (tipo != "") {
                                /*
                                 if(tipo=="bottiglia")
                                 add_to_cart(rows.item(0).nome,tipo,qnt,rows.item(0).prezzo,id_vin);
                                 else
                                 add_to_cart(rows.item(0).nome,tipo,qnt,rows.item(0).prezzo_cal,id_vin);
                                 */
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
                        });
                    }, 150);
                });
                /*
                 $('.ctuser .vino_nome').unbind("tap").bind("tap",function(e){
                 e.preventDefault();
                 e.stopPropagation();

                 init_profilo($(this).attr("data-user"));
                 });
                 $('.stel_v').unbind("tap").bind("tap",function(e){
                 e.stopPropagation();
                 e.preventDefault();
                 _this=$(this);
                 fly_login();
                 });
                 $('.pref').unbind("tap").bind("tap",function(e){
                 e.stopPropagation();
                 e.preventDefault();
                 _this=$(this);
                 fly_login();/*
                 if(_this.hasClass("w"))
                 {
                 scrivi_db("DELETE FROM `vini_consumatori` WHERE id_c='"+window.localStorage.getItem("id")+"' AND id_v='"+_this.attr('data-id')+"'",function(){
                 _this.toggleClass("w");
                 });


                 }else
                 {
                 scrivi_db("INSERT INTO `vini_consumatori` (id_c,id_v) VALUES ('"+window.localStorage.getItem("id")+"','"+_this.attr('data-id')+"') ",function(){
                 _this.toggleClass("w");
                 });
                 }
                 });*/
                /*
                 $('.cond').unbind("tap").bind("tap",function(e){
                 e.stopPropagation();
                 e.preventDefault();
                 window.plugins.socialsharing.available(function(isAvailable) {
                 if (isAvailable) {
                 leggi_db("SELECT * FROM foto WHERE id_vino = '"+$(this).attr("data-id")+"' LIMIT 1",function(ph){
                 if(ph.rows.length>0)
                 {
                 window.plugins.socialsharing.share('Ho assaggiato '+rows.item(0).nome, null, 'http://vinozio.flaviofazio.com/back/uploads/'+ph.rows.item(0).foto, null);
                 }
                 else
                 {
                 window.plugins.socialsharing.share('Ho assaggiato '+rows.item(0).nome, 'Tramite Vinozio');
                 }

                 });
                 }else
                 {
                 alert("La condivisione non è disponibile per questo dispositivo");
                 }
                 });
                 });*/

            });
            //});
        });
    });
}
function init_ristorante() {
    porta_su();

    leggi_db("SELECT * FROM ristoranti WHERE id='" + window.localStorage.getItem("id_r") + "'", function (dati) {

        leggi_db("SELECT * FROM foto_rist WHERE id_rist='" + window.localStorage.getItem("id_r") + "'", function (rist) {

            rows = rist.rows;
            miefoto = "";
            str = dati.rows.item(0).indirizzo.replace(" ", "+") + "+" + dati.rows.item(0).citta.replace(" ", "+");

            //miamappa='<iframe height="450" frameborder="0" style="border:0;width:100%;" src="http://maps.google.nl/maps?q='+str+'&output=embed&z=60"> </iframe>';
            for (i = 0; i < rows.length; i++) {/*break*/
                miefoto += '<div data-foto="' + rows.item(i).foto + '" style="background-image: url(\'http://vinozio.com/crm/APP/uploads/' + rows.item(i).foto + '\');" class="foto_rist"></div>';
            }

            var ristDOM = '\
			<div class="profile_top">\
				<div class="gradient_profile">\
					<div style="padding-top: 4em;" class="center_pro">\
						<div class="foto" style="background-image: url(' + window.localStorage.getItem("photo_r") + ');"></div>\
						<div class="p_nome">' + window.localStorage.getItem("nome_r") + '</div>\
						<div class="p_bio">' + window.localStorage.getItem("bio_r") + '</div>\
						<span class="sinistra">' + window.localStorage.getItem("sito_r") + '</span>\
						<span class="destra">' + window.localStorage.getItem("email_r") + '</span>\
					</div>\
				</div>\
			</div>\
			<div style="width: 830px; margin: 0 auto;">\
							' + miefoto + '\
							<div class="clear"></div>\
						</div>\
					</div>';

            $('.content0').html(ristDOM);

            var sel = $('.botton.sel').attr("data-div");
            $('.contenitore[data-div=' + sel + ']').show();
            $('.botton').bind("tap", function (e) {
                e.preventDefault();
                e.stopPropagation();
                $('.botton').removeClass('sel');
                $(this).addClass("sel");
                var sel = $(this).attr("data-div");
                $('.contenitore').hide();
                $('.contenitore[data-div=' + sel + ']').show();
            });
            $('.foto_rist').unbind("tap").bind("tap", function (e) {
                e.preventDefault();
                e.stopPropagation();
                $('body').append('<div class="oscuratore"></div>');
                $('.oscuratore').html('<div style="background-image: url(' + _topURL + 'uploads/' + $(this).attr('data-foto') + ');" class="foto_g_rist"></div>').show();
                $('.oscuratore').unbind("tap").bind("tap", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    $('.oscuratore').remove();
                });
            });
        });
    });

}
function init_impostazioni() {
    impo = '<table style="width:100%;">\
	<tr><td>Nome:</td><td><input class="nome" type="text"/></td><td>Email:</td><td><input class="email" type="email"/></td></tr>\
	<tr><td valign="top">Sito:</td><td valign="top"><input class="sito" type="text"/></td><td valign="top">Biografia:</td><td valign="top"><textarea class="bio"></textarea></td></tr>\
	<tr><td><div class="btn-a salva">Salva</div></td></tr></table>';
    pass = '<table style="width:100%;">\
	<tr><td>Password:</td><td><input class="pass" type="text"/></td><td>Password:</td><td><input class="pass0" type="text"/></td></tr>\
	<tr><td><div class="btn-a salva">Salva</div></td></tr></table>';
    impoDOM = '\
	<div class="impostazioni">\
		<div class="foto" style="background-image: url(' + window.localStorage.getItem("photo") + ');"></div>\
		<div class="informazioni"><div style="font-weight:400">' + window.localStorage.getItem("nome") + '</div>\
		<div style="font-weight:200">' + window.localStorage.getItem("email") + '</div></div>\
		<div class="cambia_foto"><input class="foto_file" type="file"/><div class="btn-a cambia">Cambia Foto</div></div>\
		<div class="clear"></div>\
		<div class="tabbled impost">\
			<div class="t_head">\
				<div class="botton sel" data-div="0">Impostazioni</div>\
				<div class="botton last" data-div="1">Password</div>\
				<div class="clear"></div>\
			</div>\
			\
			<div class="contenitore" style="padding-top:30px;" data-div="0">\
				' + impo + '\
			</div>\
			<div class="contenitore" style="padding-top:30px;" data-div="1">\
				' + pass + '\
			</div>\
		</div>\
	</div>\
	';

    $('.content0').html(impoDOM);
    $('.cambia').unbind('tap').bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.foto_file').click();
    });
    $('.foto_file').change(function () {
        carica();


        var options = {
            url: $(this).attr("action"),
            success: function (response, status) {
                $("#onsuccessmsg").html("Status :<b>" + status + '</b>');
                stop_carica();
            }
        };
        $(this).ajaxSubmit(options);
        return false;


    });
    $('.salva').unbind('tap').bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        campi = new Array('nome', 'email', 'sito', 'bio', 'pass', 'pass0');
        for (i = 0; i < campi.length; i++) {
            if ($('.' + campi[i]).val().length > 0) {
                window.localStorage.setItem(campi[i], $('.' + campi[i]).val());
            }
        }
        $('.salva').unbind('tap');
        update_menu();
        alert("Salvato");
        init_impostazioni();
    });
    var sel = $('.botton.sel').attr("data-div");
    $('.contenitore[data-div=' + sel + ']').show();
    $('.botton').bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.botton').removeClass('sel');
        $(this).addClass("sel");
        var sel = $(this).attr("data-div");
        $('.contenitore').hide();
        $('.contenitore[data-div=' + sel + ']').show();
    });
}

function init_esci() {
    window.localStorage.clear();
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
    });
}
