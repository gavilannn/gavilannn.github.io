$(function () {

    $("#cart").on("click", function (e) {
        e.preventDefault();
        createCart();
    });

    $("#emptyCart").on("click", function (e) {
        e.preventDefault();
        localStorage.removeItem('Carrito');
        localStorage.removeItem('listaActualizada');
        $("#cartItems > div").remove();
        $(".total").addClass("d-none");
        $("#cartItems").append(`<div class="w-100 h-100 d-flex justify-content-center align-items-center">
        <h3 class="text-secondary my-auto text-center"><i class="fas fa-shopping-cart fa-2x"></i><br>No hay productos en el carrito</h3></div>`);

        setTimeout(() => {
            $(".modal").hide();
            location.reload();
        }, 1000);
    });

    $.ajax({
        url: 'https://api.bluelytics.com.ar/v2/latest',
        dataType: 'json',
        success: function( data ) {
            let dv = JSON.stringify(data.blue.value_avg);

            $("#dolarToday").text(dv)
        },
        error: function( data ) {
            $("#pagoUsd").html("<i class=\"fas fa-exclamation-triangle fs-4 me-2\"></i><strong>IMPORTANTE: </strong>No se pudo leer la cotización del día. El pago en USD no está disponible");
        }
      });


    $("#btn_pesos").on("click", function (e) {
        e.preventDefault();

        let totalCartARS = parseFloat(createCart());

        $("#totalCart").html("<span>Total: $" + totalCartARS.toFixed(2) + "</span>");
        $("#btn_pesos").removeClass("d-inline").addClass("d-none");
        $("#btn_dollar").removeClass("d-none").addClass("d-inline");

    });


    $("#btnCloseModal").on("click", function (e) {
        e.preventDefault();
        location.reload();       
    });


    $("#btn_dollar").on("click", function (e) {

        e.preventDefault();

        let totalCartARS = parseFloat(createCart());

        let todayUSDVal = parseFloat($("#dolarToday").text());

        let totalCartUSD = parseFloat(totalCartARS / todayUSDVal);

        $("#totalCart").html("<span>Total: U$D" + totalCartUSD.toFixed(2) + "</span>");
        $("#btn_dollar").removeClass("d-inline").addClass("d-none");
        $("#btn_pesos").removeClass("d-none").addClass("d-inline");

    });

    $("#checkout").on("click", function (e) {
        e.preventDefault();
        $("#cartItems > div").remove();
        $(".modal-footer").hide();
        $(".total").hide();
        $("#cartItems").append(`<div class="d-flex flex-column justify-content-center minh-100 align-items-center">
        <div class="spinner-border" role="status"></div>
            <span class="text-center text-dark fw-bold d-block mt-2 w-100">Procesando su pago...</span>
        </div>`);
        localStorage.removeItem('Carrito');
        localStorage.removeItem('listaActualizada');       
        setTimeout(() => {
            $("#cartItems > div").remove();

            $("#cartItems").append(`<div class="d-flex flex-column justify-content-center minh-100 align-items-center">
        <span class="text-center text-dark fw-bold d-block mt-2 w-100">Su pago fue procesado correctamente.<br>¡Gracias por comprar en Tienda de Bebidas!</span>
        </div>`);
            $(".modal-content").append(`<div class="modal-footer closeCart">        
        <button type="button" id="closeCart" class="btn btn-dark rounded-0 mx-auto" data-bs-dismiss="modal"><i class="fas fa-times me-2"></i> Cerrar</button>
        </div>`);

        $("#closeCart").on("click", function (e) {
            e.preventDefault();
            location.reload();         
        });

        }, 3000);


    });

    

    

});

function createCart() {

    let cartItems = JSON.parse(localStorage.getItem('Carrito'));

    let totalCart = 0;

    if (cartItems) {

        $(".modal-footer").show();
        $(".total").show();
        $(".closeCart").hide();
        $("#cartItems > div").remove();
        $("#emptyCart").attr("disabled", false);
        $("#checkout").attr("disabled", false);

        cartItems.forEach(p => {
            $("#cartItems").append(`<div class="d-flex w-100 justify-items-start  rounded border-bottom text-left px-4 py-3">
            <div class="w50-px h50-px float-start position-relative me-5 ">
                <span class="position-absolute top-100 start-100 translate-middle badge rounded-pill bg-success">${(p.productInCart)}</span>
                <img src="./img/products/${(p.productSKU)}.jpg" class="img-cover float-start me-5 h50-px w50-px">
            </div>
            <div>            
                <span>${p.productType}&nbsp;${p.productName}-${p.productVariant}&nbsp;|&nbsp;${p.productPresentation}&nbsp;|&nbsp;${p.productPresentationPack}&nbsp;x${p.productPresentationQty}</span>
                <span class="d-block fw-bold">Subtotal: $${(p.productPrice)*(p.productPresentationQty)*(p.productInCart)}</span>
            </div>
            </div>`);
            totalCart = totalCart + ((p.productPrice) * (p.productPresentationQty) * (p.productInCart));
        });

        //reset de cart
        $("#totalCart > span").remove();
        $("#btn_dollar").removeClass("d-none").addClass("d-inline");
        $("#btn_pesos").removeClass("d-inline").addClass("d-none");
        $("#totalCart").append("<span>Total: $" + totalCart.toFixed(2) + "</span>");


    } else {

        $(".total").hide();
        $(".closeCart").hide();
        $("#cartItems").append(`<div class="w-100 h-100 d-flex justify-content-center align-items-center">
        <h3 class="text-secondary my-auto text-center"><i class="fas fa-shopping-cart fa-2x"></i><br>No hay productos en el carrito</h3></div>`);
        $("#emptyCart").attr("disabled", true);
        $("#checkout").attr("disabled", true);

    }

    return totalCart

}