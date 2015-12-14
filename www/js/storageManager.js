/**
 * Created by Antonio Di Mariano on 03/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */
function saveItem(item, value) {
    console.log("[saveItem][item]:"+item + "value:"+value)
    localStorage.setItem(item, value);
    console.log("VALORE"+localStorage.getItem("access_token"))
}

function getItem(item) {
    console.log("GET ITEM: "+item)
    console.log("VALORE: "+localStorage.getItem(item))
    return localStorage.getItem(item);
}

function existItem(item) {
    var myItem = localStorage.getItem(item);
    if (myItem != "")
        return true;

    return false;
}

function deleteItem(item) {
    localStorage.removeItem(item);
}
