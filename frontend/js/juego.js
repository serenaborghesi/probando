const JUEGOS_MESA_URL = "../juegos.json";  

// Obtener el nombre del juego desde la URL (por ejemplo, ?game=Catan)
const params = new URLSearchParams(window.location.search);
const gameName = params.get("game");

function fetchJuegoDetails() {
    axios.get(JUEGOS_MESA_URL)
        .then(response => {
            const juegosMesa = response.data;
            const juego = juegosMesa.find(j => j.name === gameName);  // Buscar el juego por nombre
            if (juego) {
                renderJuegoDetail(juego);
            } else {
                document.getElementById('main-container').innerHTML = "<h2>Juego no encontrado</h2>";
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// const juego = juegosMesa.find(j => j.name === gameName): Usamos el método find para buscar el juego dentro del arreglo de juegos que coincida con el nombre extraído de la URL (gameName).
// Si se encuentra el juego, se llama a la función renderJuegoDetail(juego) para renderizar los detalles del juego en el DOM.

function renderJuegoDetail(juego) { // Esta función se encarga de crear y agregar al DOM todos los elementos HTML necesarios para mostrar los detalles del juego
    const juegoDetailDiv = document.createElement("div");
    juegoDetailDiv.classList.add("juego-detail"); // juegoDetailDiv.classList.add("juego-detail"): Le agrega una clase CSS al div para poder estilizarlo en tu archivo CSS.

    // Nombre del juego
    const juegoName = document.createElement("h2");
    juegoName.innerHTML = juego.name;

    // Descripción del juego
    const juegoDescription = document.createElement("p");
    juegoDescription.innerHTML = juego.description;

    // Duración del juego
    const juegoDuration = document.createElement("p");
    juegoDuration.innerHTML = `<strong>Duración:</strong> ${juego.duration}`; // El strong es para que la palabra aparezca en negrita


    // Imagen del juego
    const juegoImage = document.createElement("img");
    juegoImage.src = "frontend/img/" + juego.image;
    juegoImage.alt = juego.name;
    juegoImage.width = 400;  // Ajusta el tamaño según lo necesites

    // Historia del juego
    const juegoHistory = document.createElement("h3");
    juegoHistory.innerHTML = "Historia";
    const juegoHistoryText = document.createElement("p");
    juegoHistoryText.innerHTML = juego.history || "No disponible.";

    // Estrategias del juego
    const juegoStrategies = document.createElement("h3");
    juegoStrategies.innerHTML = "Estrategias";
    const juegoStrategiesText = document.createElement("p");
    juegoStrategiesText.innerHTML = juego.strategies || "No disponible.";

    // Curiosidades del juego
    const juegoCuriosities = document.createElement("h3");
    juegoCuriosities.innerHTML = "Curiosidades";
    const juegoCuriositiesList = document.createElement("ul");
    if (juego.curiosities && juego.curiosities.length > 0) {
        juego.curiosities.forEach(curiosity => {
            const listItem = document.createElement("li");
            listItem.innerHTML = curiosity;
            juegoCuriositiesList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement("li");
        listItem.innerHTML = "No disponible.";
        juegoCuriositiesList.appendChild(listItem);
    }

    // Agregar todo al contenedor del detalle
    juegoDetailDiv.appendChild(juegoName);
    juegoDetailDiv.appendChild(juegoDescription);
    juegoDetailDiv.appendChild(juegoDuration);
    juegoDetailDiv.appendChild(juegoImage);
    juegoDetailDiv.appendChild(juegoHistory);
    juegoDetailDiv.appendChild(juegoHistoryText);
    juegoDetailDiv.appendChild(juegoStrategies);
    juegoDetailDiv.appendChild(juegoStrategiesText);
    juegoDetailDiv.appendChild(juegoCuriosities);
    juegoDetailDiv.appendChild(juegoCuriositiesList);

    const mainContainer = document.getElementById("main-container");
    mainContainer.appendChild(juegoDetailDiv);
}

fetchJuegoDetails();
