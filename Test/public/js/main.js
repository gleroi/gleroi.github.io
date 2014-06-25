function init() {
    var cpt = 0;
    var elm = document.getElementById( "test" );
    setInterval( function () {
        elm.innerText = "BOOO2! " + cpt++;
    }, 500 );
}

window.onload = init;
