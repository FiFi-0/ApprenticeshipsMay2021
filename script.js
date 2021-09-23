'use strict';

/* SIDE MENU*/
const sideBarBtn = document.querySelector('.side-menu__button');
let closed = false;

const moveSideBar = function () {
    if (closed === false) {
        document.getElementById("side-menu").style.marginLeft = "-170px";
        document.getElementById("side-menu__arrow").style.transform = "rotate(-180deg)";
        closed = true;
    } else if (closed === true) {
        document.getElementById("side-menu").style.marginLeft = "0px";
        document.getElementById("side-menu__arrow").style.transform = "rotate(0deg)";
        closed = false;
    }
};

sideBarBtn.addEventListener('click', moveSideBar);


const loupe = document.querySelector('.top-menu__search-button');
const input = document.querySelector('.top-menu__search-input');

loupe.addEventListener('click', function () {
    if (input.classList.contains("display--none")) {
        input.classList.remove("display--none");
    } else {
        input.classList.add("display--none");
    }
});

/* HERO CAROUSEL*/

const slides = document.getElementsByClassName('hero__carousel-item');
const btns = document.getElementsByClassName('hero__carousel-btn');
const time = 2500;
let currentSlide = 0;
let currentBtn = 0

for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener('click', function () {
        changeSlide(i);
    })
}

const addSlide = function (i) {
    slides[i].classList.add('hero__carousel-item--active');
    btns[i].classList.add('hero__carousel-btn--active');
    currentSlide = i;
    currentBtn = i;
}

const removeSlide = function () {
    slides[currentSlide].classList.remove('hero__carousel-item--active');
    btns[currentBtn].classList.remove('hero__carousel-btn--active');
}

const changeSlide = function (i) {
    removeSlide(i);
    addSlide(i);
}

function autoNextSlide(i) {
    removeSlide(i);

    if (i < slides.length - 1) {
        i++;
    } else {
        i = 0;
    }
    addSlide(i);

    setTimeout("autoNextSlide(currentSlide)", time);
}

window.onload = autoNextSlide;

/* OWL CAROUSELS*/

const prevIcon = '<img src="./images/news-arrow-left.svg" alt="">';
const nextIcon = '<img src="./images/news-arrow-right.svg" alt="">';

const prevIconWhite = '<img src="./images/arrow-left-white.svg" alt="">';
const nextIconWhite = '<img src="./images/arrow-right-white.svg" alt="">';

$('#news-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: [
        prevIcon,
        nextIcon,
    ],
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 4
        }
    }
})


$('#contact-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: [
        prevIconWhite,
        nextIconWhite,
    ],
    responsive: {
        0: {
            items: 1
        },
    }
})

$('#footer-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: [
        prevIcon,
        nextIcon,
    ],
    responsive: {
        0: {
            items: 1,
        },
        768: {
            items: 5,
        }
    }
})

/* FORM VALIDATION*/

const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const content = document.getElementById('content');
const form = document.getElementById('form');
const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
    let messages = []
    if (name.value === '' || name.value == null) {
        messages.push('Podaj swoje imie i nazwisko')
    };

    if ((email.value === '' || email.value == null) && (phone.value === '' || phone.value == null)) {
        messages.push('Podaj adres email lub numer telefonu');
    } else if (phone.value.length > 0) {
        if (!validatePhone(phone.value)) {
            messages.push('Podaj właściwy numer telefonu');
        }
    } else if (email.value.length > 0) {
        if (!validateEmail(email.value)) {
            messages.push('Podaj właściwy adress email');
        }
    }

    if (content.value.trim().length <= 6) {
        messages.push('Wiadomość musi zawierać więcej niż 100 słów');
    };

    if (content.value.trim().length >= 200) {
        messages.push('Wiadomość musi zawierac mniej niż 200 słów');
    };

    if (messages.length > 0) {
        e.preventDefault();
        errorElement.innerText = messages.join(', ');
    };
});

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePhone(phone) {
    var re = /^(^\+251|^251|^0)?9\d{8}$/;
    return re.test(phone);
}