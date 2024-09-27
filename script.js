const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function page4Animation() {
    var elemC = document.querySelector("#elem-container");
    var fixed = document.querySelector("#fixed-image");
    elemC.addEventListener("mouseenter", function () {
        fixed.style.display = "block";
    });
    elemC.addEventListener("mouseleave", function () {
        fixed.style.display = "none";
    });

    var elems = document.querySelectorAll(".elem");
    elems.forEach(function (e) {
        e.addEventListener("mouseenter", function () {
            var image = e.getAttribute("data-image");
            fixed.style.backgroundImage = url(`${image}`);
        });
    });
}

function swiperAnimation() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        autoplay: {
            delay: 3000,  // 3 seconds
            disableOnInteraction: false,  // Continue autoplay after user interactions
        },
    });

    // Update Swiper after dynamically adding slides
    swiper.update();
}

function menuAnimation() {
    var menu = document.querySelector("nav h3");
    var full = document.querySelector("#full-scr");
    var navimg = document.querySelector("nav img");
    var flag = 0;
    menu.addEventListener("click", function () {
        if (flag == 0) {
            full.style.top = 0;
            navimg.style.opacity = 0;
            flag = 1;
        } else {
            full.style.top = "-100%";
            navimg.style.opacity = 1;
            flag = 0;
        }
    });
}
const faqData = [
    {
        icon: '🚗',
        question: 'How do you calculate my individual and my mine carbon footprint?',
        answer: "To calculate your individual carbon footprint, we analyze factors such as your energy consumption, transportation habits, and daily lifestyle choices. For mining operations, we assess key factors including energy use, fuel consumption, mining processes, waste management, and emissions from equipment. By considering both direct and indirect emissions, we provide a comprehensive estimate of your personal and your mine's carbon footprint, helping you understand where improvements can be made to achieve carbon neutrality."
    },
    {
        icon: '🌿',
        question: 'Can carbon neutrality be achieved through offsetting alone in coal mines?',
        answer: "Achieving carbon neutrality in coal mines requires a multifaceted approach — no single solution can accomplish it alone. Carbon offsetting plays a significant role, but it must be combined with innovative technologies, sustainable practices, and governmental support. While regulatory policies and clean technologies may take time to implement, offsetting offers an immediate way to balance emissions. At EmissionX, we start with offsetting and provide pathways for coal mines to further reduce their carbon footprint. It's essential that we focus on both short-term actions and long-term strategies to ensure that Indian coal mines, and eventually the entire country, move towards carbon neutrality."
    },
    {
        icon: '🌍',
        question: 'What does EmissionX do?',
        answer: 'EmissionX is a platform that helps Coal mines and businesses calculate, reduce, and offset their carbon footprint.'
    },
    {
        icon: '👥',
        question: 'Who is behind EmissionX?',
        answer: 'EmissionX is developed by a dedicated team of students from Chitkara University. With a shared passion for environmental sustainability and cutting-edge technology, we are committed to creating innovative solutions to help reduce carbon emissions and achieve carbon neutrality in Indian coal mines.'
    },
    {
        icon: '🤔',
        question: 'Does offsetting drive climate-damaging behavior?',
        answer: "While offsetting is an important tool, it's designed to complement, not replace, efforts to reduce emissions. We encourage users to both offset and reduce their carbon footprint."
    },
];

function createFAQSection() {
    const container = document.getElementById('faq-container');
    faqData.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item');
        
        const question = document.createElement('div');
        question.classList.add('faq-question');
        question.innerHTML = `
            <span><span class="faq-icon">${item.icon}</span>${item.question}</span>
            <span class="faq-toggle">+</span>
        `;
        
        const answer = document.createElement('div');
        answer.classList.add('faq-answer');
        answer.textContent = item.answer;

        faqItem.appendChild(question);
        faqItem.appendChild(answer);
        container.appendChild(faqItem);

        question.addEventListener('click', () => toggleAnswer(answer, question.querySelector('.faq-toggle')));
    });
}

function toggleAnswer(answerElement, toggleElement) {
    answerElement.classList.toggle('active');
    toggleElement.classList.toggle('active');
}

createFAQSection();

blogs();
page4Animation();
menuAnimation();
swiperAnimation();

function overlay() {
    const elements = document.querySelectorAll('.elem');

elements.forEach(elem => {
    elem.addEventListener('mouseenter', function() {
        const imageUrl = this.getAttribute('data-image');
        const fixedImage = document.getElementById('fixed-image');

        fixedImage.style.backgroundImage = `url(${imageUrl})`;
        fixedImage.style.display = 'block';
    });

    elem.addEventListener('mouseleave', function() {
        const fixedImage = document.getElementById('fixed-image');
        fixedImage.style.display = 'none';
    });
});

}

overlay();