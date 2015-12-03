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

    /*
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
     */

    $('.signup').bind("click", function (e) {
        $('input').blur();
        callback();
        /*
         $.ajax({
         url: server_url + '/api/users/login',
         type: "POST",
         data: {
         email: $('input[type=email]').val(),
         password: $('input[type=password]').val()
         },
         success: function (dataString) {
         console.log("AccessToken: " + dataString.id);
         callback(dataString.id)
         },
         error: function (data) {
         alert("Email or Password Incorrect.Cunnutu!")
         }

         })
         */
    })
}

/**
 *
 */
function my_login() {

    console.log("MYLOGIN");
    initEvents()
    login_form(function (accessToken) {
        console.log("Callback from login" + accessToken)
        /*
         $.ajax({
         url: server_url + '/api/storages',
         type: "GET",
         headers :  {
         'Authorization' : accessToken
         },
         success: function (response) {
         console.log("Response: " + JSON.stringify(response));
         callback(dataString.id)
         },
         error: function (data) {
         alert("Errore   ")
         }
         })
         */
        menu_close();
        $('.content0').addClass("content0_log");
        update_menu();
        init_tour();
        stop_carica();
        update_bind_cart();
    });
}
