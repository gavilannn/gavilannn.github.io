// Aumentar y disminuir productos

const productosHome = document.querySelectorAll('.product-card');

let productoHomeIndex = 0;

let inputValues = [];

for (let i = 0; i < productosHome.length; i++) {

    btnAdd = productosHome[i].querySelector('.add');

    btnRem= productosHome[i].querySelector('.rem');

    inputValues.push(parseInt(productosHome[i].querySelector('.input-sm').value));

    btnAdd.addEventListener('click', function() {
        const input =  productosHome[i].querySelector('.input-sm');
        let modValue = inputValues[i] + 1;
        input.setAttribute('value', modValue);
        inputValues[i] = modValue;
    });  
    
    btnRem.addEventListener('click', function() {
        if (inputValues[i] <= 0 ) {

            inputValues[i] = 0;

        } else {

        const input =  productosHome[i].querySelector('.input-sm');
        let modValue = inputValues[i] - 1;        
        input.setAttribute('value', modValue);
        inputValues[i] = modValue;

        }

    }); 
    
}