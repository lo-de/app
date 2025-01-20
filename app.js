const nomsTableurs = [
    "Tutop_1",
    "Embase",
    "Tutop_2",
    "LXT",
    "OC11",
    "TCOC",
    "Evacu"
];

function createTableur(id) {
    const container = document.createElement('div');
    container.classList.add('tableur');
    container.innerHTML = `
        <label for="nom-${id}">Moule :</label>
        <input type="text" id="nom-${id}" value="${nomsTableurs[id-1]}" placeholder="Nom du tableur"><br>
        <label for="debut-${id}">Heure de début :</label>
        <input type="time" id="debut-${id}" required><br>
        <label for="intervalle-${id}">Tps remplissage en minutes :</label>
        <input type="number" id="intervalle-${id}" required><br>
        <button onclick="calculerTableur(${id})">Calculer l'heure de fin</button>
        <div class="result" id="result-${id}"></div>
    `;
    document.getElementById('tableurs').appendChild(container);
}

function calculerHeureFin(debut, intervalle) {
    let [heures, minutes] = debut.split(':').map(Number);
    minutes += intervalle;

    while (minutes >= 60) {
        minutes -= 60;
        heures += 1;
    }

    return `${String(heures).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function calculerTableur(id) {
    const debut = document.getElementById(`debut-${id}`).value;
    const intervalle = parseInt(document.getElementById(`intervalle-${id}`).value);
    const nom = document.getElementById(`nom-${id}`).value || nomsTableurs[id-1];

    if (!debut || isNaN(intervalle)) {
        alert("Veuillez entrer une heure de début et un temps de remplissage en minutes valides.");
        return;
    }

    const heureFin = calculerHeureFin(debut, intervalle);
    document.getElementById(`result-${id}`).textContent = `${nom} : Heure de fin : ${heureFin}`;
}

for (let i = 1; i <= 7; i++) {
    createTableur(i);
}
