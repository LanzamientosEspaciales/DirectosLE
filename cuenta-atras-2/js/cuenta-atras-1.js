var countdownElement = document.getElementById('cuentaAtras');
let countDownDate, nombreMision, coheteAUsar, hold, scrub, abort, anomalia, exito;

// Inicialización Firebase (ejemplo):
firebase.initializeApp({
  apiKey: "AIzaSyDIT7aJdzG6TcybE-Yi3zmv1Un9oAmSW9Q",
  authDomain: "directosle-964f0.firebaseapp.com",
  projectId: "directosle-964f0",
  storageBucket: "directosle-964f0.firebasestorage.app",
  messagingSenderId: "704068764497",
  appId: "1:704068764497:web:11a70dd15586800469c970"
});
const db = firebase.firestore();


// Referencia a Firestore
const docId = 'cuenta-regresiva-2';

function fetchConfig() {
  return db.collection('contadores').doc(docId).get()
    .then(doc => {
      if (!doc.exists) throw new Error('Documento no encontrado');
      const contador = doc.data();
      countDownDate = new Date(`${contador.fecha} ${contador.hora}`).getTime();
      nombreMision = contador.mision;
      coheteAUsar = contador.cohete;
      hold = contador.status.hold;
      scrub = contador.status.scrub;
      abort = contador.status.abort;
      anomalia = contador.status.anomalia;
      exito = contador.status.exito;

      document.getElementById('missionName').textContent = nombreMision;
    })
    .catch(error => {
      console.error('Error al obtener datos de Firestore:', error);
      countdownElement.innerHTML = "Error al cargar datos";
    });
}

const cuentaAtras = document.getElementById('cuentaAtras');
const clasesEstado = ['status-verde', 'status-naranja', 'status-rojo'];

function startCountdown() {
  var x = setInterval(function() {
    fetchConfig().then(() => {
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var hours = Math.floor(distance / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Limpio clases de estado
      clasesEstado.forEach(clase => cuentaAtras.classList.remove(clase));

      if (distance > 0) {
        if (scrub === true) {
          cuentaAtras.textContent = "CANCELADO";
          cuentaAtras.style.backgroundColor = "rgb(255, 0, 0)";
          cuentaAtras.classList.add("status-rojo");
        } else if (abort === true) {
          cuentaAtras.textContent = "ABORTO";
          cuentaAtras.style.backgroundColor = "rgb(255, 0, 0)";
          cuentaAtras.classList.add("status-rojo");
        } else if (hold === true) {
          cuentaAtras.textContent = "HOLD";
          cuentaAtras.style.backgroundColor = "rgb(197, 90, 17)";
          cuentaAtras.classList.add("status-naranja");
        } else if (anomalia === true) {
          cuentaAtras.textContent = "ANOMALIA";
          cuentaAtras.style.backgroundColor = "rgb(255, 0, 0)";
          cuentaAtras.classList.add("status-rojo");
        } else {
          cuentaAtras.textContent = "T-" + formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
          cuentaAtras.style.backgroundColor = "rgb(0, 62, 158)";
        }
      } else {
        var elapsed = -distance + 1000;
        var elapsedHours = Math.floor(elapsed / (1000 * 60 * 60));
        var elapsedMinutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        var elapsedSeconds = Math.floor((elapsed % (1000 * 60)) / 1000);

        if (scrub === true) {
          cuentaAtras.textContent = "CANCELADO";
          cuentaAtras.style.backgroundColor = "rgb(255, 0, 0)";
          cuentaAtras.classList.add("status-rojo");
        } else if (abort === true) {
          cuentaAtras.textContent = "ABORTO";
          cuentaAtras.style.backgroundColor = "rgb(255, 0, 0)";
          cuentaAtras.classList.add("status-rojo");
        } else if (hold === true) {
          cuentaAtras.textContent = "HOLD";
          cuentaAtras.style.backgroundColor = "rgb(197, 90, 17)";
          cuentaAtras.classList.add("status-naranja");
        } else if (anomalia === true) {
          cuentaAtras.textContent = "ANOMALIA";
          cuentaAtras.style.backgroundColor = "rgb(255, 0, 0)";
          cuentaAtras.classList.add("status-rojo");
        } else if (exito === true) {
          cuentaAtras.textContent = "ÉXITO";
          cuentaAtras.style.backgroundColor = "rgb(0, 255, 0)";
          cuentaAtras.classList.add("status-verde");
        } else {
          cuentaAtras.textContent = "T+" + formatTime(elapsedHours) + ":" + formatTime(elapsedMinutes) + ":" + formatTime(elapsedSeconds);
          cuentaAtras.style.backgroundColor = "rgb(0, 62, 158)";
        }
      }
    });
  }, 1000);
}

function formatTime(time) {
  return time < 10 ? "0" + time : time;
}

// Arrancar cuenta atrás
startCountdown();
