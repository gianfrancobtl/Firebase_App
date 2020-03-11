// Login
// Instancia del proveedor del servicio:
var provider = new firebase.auth.GoogleAuthProvider();


$('#login').click(function(){
    firebase.auth()
        .signInWithPopup(provider)
        .then(function(result) {
            console.log(result);
            guardarDatos(result.user);
            $('#login').hide();
            $('#root').append("<img src='"+result.user.photoURL+"'/>");
        })
})

// La siguiente función guarda los datos del login automáticamente.
function guardarDatos(user) {
    var usuario = {
        id:user.uid,
        nombre:user.displayName,
        email:user.email,
        foto:user.photoURL
    }
    firebase.database().ref("usuarios/" + user.uid)
    .set(usuario)
}

// Base de datos
/* $('#guardar').click(function(){
    firebase.database().ref("Rama uno")
    .set({
        nombre: 'Oscar',
        edad: '19',
        sexo: 'M'
    })
}) */


firebase.database().ref("usuarios")
.on("child_added", function(snap){
    var user = snap.val();
    $('#root').append("<img width='100px' src='"+user.foto+"'/>");
})