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

    const userBorn = new Born (yyyy, mm, dd);

    console.log(userBorn);  
    
    const ageValidation = ageValidate(userBorn.year, userBorn.month, userBorn.day);

    console.log(ageValidation);

    if (ageValidation) {

        userBornJSON = JSON.stringify(userBorn);

        localStorage.setItem('Cumpleaños', userBornJSON);
        location.href = "shop.html" ;
        
    } else {

        const alertMessage = document.getElementById('message');
        alertMessage.innerHTML = 'No eres mayor de edad por lo que no puedes ingresar al sitio';
        
     }


    return false;    

}

function ageValidate(yyyyBorn, mmBorn, ddBorn) {       
    
    let today = new Date();
    
    let todayDate = (today.getFullYear()*10000) + ((today.getMonth()+1)*100) + today.getDate();    
    
    let userBorn = (yyyyBorn*10000) + (mmBorn*100) +  ddBorn;
    
    let ageUser = parseInt((todayDate - userBorn) / 10000);
    
    if (ageUser >= 18) {    
        return true;    
    } else {
        return 0;
         
    }
}
