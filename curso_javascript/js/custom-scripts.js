// Constructor datos de usuario

class UserData {
    constructor(UserName, UserYearBorn, UserMonthBorn, UserDayBorn){
        this.UserName = UserName;
        this.UserYearBorn = UserYearBorn;
        this.UserMonthBorn = UserMonthBorn;
        this.UserDayBorn = UserDayBorn;
    }

    getUserName(newUserName) {
        this.UserName = newUserName;
    }

    getUserYearBorn(newUserYearBorn) {
        this.UserYearBorn = newUserYearBorn;
    }

    getUserMonthBorn(newUserMonthBorn) {
        this.UserMonthBorn = newUserMonthBorn;
    }

    getUserDayBorn(newUserDayBorn) {
        this.UserDayBorn = newUserDayBorn;
    }
    
}

class Product {
    constructor(ProductType, ProductName, ProductVariant, ProductPresentation , ProductPrice){
        this.ProductType = ProductType;
        this.ProductName = ProductName;
        this.ProductVariant = ProductVariant;
        this.ProductPresentation = ProductPresentation;
        this.ProductPrice = ProductPrice;
    }    
}


// ejecuciones scope

const newSessionUser = new UserData('Default user', 1990, 1, 1);

coreExecution();



//funciones

function coreExecution() {

    do {

        askForBirthday();    

        ageValidate(newSessionUser.UserYearBorn, newSessionUser.UserMonthBorn, newSessionUser.UserDayBorn);

        validation = ageValidate(newSessionUser.UserYearBorn, newSessionUser.UserMonthBorn, newSessionUser.UserDayBorn);
        
    } while (!validation);


    let userNameInput;

    do {

        userNameInput = prompt('¡Bienvenido a nuestra Tienda de Bebidas! Por favor ingrese su nombre -  Ingrese 0 para salir');

        if ( userNameInput == 0) {
            exitExecution();            
        } else {
            newSessionUser.getUserName(userNameInput);            
        }
        
    } while (!userNameInput);


    let productChoice;

    do {

        productChoice = prompt('¡Genial ' + newSessionUser.UserName + '! Elije ahora que productos deseas que te mostremos: \n\n1- Cervezas \n2- Vinos \n3- Whiskies \n4- Gines y Vodkas \n5 - Todo el catalogo\n\n ' );
        
    } while (productChoice < 0 || productChoice > 5);
    

    productCatalog(parseInt(productChoice));

}


function askForBirthday() {

    newSessionUser.getUserYearBorn(
        parseInt(prompt('Ingrese su año de nacimiento. Ej: 1990'))
    );

    newSessionUser.getUserMonthBorn(
        parseInt(prompt('Ingrese su mes de nacimiento. Ej: 01'))
    );

    newSessionUser.getUserDayBorn(
        parseInt(prompt('Ingrese su mes de nacimiento. Ej: 01'))
    );

}  


function ageValidate(yyyyBorn, mmBorn, ddBorn) {       
    
    let today = new Date();
    
    let todayDate = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate();    
    
    let userBorn = (yyyyBorn*10000) + (mmBorn*100) +  ddBorn;
    
    let ageUser = parseInt((todayDate - userBorn) / 10000);
    
    if (ageUser >= 18) {    
        return true;    
    } else {
        alert('Usted tiene ' + ageUser + ' años. Por lo tanto no puede ingresar al sitio.');
        coreExecution();
         
    }
}


function productCatalog(option){

    switch (option) {
        case 1:      
            beerCatalog();
            break;
    
        case 2:       
            beerCatalog();
            //wineCatalog()
            break;    
    
        case 3:    
            beerCatalog();
            //whiskyCatalog()
            break;  
    
        case 4:
            beerCatalog();
            //ginAndVodkaCatalog()
            break;          
    
        default:
            beerCatalog();
            //fullCatalog()
            break;
    }
}


function beerCatalog() {

    const beers = [
        new Product('Cerveza', 'Quilmes', 'Clásica', 'Lata', 100),
        new Product('Cerveza', 'Quilmes', 'Red Lager', 'Lata', 100),
        new Product('Cerveza', 'Quilmes', 'Stout', 'Lata', 100),
        new Product('Cerveza', 'Quilmes', 'Bock', 'Lata', 100),
        new Product('Cerveza', 'Quilmes', '0.0 - Sin alcohol', 'Lata', 100),
        new Product('Cerveza', 'Andes Origen', 'Rubia', 'Lata', 150),
        new Product('Cerveza', 'Andes Origen', 'Roja', 'Lata', 150),
        new Product('Cerveza', 'Andes Origen', 'Negra', 'Lata', 150),
        new Product('Cerveza', 'Andes Origen', 'Ipa', 'Lata', 150),
        new Product('Cerveza', 'Andes Origen', 'Criolla', 'Lata', 150),
    ]

    const beerList = [];


    for (let i = 0; i < beers.length; i++) {

        beerList.push((i+1) + '- ' + beers[i].ProductType + ' ' + beers[i].ProductName + ' - ' + beers[i].ProductVariant + ' - ' + beers[i].ProductPresentation + 'x6\n' + 'Precio Unit: $' + beers[i].ProductPrice + ' - Total: $' + (beers[i].ProductPrice*6));
        
    }


    let buyOption; 
    let buyQuantity;
    let buyConfirm;
    

    do {

         buyOption = parseInt(prompt('Catalogo: \n\n' + beerList.join('\n') + '\n\nSelecciona una opción - Presiona 0 para salir')) ;

        if (buyOption === 0) {            
            exitExecution();
        } else {
            continue;         
        }
        
    } while (buyOption < 0 || buyOption > (beerList.length));


    do {

        buyQuantity = parseInt(prompt('Ingrese la cantidad deseada de producto - Presione 0 para salir')) ;

       if (buyQuantity === 0) {            
           exitExecution();
       } else {
           continue;          
       }
       
    } while (buyQuantity < 0);
    
    
    do {

         buyConfirm = parseInt(
             prompt('Confirma su compra por (' + buyQuantity + ') unidades de: \n\n' + beerList[(buyOption-1)] + '\nPor un total de: $' + ((beers[(buyOption-1)].ProductPrice)*buyQuantity*6) + '\n\nPresiona 1 para continuar o 0 para salir')
             ) ;

        if (buyConfirm === 0) {            
            exitExecution();
        } else {
            continue;          
        }
        
    } while (buyConfirm < 0 || buyConfirm != 1);

    buyConfirmMessage();    

}



function buyConfirmMessage() {

    alert('¡Gracias por tu compra ' + newSessionUser.UserName + '! Que la disfrutes.\n\nEsperamos que regreses pronto a Tienda de Bebidas.' );

    coreExecution();
}


function exitExecution(){    

    alert('Gracias por visitar Tienda de Bebidas. Lo esperamos nuevamente pronto.');

    coreExecution();

}