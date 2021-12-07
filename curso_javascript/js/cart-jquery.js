$(document).ready(function () {    

    $("#cart").click(function (e) { 
        e.preventDefault();
        createCart();
    });
    

    $("#emptyCart").click(function (e) {
        e.preventDefault();
        localStorage.removeItem('Carrito');
        localStorage.removeItem('listaActualizada'); 
        $("#cartItems > div").remove();
        $(".total").addClass("d-none");
        $("#cartItems").append(`<div class="w-100 h-100 d-flex justify-content-center align-items-center">
        <h3 class="text-secondary my-auto text-center"><i class="fas fa-shopping-cart fa-2x"></i><br>No hay productos en el carrito</h3></div>`);

        setTimeout(() => {
            location.href = "shop.html";   
        }, 1000);
    });

    dolarValue = [];

    $.ajax({
        type: "GET",
        url: "https://api-dolar-argentina.herokuapp.com/api/dolarblue",
        data: "array",
        dataType: "json",
        success: function (response) {

            console.log(response);
            
        }
    });

      

    console.log(dolarValue);

  
});



function createCart() {
    let cartItems = JSON.parse(localStorage.getItem('Carrito'));

    let totalCart = 0;


    if (cartItems) {

        $("#cartItems > div").remove();        

        cartItems.forEach(p => {
            $("#cartItems").append(`<div class="d-block rounded border text-left px-4 py-2">
            <span>${(p.productInCart)}x&nbsp;${p.productPresentationPack}&nbsp;x${p.productPresentationQty}&nbsp;|&nbsp;${p.productType}&nbsp;${p.productName}-${p.productVariant}&nbsp;|&nbsp;${p.productPresentation}&nbsp;</span>
            <span class="d-block fw-bold">Subtotal: $${(p.productPrice)*(p.productPresentationQty)*(p.productInCart)}</span>
            </div>`); 
            totalCart = totalCart + ((p.productPrice)*(p.productPresentationQty)*(p.productInCart));
        });

        $("#totalCart > span").text(totalCart);

    } else {

        $(".total").addClass("d-none");

        $("#cartItems").append(`<div class="w-100 h-100 d-flex justify-content-center align-items-center">
        <h3 class="text-secondary my-auto text-center"><i class="fas fa-shopping-cart fa-2x"></i><br>No hay productos en el carrito</h3></div>`);        

    }   


    
}




  







