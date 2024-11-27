const firebaseConfig = {
    apiKey: "AIzaSyClnQKDyqe_NO6QqeXY13m9htKVkhTwpxM",
    authDomain: "greentech-growers.firebaseapp.com",
    databaseURL: "https://greentech-growers-default-rtdb.firebaseio.com",
    projectId: "greentech-growers",
    storageBucket: "greentech-growers.firebasestorage.app",
    messagingSenderId: "514557998357",
    appId: "1:514557998357:web:8fbce40469b637ed52e51c",
    measurementId: "G-KQJF7KVFBE"
};

var ldr1;
var temperatura1;
var umidade1;

var ldr;
var temperatura;
var umidade;

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

function startArrow(){
    if(ldr<ldr1){
        document.getElementById("arrow").style = "transform: rotate(90deg); opacity: 0.7;"
    } else {
        document.getElementById("arrow").style = "transform: rotate(-90deg); opacity: 0.7;"
    }

    if(temperatura<temperatura1){
        document.getElementById("arrow2").style = "transform: rotate(90deg); opacity: 0.7;"
    } else {
        document.getElementById("arrow2").style = "transform: rotate(-90deg); opacity: 0.7;"
    }

    if(umidade<umidade1){
        document.getElementById("arrow3").style = "transform: rotate(90deg); opacity: 0.7;"
    } else {
        document.getElementById("arrow3").style = "transform: rotate(-90deg); opacity: 0.7;"
    }
}

function startFirebase() {
    const dbRef = database.ref("dados");

    dbRef.once("value")
        .then((snapshot) => {
            if (snapshot.exists()) {
                const oldLdr = ldr;
                const oldTemperatura = temperatura;
                const oldUmidade = umidade;

                // Atualiza com os novos valores
                ldr = snapshot.val().ldr;
                temperatura = snapshot.val().temperatura;
                umidade = snapshot.val().umidade;

                // Atualiza as variáveis antigas para a próxima comparação
                ldr1 = oldLdr;
                temperatura1 = oldTemperatura;
                umidade1 = oldUmidade;

                startArrow();

                document.getElementById("num-temp").textContent = temperatura;
                document.getElementById("num-umid").textContent = umidade;
                document.getElementById("num-lumi").textContent = ldr;
            } else {
                console.log("Nenhum dado encontrado.");
            }
        })
        .catch((error) => {
            console.error("Erro ao obter os valores:", error);
        });
}
startFirebase();