var map = L.map(document.getElementById('Mapa'), {center: [41.309486, -7.704827], zoom: 10});



// Base maps
var osm = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),
	baserelief = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {});
    ortofotomapa = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',{ attribution:'<a href="https://www.esri.com/en-us/home"</a>©️ESRI_Imaginary' });


// Icon Instabilidades
var MyIcon1 = L.icon({
    iconUrl: 'Alerta.png',
    iconSize: [20, 20] // size of the icon
});

//Icon Estaçoes metereologicas  

var MyIcon2 = L.icon({
    iconUrl: 'Metereologia.png',
    iconSize: [25, 25]
})

//Icon Solo  

var MyIcon3 = L.icon({
    iconUrl: 'Solo.png',
    iconSize: [20, 20]
})

// Dados Cabeceiras//
var cabeceiras = L.geoJSON(cabeceiras, {
    fillColor:"#484A1E", 
    fillOpacity:0.5, 
    color:"#000000",
    weight: 1, onEachFeature: function(feature, layer){
    layer.bindPopup("<strong>Freguesia: </strong>"+feature.properties.Freguesia+"<br><strong>Área: </strong>"+feature.properties.Area + "km2");}});
    cabeceiras.addTo(map);

  
var redehidrografica = L.geoJSON(redehidrografica, {
    color:'blue',
    weight: 1}); 
    redehidrografica.addTo(map);

var Estaçao = L.geoJSON(estaçoes, {pointToLayer: function(feature,latlng){
    return L.marker(latlng,{icon: MyIcon2});},
    color: 'Red', onEachFeature: function(feature, layer){
    layer.bindPopup("<strong>Local: </strong>"+feature.properties.Local+ "<br><strong>Altitude: </strong>"+ feature.properties.Atura + "<br><strong>Link: </strong>"+ feature.properties.Link + "<br><strong>Operação: </strong>"+ feature.properties.Funci + "<br><strong>Código: </strong>"+ feature.properties.Ccode);}});

    Estaçao.addTo(map);
    

var Instabilidades = L.geoJSON(instabilidade, {pointToLayer: function(feature,latlng){
    return L.marker(latlng,{icon: MyIcon1});},

    color: 'blue', onEachFeature: function(feature, layer){ 
    layer.bindPopup("<strong>NOME: </strong>"+feature.properties.Name+"<br><strong>LOCALIZAÇÃO: </strong>"+feature.properties.local + '<br><img src ="' + feature.properties.Link +'"style="width: 120px; height:130px;">'
    );}});
    Instabilidades.addTo(map);
/*
// HEATMAP Cabeceiras //
*/
var heatMapPoints = [];
var pontos = L.geoJSON(instabilidade, {
    onEachFeature: function (feature){
        heatMapPoints.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
    }
});
var heat = L.heatLayer(heatMapPoints,{
    minOpacity: 0.4,
    radius: 25,
    gradient: {0.4: 'blue', 0.5: 'lime', 0.6: 'red'}}).addTo(map);



var Estradas = L.geoJSON(estradas, {
    color:'red',weight: 2, onEachFeature: function(feature, layer){
    layer.bindTooltip("<strong>NOME: </strong>"+feature.properties.Name+"<br><strong>LOCALIZAÇÃO: </strong>"+feature.properties.Localiz);}});
    Estradas.addTo(map); 

//INFORMAÇAO QUINTA//


var Quinta = L.geoJSON(quinta, {
    fillColor:"rgb(199, 243, 245)", 
    fillOpacity:0.5, 
    onEachFeature: function(feature, layer){ 
    layer.bindPopup("<strong>NOME: </strong>"+feature.properties.Nome+"<br><strong>Área: </strong>"+feature.properties.Area + "km2");}});
    Quinta.addTo(map);


var Terreno = L.geoJSON(solo, {pointToLayer: function(feature,latlng){
    return L.marker(latlng,{icon: MyIcon3});},
    
    color: 'blue', onEachFeature: function(feature, layer){ 
    layer.bindPopup("<strong>Talhão: </strong>"+feature.properties.Talhão+"<br><strong>Amostra: </strong>"+feature.properties.Amostra_1 +"<br><strong>Peso Seco: </strong>"+feature.properties.Peso_Seco_+"gr" +"<br><strong>Peso Húmido: </strong>"+feature.properties.Peso_1_gr + "gr" +"<br><strong>Profundidade de Medição: </strong>"+feature.properties.profundida +"cm" +"<br><strong>Tipo de vale: </strong>"+feature.properties.Tipo +"<br><strong>Ponto de equilíbrio: </strong>"+feature.properties.Ponto_de_E + "cm2" +"<br><strong>Altitude do ponto: </strong>"+feature.properties.Alitude_m +"m" );}});
    Instabilidades.addTo(map);

// HeatMap Quinta//    
var heatMapPoints = [];
var pontos = L.geoJSON(solo, {
    onEachFeature: function (feature){
        heatMapPoints.push([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]);
    }
});
var heat2 = L.heatLayer(heatMapPoints,{
    minOpacity: 0.4,
    radius: 25,
    gradient: {0.4: 'blue', 0.5: 'lime', 0.6: 'red'}}).addTo(map);


var Parcelas = L.geoJSON(talhoes, {
    fillColor:"#484A1E", 
    fillOpacity:0.3,
    weight: 1,
    onEachFeature: function(feature, layer){ 
    layer.bindPopup("<strong>Talhão: </strong>"+feature.properties.TALHAO+"<br><strong>Área: </strong>"+feature.properties.Area + "m2" +"<br><strong>Ano de Plantação: </strong>"+feature.properties.ANOPLANTAS);}});
    Parcelas.addTo(map);
    

/*variaveis*/

var baseMaps = {
    "Mapa Base": osm,
    "Mapa de Elevação": baserelief, 
    "Ortofotomapa": ortofotomapa,
};

var overlays =  {//add any overlays here
    "Cabeceiras": cabeceiras,
    "Rede Hidrográfica": redehidrografica,
    "Estação Metereológica": Estaçao,
    "Mapa de calor 1": heat,
    "Instabilidades": Instabilidades,
    "Estradas": Estradas,

    "Quinta do Seixo": Quinta,
    "Locais de Amostra": Terreno,
    "Mapa de Calor 2": heat2,
    "Parcelas": Parcelas,
    
};



L.control.layers(baseMaps,overlays, {position: 'topright'}).addTo(map);

baseMaps["Mapa Base"].addTo(map);





