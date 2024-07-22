const login = document.querySelector('#login');

login.addEventListener('click', () => {
    const username = document.querySelector('#username').value;

    if (username !== "") {
        document.cookie = `username=${username}; path=/`;
        document.location.href = "/chat";
    } else {
        alert('Please, write your username');
    }
});

