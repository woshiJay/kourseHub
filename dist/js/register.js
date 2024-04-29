const registrationButton = document.getElementById('registrationButton');
// listen to "enter" key press as well
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        registrationButton.click();
    }
});
registrationButton.addEventListener('click', function () {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    fetch('http://localhost:5501/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password }),
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.redirect) {
            window.location.href = data.redirect;
        } else if (data.alert) {
            alert(data.alert);
        } else {
            alert('Error occurred!');
        }
    })
    .catch(error => {
        console.error("Error:", error);
    })
});