// if user clicks submit, send the data to the database
// else if user skips, send the data to the database with an empty string
// then return to login page

const submitButton = document.getElementById('submitButton');
const skipButton = document.getElementById('skipButton');

submitButton.addEventListener('click', function () {

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
                    question_one_ans: Array.from(document.querySelectorAll('input[name="q1"]:checked'))
                                        .map(input => input.value)
                                        .join(', '),
                    question_two_ans: Array.from(document.querySelectorAll('input[name="q2"]:checked'))
                                        .map(input => input.value)
                                        .join(', '),
                    question_three_ans: document.getElementById('q3').value,
                    question_four_ans: document.querySelector('input[name="q4"]:checked')?.value || '',
                    question_five_ans: document.getElementById('q5').value
                };
                console.log(answers);
                try {
                    // Make a POST request to the backend
                    const response = fetch('http://localhost:5501/upload-interest', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(answers)
                    });
                    window.location.href = 'profile.html';
                } catch (error) {
                    console.error('Error:', error);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    //  -----------------------------------------------------------------------

    

    // --------------------------------------------------------------------

    // code
    alert("You have completed the interest assessment!\nRecommendations will be tailored on your interests.");
    // alert("Please login again to view your recommendations.")
    // window.location.href = 'profile.html';
});

skipButton.addEventListener('click', function () {
    // code
    alert("You have skipped the interest assessment!\nRecommendations will be shuffled.");
    window.location.href = 'profile.html';
});