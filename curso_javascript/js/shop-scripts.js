//validar si esta almacenada la edad >18
const bodySelector = document.querySelector('body');

const userBornSave = localStorage.getItem('Cumpleaños');

if (userBornSave == null) {

    location.href = 'index.html';  

} else {

    bodySelector.classList.remove('d-none');

}

const currentDate = new Date();
const postYear = document.getElementById('year');
postYear.innerHTML = currentDate.getFullYear();

//filtro searchbar y botones

let searchBar = document.querySelector("#searchBar");
let list = document.querySelectorAll("#productList > div");
let prodTitle = document.querySelector("#productTitle > div > h2");
let matchesText = document.querySelector(".matchesText");


const btnBeer = document.getElementById('btn_beer');
const btnWine = document.getElementById('btn_wine');
const btnWhisky = document.getElementById('btn_whisky');
const btnGin = document.getElementById('btn_gin');
const btnVodka = document.getElementById('btn_vodka');
const btnAll = document.getElementById('btn_all');


btnBeer.addEventListener('click', (e) => {
      e.preventDefault();
      filterDrinks("Cerveza","Cerveza","Cervezas")
}); 

btnWine.addEventListener('click', (e) => {
  e.preventDefault();
  filterDrinks("Vino","Champagne","Vinos y Champagnes")
}); 

btnWhisky.addEventListener('click', (e) => {
  e.preventDefault();
  filterDrinks("Whisky","Whisky","Whiskies")
}); 

btnGin.addEventListener('click', (e) => {
  e.preventDefault();
  filterDrinks("Gin","Gin","Gines")
}); 

btnVodka.addEventListener('click', (e) => {
  e.preventDefault();
  filterDrinks("Vodka","Vodka","Vodkas")
}); 

btnAll.addEventListener('click', (e) => {
  e.preventDefault();
  filterDrinks("","","Catálogo completo")
}); 


searchBar.addEventListener('keyup', (e) => {
  e.preventDefault();
  searchForDrinks();  

}); 

function searchForDrinks(){

window.scroll({ top: 300, left: 0, behavior: 'smooth' });

let searchBarVal = document.querySelector("#searchBar").value.toLowerCase();
let displayCounter = 0;

prodTitle.innerHTML = "Resultados de búsqueda";


list.forEach((reset) => {
  reset.classList.remove("d-none") ;
  reset.classList.remove("matched") ;
});


if (searchBarVal) {

  if (searchBarVal.length < 3) {
    matchesText.innerHTML = "Ingrese más caracteres para poder realizar una búsqueda";

    list.forEach((clean) => {
          clean.classList.add("d-none") ;
    });
    
  } else {

    list.forEach((matches) => {
      if ((matches.innerHTML.toLowerCase()).includes(searchBarVal)){
          matches.classList.add("matched") ;
      } else {
          matches.classList.add("d-none") ;
      }
  
      if (matches.classList.contains("matched")){
         displayCounter++;
      }
    });

    if (displayCounter === 0){
      matchesText.innerHTML = "No hay productos que coincidan con su búsqueda";
        
    } else {
      matchesText.innerHTML = `Se encontraron<strong> ${displayCounter} resultado/s</strong> que coinciden con su búsqueda`;
    }    
  }
  
} else {

  matchesText.innerHTML = "";
  prodTitle.innerHTML = "Catálogo completo";

}

}

function filterDrinks(a,b,titulo){

  window.scroll({ top: 300, left: 0, behavior: 'smooth' });

  matchesText.innerHTML = "";


  list.forEach((reset) => {
    reset.classList.remove("d-none") ;
    reset.classList.remove("matched") ;
  });

  prodTitle.innerHTML = titulo;

  
    list.forEach((p) => {
      if (p.innerHTML.includes(a) || p.innerHTML.includes(b)) {
          p.classList.add("matched") ;
      } else {
          p.classList.add("d-none") ;
      }
    });

}

//funciones jquery

$(function () {

  $(".animate-banner.yes > h2").hide().fadeIn(1000);
  

  $(".animate-banner").eq(1).addClass("not");
  $(".animate-banner").eq(2).addClass("not");

    let pos = 0; 
    let lenghtBanner = parseInt($(".animate-banner").length) - 1;

  $("#next-banner").on("click", function (e) {

    e.preventDefault();
    
    if ((pos >= 0) && (pos < lenghtBanner)) {        
        pos = pos + 1; 
        
        $(".animate-banner.yes").addClass("not").removeClass("yes");    
        $(".animate-banner.not").eq(pos).addClass("yes").removeClass("not");
        $(".animate-banner.yes > h2").hide().fadeIn(1000);


    }

  });

  $("#prev-banner").on("click", function (e) {

    e.preventDefault();
    
    if ((pos > 0)) {
        pos = pos - 1; 

        $(".animate-banner.yes").addClass("not").removeClass("yes");    
        $(".animate-banner.not").eq(pos).addClass("yes").removeClass("not");
        $(".animate-banner.yes > h2").hide().fadeIn(500);

    } else {
     pos = 0;
    }
      
  });

  $(".nav-link").on("click", function (e) {
  
    e.preventDefault();
    
    $(".matched").hide().fadeIn(1000);
      
  }); 

});
