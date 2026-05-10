
let produtos = [
    { id: 1, nome: "Morango Orgânico", preco: "R$ 100,00", unidade: "kg", descricao: "Caixa com 20kg fresquinho.", imagem: "img/produtos/morango.avif", categoria: "frutas", vendedor: "Maria Oliveira", local: "Itapetininga, SP", telefone: "(15) 98877-5544" },
    { id: 2, nome: "Milho Verde", preco: "R$ 80,00", unidade: "saco", descricao: "Saco de 30kg de Milho Verde de alta qualidade.", imagem: "img/produtos/milho.jpg", categoria: "graos", vendedor: "José Mendes", local: "Sorocaba, SP", telefone: "(15) 99712-3344" },
    { id: 3, nome: "Alface", preco: "R$ 20,00", unidade: "kg", descricao: "Alface fresca e crocante.", imagem: "img/produtos/alface.jpeg", categoria: "verduras", vendedor: "Ana Silva", local: "Itapetininga, SP", telefone: "(15) 99654-2211" },
    { id: 4, nome: "Tomate", preco: "R$ 85,00", unidade: "kg", descricao: "Caixa com 20kg de Tomates vermelhos e suculentos.", imagem: "img/produtos/tomate.jpeg", categoria: "frutas", vendedor: "Carlos Pereira", local: "Piedade, SP", telefone: "(15) 99543-1122" },
    { id: 5, nome: "Abobrinha", preco: "R$ 60,00", unidade: "kg", descricao: "Caixa com 30kg de Abobrinha grande e de alta qualidade.", imagem: "img/produtos/abobrinha.jpg", categoria: "graos", vendedor: "Luciana Costa", local: "Salto, SP", telefone: "(15) 99432-3344" },
    { id: 6, nome: "Feijão", preco: "R$ 80,00", unidade: "kg", descricao: "saco de 20kg Feijão de alta qualidade.", imagem: "img/produtos/feijao.jpg", categoria: "graos", vendedor: "Laércio Dias", local: "Brigadeiro, SP", telefone: "(15) 99432-3344" },
    { id: 7, nome: "Batata Doce", preco: "R$ 75,00", unidade: "kg", descricao: "caixa com 35kg de Batata Doce bem grande de alta qualidade.", imagem: "img/produtos/batataDoce.jpeg", categoria: "verduras", vendedor: "Marcos Paulo", local: "Belo Horizonte, SP", telefone: "(15) 99432-3344" },
    { id: 8, nome: "Maça", preco: "R$ 90,00", unidade: "kg", descricao: "caixa com 35kg de Maças grandes de alta qualidade.", imagem: "img/produtos/macas.jpg", categoria: "frutas", vendedor: "Lucas Pereira", local: "Belo Horizonte, SP", telefone: "(15) 99432-3344" },
    { id: 9, nome: "Laranja", preco: "R$ 90,00", unidade: "kg", descricao: "caixa com 25kg de Laranja de alta qualidade.", imagem: "img/produtos/laranja.jpg", categoria: "frutas", vendedor: "Marcelo Santos", local: "Belo Horizonte, SP", telefone: "(15) 99432-3344" },
];

let usuarioLogado = null;

// Renderizar produtos
function renderProducts(filteredProducts) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center py-12"><p class="text-xl">Nenhum produto encontrado para esta busca.</p></div>`;
        return;
    }

    filteredProducts.forEach(p => {
        grid.innerHTML += `
        <div onclick="showProductDetail(${p.id})" class="product-card bg-white border rounded-3xl overflow-hidden cursor-pointer">
            <img src="${p.imagem}" class="w-full h-56 object-cover" alt="${p.nome}">
            <div class="p-5">
                <div class="flex justify-between items-start">
                    <h4 class="font-semibold text-lg">${p.nome}</h4>
                    <p class="text-emerald-600 font-bold">${p.preco}</p>
                </div>
                <p class="text-sm text-gray-500 mt-1">${p.descricao}</p>
                <p class="text-xs text-emerald-600 mt-3">${p.local}</p>
            </div>
        </div>`;
    });
}

// Busca funcional
function handleSearch() {
    const termo = document.getElementById('search-input').value.toLowerCase().trim();
    if (!termo) {
        renderProducts(produtos);
        return;
    }

    const filtrados = produtos.filter(p => 
        p.nome.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo)
    );

    renderProducts(filtrados);
    navigateToSection('comprar');
}

// Navegação
function navigateToSection(section) {
    document.querySelectorAll('section').forEach(s => s.classList.add('hidden'));
    const target = document.getElementById(section);
    if (target) target.classList.remove('hidden');
    
    if (section === 'comprar') renderProducts(produtos);
}

// Anunciar (verifica login)
function handleAnunciarClick() {
    if (!usuarioLogado) {
        if (confirm("Para anunciar é necessário estar logado.\n\nDeseja ir para a página de login?")) {
            window.location.href = "login.html";
        }
        return;
    }
    alert("Funcionalidade de Anunciar será implementada em breve.");
}

// Cadastro
function handleCadastro(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (nome && email && senha) {

        fetch('http://localhost:3000/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta do servidor:', data);
            if (data.validade === false) {
                alert('Cadastro já presente no sistema!');
                return;
            }
            alert(`✅ Cadastro realizado com sucesso!\n\nBem-vindo, ${nome}!`);
            window.location.href = "index.html";
            usuarioLogado = { email, nome: data.nome };
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        })
        .catch(error => {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário. Verifique o console para detalhes.');
        });
    }
}

// Login
function handleLogin(e) {
    
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;
    
    if (email && senha) {
        fetch('http://localhost:3000/login', {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, senha })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Resposta do servidor:', data);
            if (data.validade === false) {
                alert('Email ou senha incorretos!');
                return;
            }
            alert(`Login realizado com sucesso!\n\nBem-vindo, ${data.nome}!`);
            usuarioLogado = { email, nome: data.nome };
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login. Verifique o console para detalhes.');
        });
    }
}

// Logout
function logout() {
    usuarioLogado = null;
    localStorage.removeItem('usuarioLogado');
    window.location.href = "index.html";
}

// Inicialização
function init() {
    // Verificar se usuário está logado
    const savedUser = localStorage.getItem('usuarioLogado');
    if (savedUser !== null) {
        updateUserUI();
    }
    
    renderProducts(produtos);
}

window.onload = init;


