window.onload = () => {
    const userId = sessionStorage.getItem('userId');

    if (!userId) {
        window.location.href = 'login.html';
    } else if (userId) {
        fetch(`http://localhost:5501/get-username?uid=${userId}`)
            .then(resp => resp.json())
            .then(data => {
                const user = data.username;
                document.getElementById('Greeting').innerText = 'Good Afternoon, ' + user + '.';
            })
            .catch(error => {
                console.error("Error:", error);
            });
    }
}