class Product {
    constructor(productSKU, productName, productType, productVariant, productPresentation, productPresentationPack, productPresentationQty, productPrice, productInCart) {
        this.productSKU = productSKU;
        this.productName = productName;
        this.productType = productType;
        this.productVariant = productVariant;
        this.productPresentation = productPresentation;
        this.productPresentationPack = productPresentationPack;
        this.productPresentationQty = productPresentationQty;
        this.productPrice = productPrice;
        this.productInCart = productInCart;
    }
}

let productList = [];

//selectores de elementos
const productWrapper = document.getElementById('productList');
const itemCount = document.getElementById('itemsCount');

// construccion lista de productos
if (localStorage.getItem('listaActualizada')) {

    productList = JSON.parse(localStorage.getItem('listaActualizada'));
    itemCount.innerHTML = '(' + cartCounter() + ')';

    productList.forEach(p => {
        createDivProd(p.productSKU, p.productName, p.productType, p.productVariant, p.productPresentation, p.productPresentationPack, p.productPresentationQty, p.productPrice, p.productInCart);
    });


} else {

    const catalogUrl = new Request('catalogo.json');

    fetch(catalogUrl)
        .then(response => response.json())
        .then(data => {
            for (const p of data.products) {
                addProducts(p.productSKU, p.productName, p.productType, p.productVariant, p.productPresentation, p.productPresentationPack, p.productPresentationQty, p.productPrice, p.productInCart);

                createDivProd(p.productSKU, p.productName, p.productType, p.productVariant, p.productPresentation, p.productPresentationPack, p.productPresentationQty, p.productPrice, p.productInCart);

            }
        });

}

// Aumentar y disminuir productos / Array con los valores de los input, luego almacena las modificaciones

setTimeout(() => {

    const prodLoop = document.querySelectorAll('.product-card');
    const btnAdd = document.querySelectorAll('.add');
    const btnRem = document.querySelectorAll('.rem');
    const inputQty = document.querySelectorAll('.inputQty');

    console.log(prodLoop);

    for (let i = 0; i < prodLoop.length; i++) {

        prodLoop[i].classList.remove('d-none');

        btnAdd[i].addEventListener('click', (e) => {
            e.preventDefault();

            let modValueAdd = parseInt(productList[i].productInCart) + 1;
            productList[i].productInCart = modValueAdd;
            inputQty[i].setAttribute('value', modValueAdd);
            itemCount.innerHTML = '(' + cartCounter() + ')';
            AddToCart();

        });

        btnRem[i].addEventListener('click', (e) => {
            e.preventDefault();
            if (productList[i].productInCart <= 0) {
                productList[i].productInCart = 0;
            } else {
                let modValueRem = productList[i].productInCart - 1;
                productList[i].productInCart = modValueRem;
                inputQty[i].setAttribute('value', modValueRem);
                itemCount.innerHTML = '(' + cartCounter() + ')';
                AddToCart();
            }
        });

    }

}, 1000);

function addProducts(productSKU, productName, productType, productVariant, productPresentation, productPresentationPack, productPresentationQty, productPrice, productInCart) {
    var p = new Product(productSKU, productName, productType, productVariant, productPresentation, productPresentationPack, productPresentationQty, productPrice, productInCart);
    productList.push(p);
}


function createDivProd(productSKU, productName, productType, productVariant, productPresentation, productPresentationPack, productPresentationQty, productPrice, productInCart) {

    // Creo una variable para un elemento
    let productCard = document.createElement("div");

    //defino id y clases BS    
    productCard.setAttribute('id', productSKU);
    productCard.style.display = 'none';

    productCard.classList.add('product-card', 'col-sm-6', 'col-md-4', 'col-lg-3', 'card', 'border-dark', 'rounded-0', 'mb-2');

    //agrego el html
    productCard.innerHTML = `<div class="card-img-top d-flex flex-row flex-wrap justify-content-center">
        <img src="./img/drinks/${productSKU}.jpg" alt="${productType}&nbsp;${productName}" class="img-fluid maxh150-px">
    </div>
    <div class="card-body d-flex flex-row flex-wrap justify-content-center">
        <h5 class="card-title text-center w-100">${productType}&nbsp;${productName}</h5>
        <p class="card-text text-center w-100">${productVariant}&nbsp;|&nbsp;${productPresentation}&nbsp;|&nbsp;${productPresentationPack}&nbsp;x${productPresentationQty}</p>
        <p class="price text-center fs-4 mb-0 fw-bold text-dark w-100">$${(productPrice)*(productPresentationQty)}</p><small class="unit-price text-center text-dark w-100 my-2">P. Unit.: $${productPrice} | ID: ${productSKU}</small>
        <div class="input-group maxw150-px mx-auto">
            <button class="rem btn btn-dark rounded-0" ><i class="text-white fas fa-minus"></i></button>
            <input  type="number" maxlength="4" class="inputQty input-sm form-control text-center border-dark" value="${productInCart}" readonly >
            <button class="add btn btn-dark rounded-0"><i class="text-white fas fa-plus"></i></button>
        </div> 
    </div>`;

    //y ahora la asigno como child del wrapper
    productWrapper.appendChild(productCard);

}

function AddToCart() {
    const cart = productList.filter(productList => productList.productInCart > 0);
    const updateProductList = productList;
    let updateList = JSON.stringify(updateProductList);
    let cartList = JSON.stringify(cart);
    localStorage.setItem('Carrito', cartList);
    localStorage.setItem('listaActualizada', updateList);
}

function cartCounter() {
    let items = 0;
    productList.forEach(p => {
        items = items + p.productInCart;
    });
    return items
}
