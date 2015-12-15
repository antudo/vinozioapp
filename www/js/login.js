/**
 * Created by Antonio Di Mariano on 03/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */


/**
 *
 * @param callback
 */

function login_form(callback) {
    stop_carica();
    console.log("login form")

    $(".voce_o").removeClass("voce_o");
    loginDOM = '\
	\
	<div class="login">\
		<div class="cover">\
			<div class="center_log">\
				<input type="email" />\
				<input type="password" />\
				<div class="signup">LOGIN</div>\
			\
		</div>\
	</div>\
	\
	';
    $('.content0').html(loginDOM);



    $('.signup').bind("click", function (e) {
        $('input').blur();
        var url = 'https://obscure-anchorage-5846.herokuapp.com/api/users/login';
        var data = {
            email: $('input[type=email]').val(), password: $('input[type=password]').val()
        };
        var accessToken = '';
        loginRequest()
    })
}

/**
 *
 */
function renderLoginPage() {

    console.log("MYLOGIN");
    initEvents()
    loginRequest()
    $('.content0').addClass("content0_log");
    init_tour();
    stop_carica();
    update_bind_cart();
/*
    login_form(function (accessToken) {
        console.log("Callback from login" + accessToken)

        menu_close();
        $('.content0').addClass("content0_log");
        init_tour();
        stop_carica();
        update_bind_cart();
    });
*/
}


function renderHomePage() {
    menu_close();
    $('.content0').addClass("content0_log");
    init_tour();
    stop_carica();
    update_bind_cart();
}
function isLogged() {
    if (!(existItem("access_token"))) {  //attualmente il controllo verifica se esiste un cookie con key "access_token" e un altro con "userId"
        window.location = 'login.html';  //ci sarebbe da controllare se i rispettivi valori sono validi (nel senso se sono autenticati dal server)
    }                                     // in questo caso occorrerebbe concordare uno scambio di verifica client-server
}

function loginRequest() {

    var url = 'https://obscure-anchorage-5846.herokuapp.com/api/users/login';
   /*
    var data = {
        email: $('input[type=email]').val(), password: $('input[type=password]').val()
    };
    */
    var data = {
        email: "pepenero@gmail.com", password: "abcDEF9876"
    };
    var accessToken = '';
    if (validateUserAndPass(data)) {
        sendPOSTRequest(url, 'POST', data, accessToken, function (response) {
            console.log("----[Callback from login]----" + response);
            response_string = JSON.stringify(response)
            decodedJson = JSON.parse(response_string);

            console.log("----decodedJson----" + decodedJson.id)

            if (decodedJson.hasOwnProperty('error')) {
                loginFail(decodedJson);
            } else if (decodedJson.hasOwnProperty('id') && decodedJson.hasOwnProperty('ttl')
                && decodedJson.hasOwnProperty('created') && decodedJson.hasOwnProperty('userId')) {
                loginSuccess(decodedJson);
            } else {
                loginFail(decodedJson);
            }
        });
    } else {
        loginFail();
    }
}

function validateUserAndPass(data) {

    if (validateEmail(data.email) && data.password.length > 4)
        return true;
    else
        return false;

}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function loginFail(decodedJson) {
    alert("Email o password non corretti");// modificare per far apparire notifica in stile iOS

}

function logout() {
    console.log("----------LOGOUT--------")
    var value =    window.localStorage.getItem("access_token");
    console.log("LOGOUT TOKEN---> "+value);

    var url = 'https://obscure-anchorage-5846.herokuapp.com/api/users/logout';
    var data = {};
    var accessToken = value;

    sendPOSTRequest(url, 'POST', data, accessToken, function (response) {
        console.log("----[Callback from logout]----" + response);
        deleteItem("access_token");
        deleteItem("userId");
        window.localStorage.clear();
        localStorage.clear();
        $('.btn-cart').hide();
        $('.content0').removeClass("content0_log");
        renderLoginPage()
    });
}

function loginSuccess(decodedJson) {
    console.log("LOGIN SUCCESS")
    saveItem("access_token", decodedJson.id);
    saveItem("userId", decodedJson.userId);
    renderHomePage()
}

