function isWebp() {
    // Проверка поддержки webp
    const testWebp = (callback) => {
        const webP = new Image();

        webP.onload = webP.onerror = () => callback(webP.height === 2);
        webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    };

    // Добавление класса _webp или _no-webp для HTML
    testWebp((support) => {
        const className = support ? 'webp' : 'no-webp';
        document.querySelector('html').classList.add(className);

        console.log(support ? 'webp поддерживается' : 'webp не поддерживается');
    });
}

class Calculator{
    constructor(root) {
        this.root = root;
        this.checkboxWrappers = this.root.querySelectorAll('.calculator__checkboxes');
        this.totalNode = this.root.querySelector('.calculator__total');

        this.days = 4;
        this.hours = 6;
        this.period = 1;

        this.price = 24000;

        this.bindListeners();
    }

    bindListeners() {
        this.checkboxWrappers.forEach((wrapper) => {
            const buttons = wrapper.querySelectorAll('.calculator__checkbox');
            let activeButton = 0;
            buttons.forEach((button, index) => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();

                    buttons[activeButton].classList.remove('gradient-button_active');
                    activeButton = index;
                    buttons[activeButton].classList.add('gradient-button_active');

                    let days = buttons[activeButton].getAttribute('data-days');
                    let hours = buttons[activeButton].getAttribute('data-hours');
                    let period = buttons[activeButton].getAttribute('data-period');

                    this.days = days ? days : this.days;
                    this.hours = hours ? hours : this.hours;
                    this.period = period ? period : this.period;

                    this.calculate();
                })
            })
        });
    }

    get priceStr() {

        return this.price.toLocaleString();
    }

    calculate() {
        const coef = 1000;

        this.price = this.days * this.hours * this.period * coef;

        this.totalNode.innerText = `~${this.priceStr}₽`;
    }
}

function initStickyHeader() {
    const header = document.querySelector('.header__wrapper');
    document,addEventListener('scroll', (event) => {
        if(window.pageYOffset > 50) {
            header.classList.add('header__wrapper_scroll');
        }
        else {
            header.classList.remove('header__wrapper_scroll');
        }
    })
}

function initEquipmentAccordeon() {
    const equipmentCards = document.querySelectorAll('.equipment__card');
    if(equipmentCards.length > 0) {
        equipmentCards.forEach((card) => {
            const button = card.querySelector('.equipment-card__button');
            button.addEventListener('click', (event) => {
                card.classList.toggle('equipment-card_active');
            })
        })
    }
}

isWebp();

document.addEventListener('DOMContentLoaded', (event) => {
    initStickyHeader();
    initEquipmentAccordeon();

    const calculatorNode = document.querySelector('.calculator');
    if(calculatorNode) {
        new Calculator(calculatorNode);
    }
})