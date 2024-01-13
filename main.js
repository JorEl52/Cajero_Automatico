
//Arreglo de cuentas
var cuentas = [
    { nombre: 'Mali', saldo: 200, contraseña: 'sartre' },
    { nombre: 'Gera', saldo: 290, contraseña: 'qwerty'},
    { nombre: 'Maui', saldo: 67, contraseña: 'bumble' }
  ];

let mensajeMostrado = false;


//=====================================Ingreso a la cuenta=============================================
const logIn = document.getElementById('formulario')

logIn?.addEventListener("submit", function(event) {
    event.preventDefault();//este metodo evita que el formulario se envie automáticamente
    
    const email = document.getElementById("username").value
    const password = document.getElementById("password").value
    //Encontramos el usuario y la contraseña coincidan con nuestro arreglo de cuentas
    if(cuentas.some(cuenta  => cuenta.nombre === email && cuenta.contraseña === password)){
        //Encontramos la cuenta ingresada y guardamos la informacion del usuario en el localStorage
        const cuentaSesion = cuentas.find((cuenta) => cuenta.nombre === email);
        localStorage.setItem("cuenta", JSON.stringify (cuentaSesion));
        //Redirigir la informacion de cuenta
        window.location.href = "firstPage.html"
    
    }else{
        
        if(!mensajeMostrado){
            const mensaje = document.createElement("p")
            mensaje.textContent = "Correo electrónico o contraseña incorrectos. Intenta de nuevo."
            mensaje.setAttribute("style", "color:red; font-size:12px; margin:0;")
            
            const alerta = document.getElementById('alerta');
            alerta.appendChild(mensaje);
            mensajeMostrado = true;
        }
        
    }
})

//======================================Consultar saldo==========================================================
const consulta = document.getElementById('consultaSaldo')

consulta?.addEventListener('click', function(event){
    event.preventDefault()

    // Encontramos la cuenta del usuario que ingresó
    const cuenta = JSON.parse(localStorage.getItem("cuenta"));
    // Obtenemos el saldo de la cuenta del usuario que ingresó
    const saldo = cuenta.saldo;

    window.location.href = "consultaSaldo.html?saldo="+saldo;

})

//========================================Retiro de saldo================================================================

const retiro = document.getElementById('retiraSaldo')

retiro?.addEventListener('click',function(event){
    event.preventDefault();
    //Obtenemos el objeto cuenta y extraemos el saldo
    const cuenta = JSON.parse(localStorage.getItem("cuenta"));
    let saldo = cuenta.saldo;
    //Pedimos al usuario digite el saldo a retirar
    const montoRetiro = prompt ("Ingresa el monto a retirar");

    //Verificamos si el monto ingresado es correcto
    if (montoRetiro > 0 && montoRetiro < saldo && saldo - montoRetiro >= 10){
        saldo -= montoRetiro;
        alert('Saldo actualizado con éxito. Monto retirado: '+montoRetiro+ ' Pesos. Saldo actual: '+saldo+' Pesos.');
        cuenta.saldo = saldo;
        localStorage.setItem("cuenta",JSON.stringify(cuenta));
        window.location.href = "consultaSaldo.html?saldo="+saldo;

    }
    else if (saldo-montoRetiro <10){
        alert('Error al realizar el retiro. La cuenta no puede tener menos de 10 pesos. Intenta de nuevo')
    }else{
        alert('Error al rfealizar el retiro. Intenta de nuevo')
    }


})

//=============================================Ingresar saldo=====================================================

const ingreso = document.getElementById('ingresaSaldo')

ingreso?.addEventListener('click',function(event){
    event.preventDefault();

    //Obtenemos el objeto cuenta
    const cuenta = JSON.parse(localStorage.getItem("cuenta"));
    let saldo = cuenta.saldo;
    //Pedimos al usuario digite el saldo a depositar
    const montoDeposito = parseFloat(prompt("Ingresa el monto a depositar: "));

    //Verificamos que el monto sea correcto
    if (montoDeposito > 0 && montoDeposito < 990 && saldo + montoDeposito <= 990){
        saldo += montoDeposito;
        alert('Saldo actualizado con éxito. Monto depositado: '+montoDeposito+ ' Pesos. Saldo actual: '+saldo+ ' Pesos.');
        cuenta.saldo = saldo;
        localStorage.setItem("cuenta", JSON.stringify(cuenta));
        window.location.href = "consultaSaldo.html?saldo="+saldo;

    }else if(saldo + montoDeposito > 990){
        alert('Error al depositar. No puedes tener mas de 990 pesos en la cuenta. Intenta de nuevo')
    }else{
        alert("Monto incorrecto, intente de nuevo")
    }

})

//================================================Cerrar sesión=====================================================================

const cerrarCuenta = document.getElementById('cerrarSesion');

cerrarCuenta.addEventListener('click',()=>{

    //Mostramos cuadro de dialogo de confirmacion de cerrar sesion
    const resultado = confirm('¿Estás seguro de que deseas cerrar sesión?');
    //Si la respuesta es positiva se cierra la cuenta
    if(resultado === true) {
        //Eliminando los datos de la cuenta del Local Storage
        localStorage.removeItem("cuenta");
        //Redirigimos a la pagina principal
        window.location.href = "index.html";
    }

    //alert('Sesión finalizada.')
})

