const resposta = document.getElementById('resposta')
const btn_login = document.getElementById('btn_login')

btn_login.addEventListener('click', (e)=>{
    e.preventDefault()
 
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const valores = {
        email: email,
        senha: senha
    }
    
    fetch('http://localhost:3000/login',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(valores)
    })
    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ``
        resposta.innerHTML = `<P>${dados.message}<p>`
        localStorage.setItem(dados.token)
        location.href = `index.html`
    })
    .catch((err)=>{
        console.error('erro ao cadastrar')
    })
})