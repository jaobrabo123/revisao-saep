const email = document.querySelector('#email');
const senha = document.querySelector('#senha')
const login = document.querySelector('#logar')

login.addEventListener('click', async () => {
    if (!email.value || !senha.value) return alert('Preencha todos os campos');
    try {
        await axios.post('/login', {
            email: email.value,
            senha: senha.value
        }, { withCredentials: true })
        window.location.href = '/veiculos';
    } catch (erro) {
        alert(erro.response.data.error)
    }
})