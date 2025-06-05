var map = L.map('map').setView([-23.55052, -46.633308], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
    maxZoom: 19
}).addTo(map);


var pontosSeguranca = [
    {
        nome: "Delegacia de Polícia",
        coords: [-23.551, -46.634],
        descricao: "Ponto de segurança oficial com atendimento 24h."
    },
    {
        nome: "Hospital Municipal",
        coords: [-23.547, -46.635],
        descricao: "Local para primeiros socorros e apoio médico."
    },
    {
        nome: "Abrigo Comunitário",
        coords: [-23.553, -46.629],
        descricao: "Abrigo para situações emergenciais."
    },
    {
        nome: "Posto de Bombeiros",
        coords: [-23.555, -46.636],
        descricao: "Assistência em casos de incêndio e emergência."
    }
];

var marcadores = pontosSeguranca.map(function(ponto) {
    return L.marker(ponto.coords).bindPopup(
        "<b>" + ponto.nome + "</b><br>" + ponto.descricao
    );
});

var rotaSeguranca = L.polyline(
    pontosSeguranca.map(function(p) { return p.coords; }),
    { color: 'green', weight: 5, opacity: 0.7 }
);

var rotaVisivel = false;

function toggleRota() {
    if (!rotaVisivel) {
        marcadores.forEach(function(m) {
            m.addTo(map);
        });
        rotaSeguranca.addTo(map);
        
        var grupoPontos = L.featureGroup(marcadores);
        map.fitBounds(grupoPontos.getBounds().pad(0.2));

        rotaVisivel = true;
    } else {
        marcadores.forEach(function(m) {
            map.removeLayer(m);
        });
        map.removeLayer(rotaSeguranca);

        map.setView([-23.55052, -46.633308], 13);

        rotaVisivel = false;
    }
}

document.getElementById('btnToggleRota').addEventListener('click', toggleRota);
