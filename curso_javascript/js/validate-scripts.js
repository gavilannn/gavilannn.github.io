// Constructor datos de usuario

class Born {
    constructor(year, month, day){
        this.year = year;
        this.month = month;
        this.day = day;         
    }    
}

// traigo toda la info del dom del id
const bornValidateForm = document.getElementById('validateBorn');

const dd = document.getElementById('dayBorn');
const mm = document.getElementById('monthBorn');
const yyyy= document.getElementById('yearBorn');

//en la accion ejecuta funcion

bornValidateForm.addEventListener('submit', getUserData);
//bornValidateForm.onsubmit = getUserData;

function getUserData(e){

    e.preventDefault();

    
    
    ageValidate(yyyy.value, mm.value, dd.value);
    
    return false;    

}

function ageValidate(yyyyBorn, mmBorn, ddBorn) {       
    
    let today = new Date();
    
    let todayDate = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate();    

    const userBorn = new Born (yyyyBorn, mmBorn, ddBorn);
    
    let inputBorn = (parseInt(userBorn.year*10000)) + (parseInt(userBorn.month*100)) +  parseInt(userBorn.day);
    
    let ageUser = (todayDate - inputBorn) / 10000;

    dd.classList.remove('border-danger');
    mm.classList.remove('border-danger');
    yyyy.classList.remove('border-danger');

    if (isNaN(inputBorn) || (inputBorn == " ")) {
        
        const alertMessage = document.getElementById('message');
        dd.classList.add('border-danger');
        mm.classList.add('border-danger');
        yyyy.classList.add('border-danger');
        alertMessage.innerHTML = 'Todos los campos son obligatorios';        

    } else {
    
        if (ageUser >= 18) {    

            userBornJSON = JSON.stringify(userBorn);

            localStorage.setItem('Cumpleaños', userBornJSON);
            location.href = 'shop.html' ;  
            
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
}
