/**
 * Created by Antonio Di Mariano on 03/12/15.
 * email:antonio.dimariano@gmail.com
 * https://github.com/antoniodimariano/
 */
function saveItem(item, value) {
    localStorage.setItem(item, value);
}

function getItem(item) {
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
