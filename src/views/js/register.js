const login = document.querySelector('#login');

login.addEventListener('click', () => {
    const user = document.querySelector('#username').value;

    if (user != "") {
        document.cookie = `username=${user}`
        document.location.href="../"
    } else alert ('Please, write your username')
    
})
