const login = document.querySelector('#login');

login.addEventListener('click', () => {
    const username = document.querySelector('#username').value;

    if (username !== "") {
        document.cookie = `username=${username}`;
        document.location.href = "/";
    } else {
        alert('Please, write your username');
    }
});

