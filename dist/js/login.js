const loginButton = document.getElementById('loginButton');
// listen to "enter" key press as well
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        loginButton.click();
    }
});

loginButton.addEventListener('click', function () {

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5501/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.uid) {
           sessionStorage.setItem('userId', data.uid);
           // check user name
           
           window.location.href = 'profile.html'
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
