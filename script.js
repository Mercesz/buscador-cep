const botao = document.getElementById('buscar');
const resultado = document.getElementById('resultado');

const buscarCep = async () => {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');

    if (cep.length !== 8) {
        resultado.innerHTML = 'Digite um CEP válido com 8 números!'
        return
    }

    try {

        resultado.innerHTML = 'Buscando...'

        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            resultado.innerHTML = 'CEP não encontrado!';
            return;
        }
        
        resultado.innerHTML = `
        <p>Logradouro: ${dados.logradouro}</p>
        <p>Bairro: ${dados.bairro}</p>
        <p>Cidade: ${dados.localidade}</p>
        <p>Estado: ${dados.uf}</p>
        `
    } catch (erro) {
        resultado.innerHTML = 'Erro ao buscar o CEP. Tente novamente.'
    }
}

botao.addEventListener('click', buscarCep)