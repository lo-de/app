const nomsTableurs = [
    "Tutop_1",
    "Embase",
    "Tutop_2",
    "LXT",
    "OC11",
    "TCOC",
    "Emvacu"
];

const tempsRemplissage = [
    10, // Temps en minutes pour Tutop_1
    15, // Temps en minutes pour Embase
    20, // Temps en minutes pour Tutop_2
    25, // Temps en minutes pour LXT
    30, // Temps en minutes pour OC11
    35, // Temps en minutes pour TCOC
    40  // Temps en minutes pour Emvacu
];

// Fonction pour sauvegarder les résultats dans localStorage
function sauvegarderResultats(id, resultat) {
    let resultats = JSON.parse(localStorage.getItem('resultatsTableurs')) || {};
    resultats[id] = resultat;
    localStorage.setItem('resultatsTableurs', JSON.stringify(resultats));
}

// Fonction pour charger les résultats depuis localStorage
function chargerResultats() {
    return JSON.parse(localStorage.getItem('resultatsTableurs')) || {};
}

// Fonction pour supprimer un résultat spécifique de localStorage
function supprimerResultat(id) {
    let resultats = JSON.parse(localStorage.getItem('resultatsTableurs')) || {};
    delete resultats[id];
    localStorage.setItem('resultatsTableurs', JSON.stringify(resultats));
}

function createTableur(id) {
    const container = document.createElement('div');
    container.classList.add('tableur');
    container.innerHTML = `
        <label><span>${nomsTableurs[id - 1]}</span></label><br>
        <label for="debut-${id}">Heure de début :</label>
        <input type="time" id="debut-${id}" required><br>
        <label>Temps de remplissage (minutes) : <span>${tempsRemplissage[id - 1]}</span></label><br>
        <button onclick="calculerTableur(${id})">Calculer l'heure de fin</button>
        <button onclick="reinitialiserTableur(${id})">Réinitialiser</button>
        <div class="result" id="result-${id}"></div>
    `;
    document.getElementById('tableurs').appendChild(container);

    // Charger les résultats sauvegardés pour ce tableur (si disponibles)
    const resultats = chargerResultats();
    if (resultats[id]) {
        document.getElementById(`result-${id}`).textContent = resultats[id];
    }
}

function calculerHeureFin(debut, intervalle) {
    let [heures, minutes] = debut.split(':').map(Number);
    minutes += intervalle;

    heures += Math.floor(minutes / 60);
    minutes %= 60;

    return `${String(heures).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

function calculerTableur(id) {
    const debutInput = document.getElementById(`debut-${id}`);
    const nom = nomsTableurs[id - 1];
    const intervalle = tempsRemplissage[id - 1];

    const debut = debutInput.value;

    if (!debut) {
        alert("Veuillez entrer une heure de début.");
        return;
    }

    const heureFin = calculerHeureFin(debut, intervalle);
    const resultat = `${nom} : Heure de fin : ${heureFin}`;
    document.getElementById(`result-${id}`).textContent = resultat;

    // Sauvegarder le résultat
    sauvegarderResultats(id, resultat);
}

function reinitialiserTableur(id) {
    // Supprimer le résultat sauvegardé
    supprimerResultat(id);

    // Effacer l'affichage du résultat
    document.getElementById(`result-${id}`).textContent = '';
}

function initTableurs() {
    for (let i = 1; i <= nomsTableurs.length; i++) {
        createTableur(i);
    }
}

// Initialisation
initTableurs();
