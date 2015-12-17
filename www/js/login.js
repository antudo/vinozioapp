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
    console.log("login_form")
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
        loginRequest()
    })
}

/**
 * It renders the Login Form
 */
function renderLoginPage() {

    console.log("renderLoginPage");
    initEvents()
    $('.content0').addClass("content0_log");
    autoLoginRequest(); // <--- commentare per attivare il form login

    /*    COMMENTATO PER USARE autoLoginRequest()


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
/**
 * It renders the HomePage
 */
function renderHomePage() {
    menu_close();
    $('.content0').addClass("content0_log");
    init_tour();
    stop_carica();
    update_bind_cart();
}


/**
 * todo: si potrebbe verificare i valori TTL anche lato client
 */
function isLogged() {
    if (!(existItem("access_token"))) {
        window.location = 'login.html';
    }
}
/**
 * Just For Developement
 *
 * Auto Login
 *
 */
function autoLoginRequest() {
    var config = window.localStorage.getItem('config');

    console.log("-----------------AUTO LOGIN MODE ON--------------------")
    var config = window.localStorage.getItem('config');
    var url_config = JSON.parse(config)

    var url = url_config.url.login;
    var data = {
        email: "pepenero@gmail.com", password: "abcDEF9876"
    };
    var accessToken = '';
    if (validateUserAndPass(data) ) {
        sendAPIRequest(url, 'POST', data, accessToken, function (response) {
            console.log("----[Callback from login]----" + response);
            if (response) {
                console.log("OK LOGIN")
                loginSuccess(response);
            } else {
                console.log("LOGIN FAIL")
                loginFail();
            }
        });
    } else {
        loginFail();
    }
}

/**
 * it makes a POST requesto to /api/users/login
 *
 */
function loginRequest() {

    var config = window.localStorage.getItem('config');
    var url_config = JSON.parse(config)
    var url = url_config.url.login;


    var data = {
        email: $('input[type=email]').val(), password: $('input[type=password]').val()
    };
    var accessToken = '';
    if (validateUserAndPass(data)) {
        sendAPIRequest(url, 'POST', data, accessToken, function (response) {

            if (response) {
                console.log("OK LOGIN")
                loginSuccess(response);
            } else {
                console.log("LOGIN FAIL")
                loginFail();
            }
        });
    } else {
        loginFail();
    }
}

/**
 *
 * @param data
 * @returns {boolean}
 */
function validateUserAndPass(data) {

    if (validateEmail(data.email) && data.password.length > 4)
        return true;
    else
        return false;

}
/**
 *
 * @param email
 * @returns {boolean}
 */
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}
/**
 * todo: Inserire PUSH notification al posto di alert
 * @param decodedJson
 */
function loginFail(decodedJson) {
    //alert("Email o password non corretti");// modificare per far apparire notifica in stile iOS
    console.log("LOGIN FAIL")
    //renderLoginPage()

}
/**
 *
 */
function logout() {
    console.log("----------LOGOUT--------")
    var value = window.localStorage.getItem("access_token");
    console.log("ACCESS_TOKEN: " + value);
    if(!value) {
        renderLoginPage()
    } else {
        var config = window.localStorage.getItem('config');
        var url_config = JSON.parse(config)
        var url = url_config.url.logout;

        var data = {};
        var accessToken = value;

        sendAPIRequest(url, 'POST', data, accessToken, function (response) {
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
}
/**
 *
 * @param decodedJson
 */
function loginSuccess(decodedJson) {
    console.log("LOGIN SUCCESS")
    saveItem("access_token", decodedJson.id);
    saveItem("userId", decodedJson.userId);
    renderHomePage()
}

