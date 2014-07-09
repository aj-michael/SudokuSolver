window.onload = function () {
    var taXpath = "//input[@type='number']";
    console.log("Hey");
    var result = document.evaluate(taXpath, document, null, 9, null);
    console.log(result);
    console.log(result.singleNodeValue);
    console.log(result.resultType);
};

function clearField(e,input) {
    var keycode = e.which || e.keyCode;
    console.log(keycode);
    if (keycode == 8 || keycode == 46 || (48 < keycode && keycode < 58)) {
        input.value = "";
    } else {
        e.preventDefault();
    }
}

