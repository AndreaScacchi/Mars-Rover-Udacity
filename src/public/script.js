/* About me page */
$(document).ready(function () {
    $(window).scroll(function () {
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function () {
        $('html').animate({ scrollTop: 0 });
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function () {
        $('html').css("scrollBehavior", "smooth");
    })

    // toggle menu/navbar script
    $('.menu-btn').click(function () {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing animation script
    let typed = new Typed(".typing", {
        strings: ["Front-End Developer", "Udacity Student"],
        typeSpeed: 100,
        backSpeed: 70,
        loop: true
    });

    let typed2 = new Typed(".typing-2", {
        strings: ["Front-End Developer", "Udacity Student"],
        typeSpeed: 100,
        backSpeed: 70,
        loop: true
    });
});


// form validation script
const email = document.getElementById('mail');


email.addEventListener('input', function () {
    if (email.validity.typeMismatch) {
        email.setCustomValidity('Please enter an e-mail address.');
    } else {
        email.setCustomValidity('');
    };
});