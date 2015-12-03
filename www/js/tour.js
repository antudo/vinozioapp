/**
 * Created by Antonio Di Mariano on 03/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */

var step = 0;
var scelte = new Array();
var prezzo = 0;
var filter = new Array()


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
	<div class="risposta" data-dom="colore" data-tag="1" data-value=" ' + lingua[12] + '" ><span>' + lingua[12] + '</span></div></td>\
	<td><div class="risposta" data-dom="colore" data-tag="2" data-value=" ' + lingua[13] + '" ><span>' + lingua[13] + '</span></div></td>\
	<td><div class="risposta" data-dom="colore" data-tag="5" data-value=" ' + lingua[14] + '" ><span>' + lingua[14] + '</span></div></td>\
	<td><div class="risposta" data-dom="colore" data-tag="13" data-value=" ' + lingua[15] + '" ><span>' + lingua[15] + '</span></div></td>\
	\
	<td><div class="risposta" data-dom="perfetto" data-tag="3" data-value=" ' + lingua[17] + '" ><span>' + lingua[17] + '</span></div></td>\
	<td><div class="risposta" data-dom="perfetto" data-tag="4" data-value=" ' + lingua[18] + '" ><span>' + lingua[18] + '</span></div></td>\
	<td><div class="risposta" data-dom="perfetto" data-tag="10" data-value=" ' + lingua[19] + '" ><span>' + lingua[19] + '</span></div></td>\
	<td><div class="risposta" data-dom="perfetto" data-tag="14" data-value=" ' + lingua[20] + '" ><span>' + lingua[20] + '</span></div></td>\
	\
	<td><div class="risposta" data-dom="prezzo" data-value="5-15" data-prez="5-15"><span>&euro;5-15</span></div></td>\
	<td><div class="risposta" data-dom="prezzo" data-value="15-25" data-prez="15-25"><span>&euro;15-25</span></div></td>\
	<td><div class="risposta" data-dom="prezzo" data-value="25-40" data-prez="25-40"><span>&euro;25-40</span></div></td>\
	<td><div class="risposta" data-dom="prezzo" data-value="40" data-prez="40"><span>&euro;40+</span></div></td>\
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
        console.log("taphold")
        console.log("DATA-TAG " + $(this).attr('data-tag'));

        if ($(this).hasClass("sel")) {
            $(this).removeClass("sel");
        } else {
            $(this).addClass("sel");
        }
    });
    $('.risposta').unbind("tap").bind("tap", function (e) {
        e.preventDefault();
        e.stopPropagation();
        console.log("TAP");
        console.log("---DATA--" + e.target.getAttribute('data-value'));
        filter.push(e.target.getAttribute('data-value'));

        if ($(this).hasClass("sel")) {
            if (typeof $(this).attr('data-tag') != "undefined") {
                var index = scelte.indexOf("'" + $(this).attr('data-tag') + "'");
                if (index > -1) {
                    scelte.splice(index, 1);
                }
                $(this).removeClass("sel");
            } else {
                var index = prezzo.indexOf("'" + $(this).attr('data-prez') + "'");
                if (index > -1) {
                    prezzo.splice(index, 1);
                }
                $(this).removeClass("sel");
            }
        } else {
            if (typeof $(this).attr('data-tag') != "undefined") {
                var index = scelte.indexOf("'" + $(this).attr('data-tag') + "'");
                if (index == -1) {
                    scelte.push("'" + $(this).attr('data-tag') + "'");
                }
                $(this).addClass("sel");
            } else {
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
            if (flag == 1 /*&& step!=domande.length-1*/) {
                step++;
                if (step == 3)
                    step = 4;
                if (step == 1)
                    step = 2;
                dom();
            }

        }
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
        console.log("SCELTE " + filter)

        var category = filter[0];
        var match_required = filter[1];
        var retail_price = filter[2];

        var where = {

            "subcategory": category,
            "match.food": match_required,
            "retail_price": retail_price
        }
        console.log("WHERE:" + JSON.stringify(where));
        get_vini(where);
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
            step = $(this).attr('data-id-dom');
            dom();
        });
    }
}


function savePreferenceTour(question, preference) {
    console.log("Question" + question)
    console.log("Preference" + preference);
    saveItem(question, preference); //TODO settare opportunamente il tempo del cookie
    /*
     if (isLogged) {
     saveItem(question, preference); //TODO settare opportunamente il tempo del cookie
     } else {
     alert("Effettua prima il login");
     }
     */
}

function sendPreference() {
    //TODO verificare il formato con la quale bisogna mandare le preference
    domande = new Array('colore', 'gradazione', 'perfetto', 'retrogusto', 'prezzo');
    var pref = '';
    for (i = 0; i < domande.length; i++) {
        pref = pref + getItem(domande[i]) + ' ';
    }
    //TODO impacchettare in formato json
    ajax("GET", "catalogo", "pref", function (response) {
        startCatalogo(response);
        saveCatalogo(response);
    });
}

