// assess the level of the user

const nextButton = document.getElementById('nextButton');
const newButton = document.getElementById('newButton');

nextButton.addEventListener('click', function () {
    const q1 = document.querySelector('input[name="q1"]:checked').value || "Unknown understanding of course"
    const q2 = document.querySelector('input[name="q2"]:checked').value || "Unknown if user has taken courses or workshops before or not"
    const q3 = document.querySelector('input[name="q3"]:checked').value || "Unknown if user is familiar with course concepts or not"
    const classify_calc = q1 * q2 * q3;
    let classification = "";
    if (classify_calc >= 0.001 && classify_calc <= 0.003) {
        classification = "Beginner"
    } else if (classify_calc >= 0.004 && classify_calc <= 0.009) {
        classification = "Intermediate"
    } else if (classify_calc >= 0.010 && classify_calc <= 0.018) {
        classification = "Expert"
    }

    // send the classification to database @YEETAO
    
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