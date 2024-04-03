// ======================================== typing animation funtionality  =========================================================
var typed = new Typed(".multiple-text", {
    strings: ["Java", "Python", "Ren’Py", "HTML", "CSS", "R", "CI/CD", "Video Editing", "Dart", "ML", "MySQL"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// ======================================== view cv  =========================================================
document.addEventListener('DOMContentLoaded', function () {
    const viewCVButton = document.getElementById('view-cv-btn');

    viewCVButton.addEventListener('click', function (event) {
        event.preventDefault();
        window.open('cv/TharushaMaddumage.pdf', '_blank');
    });
});

// ======================================== read more buttin funtionality  =========================================================
document.getElementById('read-more-btn').addEventListener('click', function(event) {
    event.preventDefault();
    var additionalContent = document.getElementById('additional-content');
    if (additionalContent.style.display === 'none' || additionalContent.style.opacity === '0') {
        additionalContent.style.display = 'block';
        fadeIn(additionalContent);
        this.textContent = 'Read Less';
    } else {
        fadeOut(additionalContent);
        this.textContent = 'Read More';
    }
});

// ======================================== fade in animation =========================================================
function fadeIn(element) {
    var op = 0.1;  // initial opacity
    element.style.opacity = op;
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += 0.1;
    }, 30); // Adjust the time interval as needed for smoother animation
}

// ======================================== fade out animation  =========================================================
function fadeOut(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        op -= 0.1;
    }, 20); // Adjust the time interval as needed for smoother animation
}

// ======================================== toggle icon navbar  =========================================================
let menuIcon = document.querySelector('#menu-icon')
let navbar = document.querySelector('.navbar')

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// ======================================== scroll sections active link  =================================================
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('header nav a[href="#' + id + '"]').classList.add('active');
        }
    });
    // ======================================== sticky navbar =================================================
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    // ======================================== remove toggle icon and navbar when click mavbar link =================================================
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// ======================================== sticky navbar =================================================
ScrollReveal({
    // reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .resume-container, .work-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.about-img', { origin: 'left' });
ScrollReveal().reveal('.about-content', { origin: 'right' });

// ======================================= Contact Form ===================================================
const form =document.querySelector('form');
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

function sendEmail() {
    const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}<br>
    Phone Number: ${phone.value}<br> Message: ${message.value}<br>`;

    Email.send({
        SecureToken: "d78a9e0c-d9da-467d-8ea2-6a3a5a00919e",
        To : 'tharushamd.portfolio@gmail.com',
        From : "tharushamd.portfolio@gmail.com",
        Subject : subject.value,
        Body : bodyMessage
    }).then(
      message => {
        if (message == "OK") {
            Swal.fire({
                title: "Success!",
                text: "Message sent successfully!",
                icon: "success"
              });
        }
      }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value != "") {
            checkEmail();
        }

        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }
            else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
    const errorTxtEmail = document.querySelector(".error-text.email")

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");

        if (email.value != "") {
            errorTxtEmail.innerText = "Enter a valid email address";
        }
        else {
            errorTxtEmail.innerText = "Email Address cannot be blank!";
        }
    }
    else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && 
    !phone.classList.contains("error") && !subject.classList.contains("error") && 
    !message.classList.contains("error")) {
        sendEmail();

        form.reset();
        return false;
    }
});