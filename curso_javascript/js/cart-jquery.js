$(function () {

    $("#cart").on("click", function (e) {
        e.preventDefault();
        createCart();
        $("#closeCart").addClass("d-none");
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
            location.href = "shop.html";
        }, 1000);
    });


    $.getJSON("https://api.bluelytics.com.ar/v2/latest",
        (resp, status) => {

            if (status === "success") {

                let dv = JSON.stringify(resp.blue.value_avg);

                $("#dolarToday").text(dv)

            }

        }
    );

    $("#btn_pesos").on("click", function (e) {
        e.preventDefault();

        let totalCartARS = parseFloat(createCart());

        $("#totalCart").html("<span>Total: $" + totalCartARS.toFixed(2) + "</span>");
        $("#btn_pesos").removeClass("d-inline").addClass("d-none");
        $("#btn_dollar").removeClass("d-none").addClass("d-inline");

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
        $(".total").html("");
        $("#cartItems").append(`<div class="d-flex flex-column justify-content-center minh-100 align-items-center">
        <div class="spinner-border" role="status"></div>
        <span class="text-center text-dark fw-bold d-block mt-2 w-100">Procesando su pago...</span>
      </div>`);
      $(".modal-footer").hide();
      $(".total").hide();
      setTimeout(() => {
        $("#cartItems > div").remove();
        
        $("#cartItems").append(`<div class="d-flex flex-column justify-content-center minh-100 align-items-center">
        <span class="text-center text-dark fw-bold d-block mt-2 w-100">Su pago fue procesado correctamente.<br>¡Gracias por comprar en Tienda de Bebidas!</span>
        </div>`);
        $(".modal-content").append(`<div class="modal-footer">        
        <button type="button" id="closeCart" class="btn btn-dark rounded-0 d-none mx-auto" data-bs-dismiss="modal"><i class="fas fa-times me-2"></i> Cerrar</button>
        </div>`);
        
        
        $("#closeCart").removeClass("d-none");


          
      }, 3000);

        
    });

});

function createCart() {

    let cartItems = JSON.parse(localStorage.getItem('Carrito'));

    let totalCart = 0;

    $(".modal-footer").show();
    $(".total").show();

    if (cartItems) {

        $("#cartItems > div").remove();
        $("#emptyCart").attr("disabled", false);
        $("#checkout").attr("disabled", false);

        cartItems.forEach(p => {
            $("#cartItems").append(`<div class="d-block rounded border text-left px-4 py-2">
            <span>${(p.productInCart)}x&nbsp;${p.productPresentationPack}&nbsp;x${p.productPresentationQty}&nbsp;|&nbsp;${p.productType}&nbsp;${p.productName}-${p.productVariant}&nbsp;|&nbsp;${p.productPresentation}&nbsp;</span>
            <span class="d-block fw-bold">Subtotal: $${(p.productPrice)*(p.productPresentationQty)*(p.productInCart)}</span>
            </div>`);
            totalCart = totalCart + ((p.productPrice) * (p.productPresentationQty) * (p.productInCart));
        });

        //reset de cart
        $("#totalCart > span").remove();
        $("#btn_dollar").removeClass("d-none").addClass("d-inline");
        $("#btn_pesos").removeClass("d-inline").addClass("d-none");
        $("#totalCart").append("<span>Total: $" + totalCart.toFixed(2) + "</span>");


    } else {

        $(".total").addClass("d-none");

        $("#cartItems").append(`<div class="w-100 h-100 d-flex justify-content-center align-items-center">
        <h3 class="text-secondary my-auto text-center"><i class="fas fa-shopping-cart fa-2x"></i><br>No hay productos en el carrito</h3></div>`);
        $("#emptyCart").attr("disabled", true);
        $("#checkout").attr("disabled", true);

    }

    return totalCart

}