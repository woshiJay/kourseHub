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
                    question_two_ans: document.querySelector('input[name="q2"]:checked')?.value || '',
                    question_three_ans: document.querySelector('input[name="q3"]:checked')?.value || '',
                    question_four_ans: document.querySelector('input[name="q4"]:checked')?.value || '',
                    question_five_ans: document.getElementById('q5').value
                };
                
                try {
                    // Make a POST request to the backend
                    const response = fetch('http://localhost:5501/upload-interest', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(answers)
                    });

                    const result = response.json();

                    if (response.ok) {
                        alert('Data submitted successfully');
                        console.log(result);
                    } else {
                        alert('Failed to submit data');
                        console.error(result);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }

    // Gather answers from the form
    // const answers = {
    //     user_name:"user",
    //     question_one_ans: Array.from(document.querySelectorAll('input[name="q1"]:checked'))
    //                           .map(input => input.value)
    //                           .join(', '),
    //     question_two_ans: document.querySelector('input[name="q2"]:checked')?.value || '',
    //     question_three_ans: document.querySelector('input[name="q3"]:checked')?.value || '',
    //     question_four_ans: document.querySelector('input[name="q4"]:checked')?.value || '',
    //     question_five_ans: document.getElementById('q5').value
    // };
    
    // try {
    //     // Make a POST request to the backend
    //     const response = fetch('http://localhost:5501/upload-interest', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(answers)
    //     });

    //     const result = response.json();

    //     if (response.ok) {
    //         alert('Data submitted successfully');
    //         console.log(result);
    //     } else {
    //         alert('Failed to submit data');
    //         console.error(result);
    //     }
    // } catch (error) {
    //     console.error('Error:', error);
    // }

    

    // code
    alert("You have completed the interest assessment!");
    alert("Recommendations will be tailored on your interests.")
    alert("Please login again to view your recommendations.")
    // window.location.href = 'login.html';
});

skipButton.addEventListener('click', function () {
    // code
    alert("You have skipped the interest assessment!");
    alert("Recommendations will be shuffled.")
    alert("Please login again to view your recommendations.")
    window.location.href = 'login.html';
});