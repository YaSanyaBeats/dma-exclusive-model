const isMobile = document.documentElement.clientWidth < 768;
const isTablet = document.documentElement.clientWidth < 1140;

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

class Popup {
    constructor(root) {
        this.root = root;
        this.closeButton = this.root.querySelector('.popup__close');
        this.overlay = this.root;
        this.html = document.querySelector('html');
        this.bindListeners();
    }

    bindListeners() {
        this.root.addEventListener('click', (event) => {
            //Если нажатие на оверлей или на кнопку закрытия
            if(event.target == this.overlay || event.target == this.closeButton) {
                event.preventDefault();
                this.close();
            }
        })
    }

    open() {
        console.log('open');
        this.html.classList.add('no-scroll');
        this.root.classList.add('popup__overlay_show');
    }

    close() {
        this.html.classList.remove('no-scroll');
        this.root.classList.remove('popup__overlay_show');
    }
}

class CityPopup extends Popup {
    constructor(root) {
        super(root);
        this.titleNode = this.root.querySelector('.city-popup__title');
        this.roomNode = this.root.querySelector('.city-popup__text_rooms');
        this.dateNode = this.root.querySelector('.city-popup__text_date');
        this.imgNode = this.root.querySelector('.city-popup__image');
        this.imgLinkNode = this.root.querySelector('.city-popup__left');
    }

    open(triggerElem) {
        this.html.classList.add('no-scroll');
        this.root.classList.add('popup__overlay_show');

        this.titleNode.innerText = triggerElem.getAttribute('data-title');
        this.roomNode.innerText = triggerElem.getAttribute('data-room');
        this.dateNode.innerText = triggerElem.getAttribute('data-date');
        this.imgLinkNode.setAttribute('href', triggerElem.getAttribute('data-img'));
        this.imgNode.setAttribute('src', triggerElem.getAttribute('data-img'));
    }
}

class Hotspot {
    constructor(root) {
        this.root = root;

        this.bindListeners();
    }

    bindListeners() {
        this.root.addEventListener('mouseover', (event => {
            //this.show();
            console.log('over');
        }))
        this.root.addEventListener('mouseout', (event => {
            //this.show();
            console.log('out');
        }))
    }

    getCircleAbsoluteCoords() {
        console.log(this.root);
        let coords = this.root.getBoundingClientRect();

        return {
            top: coords.top + window.pageYOffset,
            right: coords.right + window.pageXOffset,
            bottom: coords.bottom + window.pageYOffset,
            left: coords.left + window.pageXOffset
        };

    }

    show() {
        console.log(this.getCircleAbsoluteCoords());
    }
}

function setHeaderScroll(header) {
    if(window.pageYOffset > 50) {
        header.classList.add('header__wrapper_scroll');
    }
    else {
        header.classList.remove('header__wrapper_scroll');
    }
}

function initStickyHeader() {
    const header = document.querySelector('.header__wrapper');
    if(!header.classList.contains('header__wrapper_scroll')) {
        setHeaderScroll(header);
        document.addEventListener('scroll', (event) => {
            setHeaderScroll(header);
        })
    }
    
}

function initEquipmentAccordion() {
    const equipmentCards = document.querySelectorAll('.equipment__card');
    if(equipmentCards.length > 0) {
        equipmentCards.forEach((card) => {
            const button = card.querySelector('.equipment-card__button');
            button.addEventListener('click', (event) => {
                card.classList.toggle('equipment-card_active');
                button.classList.toggle('accordion-button_active')
            })
        })
    }
}

function initFAQAccordion() {
    const FAQCards = document.querySelectorAll('.accordion__elem');
    if(FAQCards.length > 0) {
        FAQCards.forEach((card) => {
            const button = card.querySelector('.accordion-button');
            button.addEventListener('click', (event) => {
                card.classList.toggle('accordion__elem_active');
                button.classList.toggle('accordion-button_active')
            })
        })
    }
}

function initGallery() {
    const galleryNode = document.querySelector('.gallery');
    if(galleryNode) {
        let lightbox = new SimpleLightbox('.gallery a', { /* options */ });
    }

    const cityNode = document.querySelector('.city-popup__left');
    if(cityNode) {
        let lightbox = new SimpleLightbox('.city-popup__left', { /* options */ });
    }
}

function initStudiosGallery() {
    const galleryNode = document.querySelector('.gallery-studios');
    if(galleryNode) {
        let lightbox = new SimpleLightbox('.gallery-studios a', { /* options */ });
    }
}

