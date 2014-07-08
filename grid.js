window.onload = function () {
    var taXpath = "//input[@type='number']";
    console.log("Hey");
    var result = document.evaluate(taXpath, document, null, 9, null);
    console.log(result);
    console.log(result.singleNodeValue);
    console.log(result.resultType);
};
