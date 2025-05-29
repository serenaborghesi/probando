const JUEGOS_MESA_URL = "./juegos.json";

function fetchJuegosMesaAPI() { 
    axios.get(JUEGOS_MESA_URL) 
        .then(response => { 
            console.log(response.data);  
            renderJuegosMesa(response.data);  
        })
        .catch(error => { 
            console.log(error);  
        });
}

fetchJuegosMesaAPI();

function renderJuegosMesa(juegosMesa) { 
    for (let i = 0; i < juegosMesa.length; i++) { 
        addElementDOM(juegosMesa[i]); 
    }
}

function addElementDOM(juegosMesa) { 
    const juegosMesaDiv = document.createElement("div"); 
    juegosMesaDiv.id = "my-element"; 

    const juegosMesaName = document.createElement("h2");
    juegosMesaName.innerHTML = juegosMesa["name"]; 

    const juegosMesaDescription = document.createElement("p");
    juegosMesaDescription.innerHTML = juegosMesa["description"];

    const juegosMesaDuration = document.createElement("p");
    juegosMesaDuration.innerHTML = juegosMesa["duration"];

    const juegosMesaImage = document.createElement("img");
    juegosMesaImage.src = "frontend/img/" + juegosMesa["image"];
    juegosMesaImage.width = 300;

    // Crear el botón
    const juegosMesaButton = document.createElement("button");
    juegosMesaButton.innerHTML = "Ver más";  // Texto del botón
    juegosMesaButton.classList.add("my-button");  // Puedes agregarle una clase para estilo

    // Redirigir al hacer clic en el botón
    juegosMesaButton.addEventListener("click", function() {
    // Redirige a la página con más detalles sobre el juego
    window.location.href = `detalle-juego.html?game=${encodeURIComponent(juegosMesa.name)}`;
});
 

    juegosMesaDiv.appendChild(juegosMesaName);
    juegosMesaDiv.appendChild(juegosMesaDescription);
    juegosMesaDiv.appendChild(juegosMesaDuration);
    juegosMesaDiv.appendChild(juegosMesaImage);
    juegosMesaDiv.appendChild(juegosMesaButton); // Agregar el botón al contenedor


    const juegosMesaContainer = document.getElementById("main-container"); 
    juegosMesaContainer.appendChild(juegosMesaDiv);
}
