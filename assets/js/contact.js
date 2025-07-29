function selectProduct(element) {
// Remove selected class from all cards
document.querySelectorAll('.product-option').forEach(card => {
    card.classList.remove('product-selected');
});
// Add selected class to clicked card
element.classList.add('product-selected');
}

function updateCharCount(textarea) {
const count = textarea.value.length;
const charCountElement = textarea.nextElementSibling;
charCountElement.textContent = count + '/500';
}

function updateCharCount2(textarea) {
const count = textarea.value.length;
const charCountElement = textarea.nextElementSibling;
charCountElement.textContent = count + '/1000';
}

function updateCharCount3(textarea) {
const count = textarea.value.length;
const charCountElement = textarea.nextElementSibling;
charCountElement.textContent = count + '/1500';
}

function showServiceCenter() {
document.getElementById('investmentForm').style.display = 'none';
document.getElementById('serviceCenterForm').style.display = 'block';
document.getElementById('feedbackForm').style.display = 'none';

// Update sidebar active state
document.querySelector('.form-sidebar h3').classList.remove('sidebar-active');
document.querySelectorAll('.form-sidebar li').forEach(li => {
    li.classList.remove('sidebar-active');
});
document.querySelectorAll('.form-sidebar li')[0].classList.add('sidebar-active');
}

function showInvestmentForm() {
document.getElementById('serviceCenterForm').style.display = 'none';
document.getElementById('feedbackForm').style.display = 'none';
document.getElementById('investmentForm').style.display = 'block';

// Update sidebar active state
document.querySelectorAll('.form-sidebar li').forEach(li => {
    li.classList.remove('sidebar-active');
});
document.querySelector('.form-sidebar h3').classList.add('sidebar-active');
}

function showFeedbackForm() {
document.getElementById('investmentForm').style.display = 'none';
document.getElementById('serviceCenterForm').style.display = 'none';
document.getElementById('feedbackForm').style.display = 'block';

// Update sidebar active state
document.querySelector('.form-sidebar h3').classList.remove('sidebar-active');
document.querySelectorAll('.form-sidebar li').forEach(li => {
    li.classList.remove('sidebar-active');
});
document.querySelectorAll('.form-sidebar li')[1].classList.add('sidebar-active');
}

// Initialize with investment form active
document.addEventListener('DOMContentLoaded', function () {
document.querySelector('.form-sidebar h3').classList.add('sidebar-active');

// Date input formatting for main form
const dateInput = document.getElementById('dateInput');
if (dateInput) {
    dateInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '-' + value.substring(2);
        }
        if (value.length >= 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 9);
        }
        e.target.value = value;
    });
}

// Date input formatting for feedback form
const feedbackDateInput = document.getElementById('feedbackDateInput');
if (feedbackDateInput) {
    feedbackDateInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '-' + value.substring(2);
        }
        if (value.length >= 5) {
            value = value.substring(0, 5) + '-' + value.substring(5, 9);
        }
        e.target.value = value;
    });
}
});

// Form submissions
document.getElementById('mainForm').addEventListener('submit', function (e) {
e.preventDefault();
alert('Insurance application form submitted! Thank you for your inquiry.');
});

document.getElementById('appointmentForm').addEventListener('submit', function (e) {
e.preventDefault();
alert('Appointment submitted! We will contact you shortly.');
});

document.getElementById('feedbackMainForm').addEventListener('submit', function (e) {
e.preventDefault();
alert('Feedback submitted! Thank you for your valuable input.');
});

// Language dropdown functionality (assuming it exists from your header)
function changeLanguage(language) {
// This function would handle language changes
console.log('Language changed to:', language);
}