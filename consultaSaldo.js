
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const saldo = urlParams.get('saldo');

    const saldoElement = document.getElementById('saldoContenedor');
    saldoElement.textContent = 'Tu saldo actual es: $' + saldo;
    saldoElement.setAttribute("style", "color:black; font-size:20px; margin-top:20px; margin-left:10px;")
}