// assess the level of the user

const nextButton = document.getElementById('nextButton');
const newButton = document.getElementById('newButton');

nextButton.addEventListener('click', function () {
    // send level of user proficiency to the database from the 3 questions in course-assess.html
    alert("You have completed the course assessment!");
    alert("Recommendations will be tailored on your proficiency level.");
    // generate a new page of the course subject with 5 chapters based on the user's proficiency level
});

newButton.addEventListener('click', function () {
    // code
    alert("You have skipped the course assessment!");
    alert("Recommendations will be shuffled.")
    alert("Please login again to view your recommendations.")
    window.location.href = 'login.html';
});