let url = "https://restcountries.eu/rest/v2/name/"
let input;
/*Nombre del país
ii. Capital
iii. Imagen de su bandera
iv. Población
v. Región
vi. Zonas horarias
vii. Países con los que colinda
*/
function countrys(pais){
    console.log(url + (pais));
    $.ajax({
        url : (url +pais),
        method : 'GET',
        dataType : 'json',
        success : function( responseJSON ){
            console.log(responseJSON);
            displayResults( responseJSON);
            console.log(url+'${pais}');
        },
        error : function( err ){
            console.log( err );
        }
    });
}

function displayResults(json){
    let resultados = document.getElementsByClassName('js-search-results');
    for(let i = 0;i<resultados.length();i++){
        resultados[i].append(`
        <div>
        <div>Nombre del Pais: ${json.name.value}</div>
        <div>Capital:${json.capital.value} </div>
        <img src="${json.flag.value}" alt="Bandera pais">
        <div>Poblacion: ${json.population.value} </div>
        <div>Region:${json.region.value} </div>
        <div>Zonas Horarias: ${json.timezones.value}</div>
        <div>Paises con los que colinda: ${json.borders.value}</div>
      </div>
        `)
    }
}
function watchForm(){
    let form = document.getElementById("countryForm");
    form.addEventListener('click',event=>{
        event.preventDefault();
        input = $('#query').val();
        console.log(input);
        countrys(input);
    });
    
}

function init(){
    watchForm();
}
init();