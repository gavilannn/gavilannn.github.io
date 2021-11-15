class Product {
    constructor(productSKU, productName, productType, productVariant, productPresentation, productPresentationPack, productPresentationQty, productPrice) {
        this.productSKU = productSKU;
        this.productName = productName;
        this.productType = productType;
        this.productVariant = productVariant;
        this.productPresentation = productPresentation;
        this.productPresentationPack = productPresentationPack;
        this.productPresentationQty = productPresentationQty;
        this.productPrice = productPrice;
        
    }
}

let productList = [];

function addProducts(productSKU, productName, productType, productVariant, productPresentation, productPresentationPack, productPresentationQty, productPrice){    
    var p = new Product(productSKU, productName, productType, productVariant, productPresentation, productPresentationPack, productPresentationQty, productPrice); // here we create instance
    productList.push(p);
}

addProducts('ANDES0001', 'Andes Origen', 'Cerveza', 'Rubia', 'Lata', 'Pack', 6, 150);
addProducts('ANDES0002', 'Andes Origen', 'Cerveza', 'Roja', 'Lata', 'Pack', 6, 150);
addProducts('ANDES0003', 'Andes Origen', 'Cerveza', 'Negra', 'Lata', 'Pack', 6, 150);
addProducts('ANDES0004', 'Andes Origen', 'Cerveza', 'Criolla', 'Lata', 'Pack', 6, 150);
addProducts('ANDES0005', 'Andes Origen', 'Cerveza', 'Ipa', 'Lata', 'Pack', 6, 150);
addProducts('ANDES0006', 'Andes Origen', 'Cerveza', 'Red Ipa', 'Lata', 'Pack', 6, 150);
addProducts('QUILMES0001', 'Quilmes', 'Cerveza', 'Rubia', 'Lata', 'Pack', 6, 100);
addProducts('QUILMES0002', 'Quilmes', 'Cerveza', 'Red Lager', 'Lata', 'Pack', 6, 100);
addProducts('QUILMES0003', 'Quilmes', 'Cerveza', 'Bock', 'Lata', 'Pack', 6, 100);
addProducts('QUILMES0004', 'Quilmes', 'Cerveza', 'Stout', 'Lata', 'Pack', 6, 100);
addProducts('QUILMES0005', 'Quilmes', 'Cerveza', '00%', 'Lata', 'Pack', 6, 100);
addProducts('PATA0001', 'Patagonia', 'Cerveza', '24.7', 'Lata', 'Pack', 6, 200);





const productWrapper = document.getElementById('productList');

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
        <p class="price text-center fs-4 mb-0 fw-bold text-dark w-100">$${(p.productPrice)*6}</p>
        <small class="unit-price text-center text-dark w-100 mb-3">Precio Unit.: $${p.productPrice}</small>
        <form class="input-group maxw150-px mx-auto">
            <button class="rem btn btn-dark rounded-0" ><i class="text-white fas fa-minus"></i></button>
            <input  type="number" maxlength="4" class="input-sm form-control text-center border-dark" value="0"readonly >
            <button class="add btn btn-dark rounded-0"><i class="text-white fas fa-plus"></i></button>
        </form> 
    </div>`;
    //y ahora la asigno como child del wrapper
    productWrapper.appendChild(productCard);    
}

// Aumentar y disminuir productos

const productosHome = document.querySelectorAll('.product-card');

const itemCount = document.getElementById('itemsCount');

let productoHomeIndex = 0;

let inputValues = [];

let cartItems = 0;


for (let i = 0; i < productosHome.length; i++) {

    btnAdd = productosHome[i].querySelector('.add');

    btnRem = productosHome[i].querySelector('.rem');


    inputValues.push(parseInt(productosHome[i].querySelector('.input-sm').value));

    btnAdd.addEventListener('click', (e) => {
        e.preventDefault();
        const input =  productosHome[i].querySelector('.input-sm');
        let modValueAdd = inputValues[i] + 1;
        input.setAttribute('value', modValueAdd);
        inputValues[i] = modValueAdd;
        cartItems = cartItems+1;
        itemCount.innerHTML = '(' + cartItems  + ')';

    });  
    
    btnRem.addEventListener('click', (e) => {
        e.preventDefault();
        if (inputValues[i] <= 0 ) {

            inputValues[i] = 0;

        } else {

            const input =  productosHome[i].querySelector('.input-sm');
            let modValueRem = inputValues[i] - 1;        
            input.setAttribute('value', modValueRem);
            inputValues[i] = modValueRem;
            cartItems = cartItems - 1;
            itemCount.innerHTML = '(' + cartItems  + ')';
        }

    }); 
    
      
}


