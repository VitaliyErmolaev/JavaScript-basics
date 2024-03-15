'use strict'

const basketEl = document.querySelector('.basket');
const cartIconWrapEl = document.querySelector('.cartIconWrap');
const cartIconWrapSpanEl = document.querySelector('.cartIconWrap span');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');

const basket = {};

cartIconWrapEl.addEventListener('click', () => {
    basketEl.classList.toggle('hidden')
})

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return
    }
    const featuredItemEl = event.target.closest('.featuredItem');
    const id = +featuredItemEl.dataset.id;
    const name = featuredItemEl.dataset.name;
    const price = +featuredItemEl.dataset.price;

    addToBasket(id, name, price);
})

function addToBasket(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 };
    }
    basket[id].count++;

    cartIconWrapSpanEl.textContent = getcartIconWrapSpan();
    basketTotalValueEl.textContent = getBasketTotalValue();
    renderProducts(id);
}

function getcartIconWrapSpan() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count, 0)
}

function getBasketTotalValue() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0)
}

function renderProducts(id) {
    const idTrueFalse = basketEl
        .querySelector(`.basketRow[data-productId ="${id}"]`);
    if (!idTrueFalse) {
        renderProduct(id);
        return
    }

    idTrueFalse.querySelector('.productCount').textContent = basket[id].count;
    idTrueFalse.querySelector('.productPrice')
        .textContent = basket[id].count * basket[id].price;
}

function renderProduct(id) {
    const product = `
        <div class="basketRow" data-productId ="${id}">
            <div>${basket[id].name}</div>
            <div class="productCount">${basket[id].count} шт</div>
            <div>${basket[id].price}</div>
            <div class="productPrice">${basket[id].count * basket[id].price}</div>
        </div>                  
    `
    basketTotalEl.insertAdjacentHTML('beforebegin', product)
}


