// Constructor datos de usuario

class Born {
    constructor(year, month, day){
        this.year = year;
        this.month = month;
        this.day = day;         
    }    
}

// traigo toda la info del dom del id
const bornValidateForm = document.getElementById("validateBorn");

//en la accion ejecuta funcion
bornValidateForm.onsubmit = getUserData;

function getUserData(){

    const dd = parseInt(document.getElementById('dayBorn').value);
    const mm = parseInt(document.getElementById('monthBorn').value);
    const yyyy= parseInt(document.getElementById('yearBorn').value);
    
    ageValidate(yyyy, mm, dd);
    
    return false;    

}

function ageValidate(yyyyBorn, mmBorn, ddBorn) {       
    
    let today = new Date();
    
    let todayDate = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate();    

    const userBorn = new Born (yyyyBorn, mmBorn, ddBorn);
    
    let inputBorn = (userBorn.year*10000) + (userBorn.month*100) +  userBorn.day;
    
    let ageUser = parseInt((todayDate - inputBorn) / 10000);

    
    if (ageUser >= 18) {    

        userBornJSON = JSON.stringify(userBorn);

        localStorage.setItem('Cumpleaños', userBornJSON);
        location.href = "shop.html" ;  
        
    } else {

        if (ageUser < 0) {

            const alertMessage = document.getElementById('message');
            alertMessage.innerHTML = '¿Acaso vienes del futuro? Por favor cuéntame como es...';
            
        } else {
            const alertMessage = document.getElementById('message');
            alertMessage.innerHTML = 'No eres mayor de edad por lo que no puedes ingresar al sitio';
            
        }
         
    }
}
