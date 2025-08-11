document.addEventListener('DOMContentLoaded', async ()=>{
    try {
        const response = await axios('/mecanico', {withCredentials: true});
        const data = response.data;
        document.querySelector('#nomeMecanico').textContent = data.mecanico.nome;
        try {
            const response = await axios('/veiculo', { withCredentials: true});
            const data = response.data;
            console.log(data)

            const tabela = document.querySelector('#tabela');
            data.forEach(vei => {
                const linha = document.createElement('tr');
                const td1 = document.createElement('td');
                const td2 = document.createElement('td');
                td1.textContent = vei.modelo;
                td2.textContent = vei.placa;
                linha.appendChild(td1);
                linha.appendChild(td2);
                tabela.appendChild(linha)
            });

        } catch (erro) {
            
        }
    } catch (erro) {
        alert('Precisa estar logado para acessar a página do mecânico.')
        window.location.href = '/';
    }
})

document.querySelector("#logout").addEventListener('click', async()=>{
    await axios.post('/logout')
        .then(()=>{
            window.location.href = '/'
        })
})