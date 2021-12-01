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
if (localStorage.getItem('listaActualizada')){
    productList = JSON.parse(localStorage.getItem('listaActualizada'));
    itemCount.innerHTML = '(' + cartCounter()  + ')';
} else {
    addProducts('ANDES0001', 'Andes Origen', 'Cerveza', 'Rubia', 'Lata', 'Pack', 6, 150, 0);
    addProducts('ANDES0002', 'Andes Origen', 'Cerveza', 'Roja', 'Lata', 'Pack', 6, 150, 0);
    addProducts('ANDES0003', 'Andes Origen', 'Cerveza', 'Negra', 'Lata', 'Pack', 6, 150, 0);
    addProducts('ANDES0004', 'Andes Origen', 'Cerveza', 'Criolla', 'Lata', 'Pack', 6, 150, 0);
    addProducts('ANDES0005', 'Andes Origen', 'Cerveza', 'Ipa', 'Lata', 'Pack', 6, 150, 0);
    addProducts('ANDES0006', 'Andes Origen', 'Cerveza', 'Red Ipa', 'Lata', 'Pack', 6, 150, 0);
    addProducts('QUILMES0001', 'Quilmes', 'Cerveza', 'Rubia', 'Lata', 'Pack', 6, 100, 0);
    addProducts('QUILMES0002', 'Quilmes', 'Cerveza', 'Red Lager', 'Lata', 'Pack', 6, 100, 0);
    addProducts('QUILMES0003', 'Quilmes', 'Cerveza', 'Bock', 'Lata', 'Pack', 6, 100, 0);
    addProducts('QUILMES0004', 'Quilmes', 'Cerveza', 'Stout', 'Lata', 'Pack', 6, 100, 0);
    addProducts('QUILMES0005', 'Quilmes', 'Cerveza', '00%', 'Lata', 'Pack', 6, 100, 0);
    addProducts('PATA0001', 'Patagonia', 'Cerveza', '24.7', 'Lata', 'Pack', 6, 200, 0);
}

for (const p of productList) {

    // Creo una variable para un elemento
    let productCard = document.createElement("div");

    //defino id y clases BS    
    productCard.setAttribute('id', p.productSKU);
    productCard.classList.add('product-card', 'col-sm-6', 'col-md-4', 'col-lg-3', 'card', 'border-dark', 'rounded-0', 'mb-2');

    //agrego el html
    productCard.innerHTML = `<div class="card-img-top d-flex flex-row flex-wrap justify-content-center">
        <img src="./img/drinks/drink-no-img.jpg" alt="icono de vaso con bebida" class="img-fluid maxh150-px">
    </div>
    <div class="card-body d-flex flex-row flex-wrap justify-content-center">
        <h5 class="card-title text-center w-100">${p.productType}&nbsp;${p.productName}</h5>
        <p class="card-text text-center w-100">${p.productVariant}&nbsp;|&nbsp;${p.productPresentation}&nbsp;|&nbsp;${p.productPresentationPack}&nbsp;x${p.productPresentationQty}</p>
        <p class="price text-center fs-4 mb-0 fw-bold text-dark w-100">$${(p.productPrice)*(p.productPresentationQty)}</p><small class="unit-price text-center text-dark w-100 mb-3">Precio Unit.: $${p.productPrice}</small>
        <form class="input-group maxw150-px mx-auto">
            <button class="rem btn btn-dark rounded-0" ><i class="text-white fas fa-minus"></i></button>
            <input  type="number" maxlength="4" class="inputQty input-sm form-control text-center border-dark" value="${p.productInCart}" readonly >
            <button class="add btn btn-dark rounded-0"><i class="text-white fas fa-plus"></i></button>
        </form> 
    </div>`;

    //y ahora la asigno como child del wrapper
    productWrapper.appendChild(productCard);    
    
}

// Aumentar y disminuir productos / Array con los valores de los input, luego almacena las modificaciones
const prodLoop = document.querySelectorAll('.product-card');
const btnAdd = document.querySelectorAll('.add');
const btnRem = document.querySelectorAll('.rem');
const inputQty = document.querySelectorAll('.inputQty');

for (let i = 0; i < prodLoop.length; i++) {
    btnAdd[i].addEventListener('click', (e) => {
        e.preventDefault();
        let modValueAdd = parseInt(productList[i].productInCart) + 1;        
        productList[i].productInCart = modValueAdd;
        inputQty[i].setAttribute('value', modValueAdd);
        itemCount.innerHTML = '(' + cartCounter()  + ')';
        AddToCart();

    });  
    
    btnRem[i].addEventListener('click', (e) => {
        e.preventDefault();
        if (productList[i].productInCart <= 0 ) {
            productList[i].productInCart = 0;
        } else {
            let modValueRem = productList[i].productInCart - 1;            
            productList[i].productInCart = modValueRem;
            inputQty[i].setAttribute('value', modValueRem);
            itemCount.innerHTML = '(' + cartCounter()  + ')';
            AddToCart(); 
        }
    }); 
        
}


function addProducts(productSKU, productName, productType, productVariant, productPresentation, productPresentationPack, productPresentationQty, productPrice, productInCart){    
    var p = new Product(productSKU, productName, productType, productVariant, productPresentation, productPresentationPack, productPresentationQty, productPrice, productInCart); 
    productList.push(p);
}

function AddToCart(){
    const cart = productList.filter(productList => productList.productInCart > 0);
    const updateProductList = productList;
    let updateList = JSON.stringify(updateProductList);
    let cartList = JSON.stringify(cart);
    localStorage.setItem('Carrito', cartList);   
    localStorage.setItem('listaActualizada', updateList); 
    
}

function cartCounter(){
    let items = 0;
    productList.forEach(p => {
        items = items + p.productInCart;        
    });
    return items
}







  







