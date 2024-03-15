'use strict'

const basketEl = document.querySelector('.basket');
const cartIconWrapEl = document.querySelector('.cartIconWrap');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const cartIconWrapSpanEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotal');
const basket = {};

cartIconWrapEl.addEventListener('click', () =>
    basketEl.classList.toggle('hidden')
)

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;

    addToCart(id, name, price);
})

function addToCart(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 }
    }
    basket[id].count++;
    basketTotalValueEl.textContent = getBasketTotalValue();
    cartIconWrapSpanEl.textContent = getCartIconWrapSpanEl();
    renderProducts(id);
}

function getCartIconWrapSpanEl() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count, 0);
}


function getBasketTotalValue() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProducts(id) {
    const isTrueFalse = basketEl
        .querySelector(`.basketRow[data-productId = "${id}"]`);
    console.log(isTrueFalse)
    if (!isTrueFalse) {
        renderProduct(id)
    }
    isTrueFalse.querySelector('.productCount').textContent = basket[id].count;
    isTrueFalse.querySelector('.productsPrice')
        .textContent = basket[id].count * basket[id].price;
}

function renderProduct(id) {
    const product = `
    <div class="basketRow" data-productId = "${id}">
        <div>${basket[id].name}</div>
        <div class ="productCount">${basket[id].count}</div>
        <div>${basket[id].price}</div>
        <div class ="productsPrice">${basket[id].count * basket[id].price}</div>
    </div>
    `
    basketTotalEl.insertAdjacentHTML('beforebegin', product)
}



