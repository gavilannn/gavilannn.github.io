//validar si esta almacenada la edad >18
const bodySelector = document.querySelector('body');

const userBornSave = localStorage.getItem('Cumpleaños');

if (userBornSave == null) {

    location.href = 'index.html';  

} else {

    bodySelector.classList.remove('d-none');

}

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
        $(".animate-banner.yes > h2").hide().fadeIn(1000);

    } else {
     pos = 0;
    }
      
  });


});