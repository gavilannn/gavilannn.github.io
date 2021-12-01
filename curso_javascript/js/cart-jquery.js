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
        $("#cartItems").append(`<div class="w-100 h-100 d-flex justify-content-center align-items-center">
        <h3 class="text-secondary my-auto text-center"><i class="fas fa-shopping-cart fa-2x"></i><br>No hay productos en el carrito</h3></div>`);

        setTimeout(() => {
            location.href = "shop.html";   
        }, 1000);
    });

});



function createCart() {
    let cartItems = JSON.parse(localStorage.getItem('Carrito'));

    if (cartItems) {

        cartItems.forEach(p => {
            $("#cartItems").append(`<div class="d-block rounded border text-left px-4 py-2">
            <span>${(p.productInCart)}x${p.productType}&nbsp;${p.productName}-${p.productVariant}&nbsp;|&nbsp;${p.productPresentation}&nbsp;|&nbsp;${p.productPresentationPack}&nbsp;x${p.productPresentationQty}</span>
            <span class="d-block fw-bold">Subtotal: $${(p.productPrice)*(p.productPresentationQty)*(p.productInCart)}</span>
            </div>`);        
        });

    } else {

        $("#cartItems").append(`<div class="w-100 h-100 d-flex justify-content-center align-items-center">
        <h3 class="text-secondary my-auto text-center"><i class="fas fa-shopping-cart fa-2x"></i><br>No hay productos en el carrito</h3></div>`);        

    }   
    
}




  







