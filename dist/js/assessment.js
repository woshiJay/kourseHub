// if user clicks submit, send the data to the database
// else if user skips, send the data to the database with an empty string
// then return to login page

const submitButton = document.getElementById('submitButton');
const skipButton = document.getElementById('skipButton');

submitButton.addEventListener('click', function () {
    // code
    alert("You have completed the interest assessment!");
    alert("Recommendations will be tailored on your interests.")
    alert("Please login again to view your recommendations.")
    window.location.href = 'login.html';
});

skipButton.addEventListener('click', function () {
    // code
    alert("You have skipped the interest assessment!");
    alert("Recommendations will be shuffled.")
    alert("Please login again to view your recommendations.")
    window.location.href = 'login.html';
});