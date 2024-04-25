const hamburgerBtn = document.querySelector('.header__hamburger-btn');
const toggle = document.querySelector('.header__list');
const cancelBtn = document.querySelector('.cancel-btn');
const cards = document.querySelector('.cards')
const moreBtn = document.querySelector('.more-btn')
const Load = document.querySelector(".loading")

const API_URL = 'https://dummyjson.com';

function Toggle() {
    toggle.classList.toggle('show-list')
}

hamburgerBtn.addEventListener('click', () => {
    Toggle();
})

cancelBtn.addEventListener('click', () => {
    Toggle();
})


var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});


let limitCard = 4
let count = 1

async function getProduct(api) {
    let data = await fetch(`${api}/products?limit=${limitCard * count}`, {
        method: "GET",
    })

    data
        .json()
        .then(res => mapProducts(res))
        .catch(err => console.log(err))
        .finally(() => {
            moreBtn.innerHTML = "See more"
            moreBtn.removeAttribute("disabled")
            Load.style.display = "none"
        })

}

getProduct(API_URL)



function mapProducts(products) {
    let card = ""

    products.products.forEach(product => {
        card += `
        <div class="card">
            <div class="card__img">
                <img src=${product.images[0]} alt="img">
            </div>   
            <div class="card__info">
                <h3 class="card__title">${product.title}</h3>
                <p class="card__text">${product.price} USD</p>
            </div>
        </div>
        `
    })

    cards.innerHTML = card
}


moreBtn.addEventListener('click', () => {
    count++
    moreBtn.innerHTML = "Loading..."
    getProduct(API_URL)
    moreBtn.setAttribute("disabled", true)

})




function Loading(load) {
    let loading = ""
    for (let i = 0; i < load; i++) {
        loading += `
            <div class="loading__card">
                    <div class="loading__img"></div>
                <div class="loading__info">
                    <div class="loading__title"></div>
                    <div class="loading__title"></div>
                </div>
            </div>
        `
    }
    Load.innerHTML = loading
}

Loading(4)