//--------------------BURGER--------------------

let burger = document.querySelector('.header__burger');
let menu = document.querySelector('.header__nav');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.classList.toggle('lock');
});

//--------------------SCROLL_ANIMATION--------------------

const animItems = document.querySelectorAll("._anim-items");
if (animItems.length > 0) {
    window.addEventListener("scroll", animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 4;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint - window.innerHeight - window.innerHeight / animStart;
            }
            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add("_active");
            }
            else {
                animItem.classList.remove("_active");
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    animOnScroll();
}

let links = document.querySelectorAll('.scrollLink');
for (let i = 0; i < links.length; i++) {
    const button = links[i];
    button.addEventListener('click', (e) => {
        e.preventDefault();
        for (let i = 0; i < links.length; i++) {
            if (links[i].classList.contains('scrolled')) {
                links[i].classList.remove('scrolled')
            }
        }
        if (burger.classList.contains('active')) {
            menu.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('lock');
        }
        if (button.getAttribute('data-selector')) {
            let selector = button.dataset.selector;
            let el = document.querySelector(selector);
            let headerHeight = document.querySelector('header.header')?.offsetHeight || 0;
            let coordinate = el.getBoundingClientRect().top + 10 + pageYOffset - headerHeight + 10;
            button.classList.add('scrolled');
            window.scrollTo({
                top: coordinate,
                behavior: 'smooth',
            });
        }
    });
}

window.addEventListener('scroll', (e) => {
    for (let i = 0; i < links.length; i++) {
        if (links[i].getAttribute('data-selector')) {
            let selector = links[i].dataset.selector;
            let el = document.querySelector(selector);
            let headerHeight = document.querySelector('header.header')?.offsetHeight || 0;
            let scrolledHeight = window.innerHeight + pageYOffset;
            let coordinate = el.getBoundingClientRect().top + pageYOffset;
            if (el.getBoundingClientRect().top < headerHeight && el.getBoundingClientRect().bottom > headerHeight) {
                links[i].classList.add('scrolled');
            }
            else {
                links[i].classList.remove('scrolled');
            }
        }
    }
});

window.addEventListener('scroll', (e) => {
    const header = document.querySelector('header.header');
    if (pageYOffset > 50) {
        header.classList.add("active");
    }
});