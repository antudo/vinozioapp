/**
 * Created by Antonio Di Mariano on 03/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */
function get_vini(query) {
    console.log("GET VINI"+JSON.stringify(query))

}
function get_storages(query) {

    $.ajax({
        url: server_url + '/api/storages',
        type: "GET",
        headers :  {
            'Authorization' : accessToken
        },
        success: function (response) {
            console.log("Response: " + JSON.stringify(response));
            callback(response)
        },
        error: function (data) {
            alert("Errore")
            callback({"error":"login failed"})

        }
    })

}

function sendAPIRequest(url, type, data, accessToken, callback) {

    console.log("sendAPIRequest[url]:"+url);
    console.log("sendAPIRequest[data]:"+JSON.stringify(data));
    console.log("sendAPIRequest[type]:"+type);
    console.log("sendAPIRequest[accessToken]:"+accessToken);


    $.ajax({
        url: url,
        data: data,
        type: type,
        dataType: "json",
        headers :  {
            'Authorization' : accessToken,
            'Accept': 'application/json'
        },
        success: function (response) {
            console.log("sendAPIRequest[RESPONSE] : " + JSON.stringify(response));
            callback(response)
        },
        error: function(request, status, error) {
            console.log("Error status " + status);
            console.log("Error request status text: " + request.statusText);
            console.log("Error request status: " + request.status);
            console.log("Error request response text: " + request.responseText);
            console.log("Error response header: " + request.getAllResponseHeaders());
            $("#error").html(status);
            callback()

        }
    })
}
