//validar si esta almacenada la edad >18
const bodySelector = document.querySelector('body');

const userBornSave = localStorage.getItem('Cumpleaños');

if (userBornSave == null) {

    location.href = 'index.html';  

} else {

    bodySelector.classList.remove('d-none');

}