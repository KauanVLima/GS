var map = L.map('map').setView([-23.55052, -46.633308], 13); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',  
    maxZoom: 19  
}).addTo(map);

var marcadorUsuario = L.marker([0, 0]);  
marcadorUsuario.addTo(map);

function atualizarLocalizacao() {
    if (navigator.geolocation) {  
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;   
            var lon = position.coords.longitude;  

            marcadorUsuario.setLatLng([lat, lon]); 
            map.setView([lat, lon], 15);  

            alert("Localização atualizada!"); 
        }, function () {
            alert("Não foi possível obter sua localização.");  
        });
    } else {
        alert("Geolocalização não é suportada pelo seu navegador."); 
    }
}


document.getElementById('btnAtualizar').addEventListener('click', atualizarLocalizacao);

atualizarLocalizacao();
