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
    let q1_ans="";
    let q2_ans="";
    let q3_ans="";
    if (q1 == 0.1) {
        q1_ans="I am completely new to this subject and have poor or no experience.";
    } else if (q1==0.2) {
        q1_ans="I have some basic understanding of the fundamental concepts covered in this course.";
    } else {
        q1_ans="I have an excellent understanding and am familiar with most of the key concepts.";
    }
    if (q2 == 0.2) {
        q2_ans="Yes.";
    } else {
        q2_ans="No.";
    }
    if (q3 == 0.1) {
        q3_ans="Unfamiliar.";
    } else if (q3==0.2) {
        q3_ans="Aware.";
    } else {
        q3_ans="Expert.";
    }

    // send to db
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
        alert("Not Available!");
    } else if (userId) {
        fetch(`http://localhost:5501/get-username?uid=${userId}`)
            .then(resp => resp.json())
            .then(data => {
                user = data.username;
                alert("success");
                console.log(user);
                // Gather answers from the form
                const answers = {
                    user_name:user,
                    question_one_ans: q1_ans,
                    question_two_ans: q2_ans,
                    question_three_ans: q3_ans,
                    classification: classification
                };
                console.log(answers);
                try {
                    // Make a POST request to the backend
                    const response = fetch('http://localhost:5501/upload-course-assessment', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(answers)
                    });
                    window.location.href = 'sample-course.html';
                } catch (error) {
                    console.error('Error:', error);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
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