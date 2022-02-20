import axios from 'axios';

const userList = document.querySelector('#user-list');
const carList = document.querySelector('#car-list');
const saleList = document.querySelector('#sale-list');

const renderUsers = (users) => {
    const html = users.map( user => 
        `<li> 
    <a href='#${user.id}'> ${user.name}</a> 
        </li>`
        ).join('');
    userList.innerHTML = html;
};

const renderCars = (cars) => {
    const html = cars.map (car => 
        `<li>
            <a href='#{car.id}'> ${car.name} </a>
        </li>`
        ).join('');
        carList.innerHTML = html;
};

const renderSales = (sales) => {
    const html = sales.map (sale => 
        `<li>
            ${sale.car.name}
            ${sale.extendedWarranty ? ' with warranty ' : '' }
        </li>`
        ).join('');
        saleList.innterHTML = html;
}

const init = async() => {
    try {
        // const response  = await fetch('/api/users') 
        // const users = await response.json();
        const users = (await axios.get('/api/users')),data;
        const cars = (await axios.get('/api/cars')).data;
        renderUsers(users);
        // renderCars(cars);
    }
    catch(e) {
        console.log(e)
    }
};

window.addEventListener('hashchange', () => {
    const userId = (window.location.hash.slice(1));
    const url = `/api/users/${userId}/sales`;
    const sales = (await axios(url)).data;
    renderSales(sales);
});

init();