function initPopup() {
    const popupButtons = document.querySelectorAll('a[href="#feedback"]');
    if(popupButtons.length > 0) {
        const popupNode = document.querySelector('#feedback');
        let popup = new Popup(popupNode);
        popupButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                popup.open();
            })
        })
    }

    const cityPopupButtons = document.querySelectorAll('a[href="#city"]');
    if(cityPopupButtons.length > 0) {
        const popupNode = document.querySelector('#city');
        let popup = new CityPopup(popupNode);
        cityPopupButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                popup.open(button);
            })
        })
    }

    const burgerButton = document.querySelector('.header__burger-button');
    if(burgerButton) {
        const popupNode = document.querySelector('#burger');
        let popup = new Popup(popupNode);
        burgerButton.addEventListener('click', (event) => {
            popup.open();
        })
    }
}

function initVideoPopup() {
    const button = document.querySelector('.video__button');
    if(button) {
        const popupNode = document.querySelector('#video-popup');
        let popup = new Popup(popupNode);
        button.addEventListener('click', (event) => {
            popup.open();
        })
    }
}

function initJobSwiper() {
    const jobNode = document.querySelector('.job__swiper');
    if(jobNode) {
        const swiper = new Swiper('.job__swiper', {
            // Optional parameters
            loop: true,
            
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
}

function initFranchiseesSwiper() {
    const franchiseesNode = document.querySelector('.franchisees-swiper__swiper');
    if(franchiseesNode) {
        const swiper = new Swiper('.franchisees-swiper__swiper', {
            // Optional parameters
            loop: true,

            slidesPerView: 'auto',
            spaceBetween: 30,
            grabCursor: true,

            breakpoints: {
                768: {
                    
                }
            }
        });
    }
}

function initStudiosSwiper() {
    if(isTablet) {
        const studiosButtons = document.querySelectorAll('.studio-card');
        if(studiosButtons.length > 0) {
            let swiperNode = document.createElement('div');
            swiperNode.classList.add('swiper');
            swiperNode.classList.add('studios__swiper');
    
            let swiperWrapperNode = document.createElement('div');
            swiperWrapperNode.classList.add('swiper-wrapper');
    
            studiosButtons.forEach((button) => {
                button.remove();
                button.classList.add('swiper-slide');
                swiperWrapperNode.append(button);
            })
            swiperNode.append(swiperWrapperNode);
    
            let studiosGrid = document.querySelector('.studios__grid');
            studiosGrid.append(swiperNode);
    
            const swiper = new Swiper('.studios__swiper', {
                // Optional parameters
                loop: false,
                slidesPerView: 1,
                spaceBetween: 20,
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    }
                }
            });
        }
    }
}

function initHotSpots() {
    const hotSpotNodes = document.querySelectorAll('.map__image-wrapper .hotspot');
    if(hotSpotNodes.length > 0) {
        hotSpotNodes.forEach((elem, index) => {
            new Hotspot(elem);
        })
    }
}

function initLottie() {
    const swipeNode = document.querySelectorAll('.swipe-lottie');
    if(swipeNode.length > 0) {
        swipeNode.forEach((elem) => {
            let animation = bodymovin.loadAnimation({
                container: elem, // Required
                path: '../static/swipe.json', // Required
                renderer: 'canvas', // Required
                loop: true, // Optional
                autoplay: true, // Optional
            })
        })
    }
}

function initFixedButtons() {
    const fixedWrapper = document.querySelector('.fixed-buttons');
    if(fixedWrapper) {
        let buttons = fixedWrapper.querySelectorAll('.fixed-buttons__elem');
        buttons.forEach((button, index) => {
            button.style.transitionDelay = '.' + (buttons.length - index) + 's';
        })
        document.addEventListener('scroll', (event) => {
            if(window.pageYOffset > 50) {
                fixedWrapper.classList.add('fixed-buttons_active');
            }
            else {
                fixedWrapper.classList.remove('fixed-buttons_active');
            }
        })
    }
}

isWebp();

document.addEventListener('DOMContentLoaded', (event) => {
    initStickyHeader();
    initEquipmentAccordion();
    initFAQAccordion();
    initGallery();
    initStudiosGallery();
    initPopup();
    initJobSwiper();
    initStudiosSwiper();
    initFranchiseesSwiper();
    initHotSpots();
    initLottie();
    initFixedButtons();
    initVideoPopup();

    const calculatorNode = document.querySelector('.calculator');
    if(calculatorNode) {
        new Calculator(calculatorNode);
    }
})