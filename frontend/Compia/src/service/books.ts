export const initialBooks = [
    // --- INTELIGÊNCIA ARTIFICIAL ---
    { 
        id: 1, title: "IA: Uma Abordagem Moderna", author: "Stuart Russell", 
        price: 250.00, oldPrice: 300.00, isNew: true,
        tags: [{ label: "IA", colorClass: "bg-purple-100 text-purple-700" }, { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9788535237016-L.jpg",
        description: "A edição mais abrangente sobre Inteligência Artificial, oferecendo uma introdução unificada à teoria e prática da IA, desde machine learning até robótica e PLN.",
        pages: 1056, language: "Português", year: 2013
    },
    { 
        id: 2, title: "Superinteligência", author: "Nick Bostrom", 
        price: 65.90, isNew: false,
        tags: [{ label: "IA", colorClass: "bg-purple-100 text-purple-700" }, { label: "E-BOOK", colorClass: "bg-green-50 text-green-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/8594540604-L.jpg",
        description: "Nick Bostrom argumenta que o destino da humanidade dependerá das ações de uma superinteligência artificial. Uma leitura essencial sobre os riscos e o futuro tecnológico.",
        pages: 352, language: "Português", year: 2018
    },
    { 
        id: 3, title: "Life 3.0", author: "Max Tegmark", 
        price: 79.90, isNew: true,
        tags: [{ label: "IA", colorClass: "bg-purple-100 text-purple-700" }, { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781101946596-L.jpg",
        description: "O que significa ser humano na era da IA? Tegmark explora como a inteligência artificial vai impactar a guerra, a justiça, a sociedade e nossa própria existência.",
        pages: 384, language: "Inglês", year: 2017
    },
    { 
        id: 4, title: "Deep Learning", author: "Ian Goodfellow", 
        price: 310.00, oldPrice: 350.00, isNew: false,
        tags: [{ label: "IA", colorClass: "bg-purple-100 text-purple-700" }, { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9780262035613-L.jpg",
        description: "O livro definitivo sobre Deep Learning. Uma referência matemática e conceitual profunda para entender redes neurais, otimização e modelos generativos.",
        pages: 800, language: "Inglês", year: 2016
    },
    { 
        id: 5, title: "Machine Learning", author: "Tom Mitchell", 
        price: 180.00, oldPrice: 210.00, isNew: false,
        tags: [{ label: "IA", colorClass: "bg-purple-100 text-purple-700" }, { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9780070428072-L.jpg",
        description: "Um livro clássico e fundamental. Apresenta os conceitos principais e as técnicas de Aprendizado de Máquina, desde árvores de decisão até redes bayesianas.",
        pages: 432, language: "Inglês", year: 1997
    },
    { 
        id: 6, title: "Rebooting AI", author: "Gary Marcus", 
        price: 85.50, isNew: true,
        tags: [{ label: "IA", colorClass: "bg-purple-100 text-purple-700" }, { label: "E-BOOK", colorClass: "bg-green-50 text-green-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781524748258-L.jpg",
        description: "Os autores oferecem um olhar crítico sobre o estado atual da IA, apontando as falhas dos modelos baseados puramente em dados e propondo caminhos para uma IA confiável.",
        pages: 288, language: "Inglês", year: 2019
    },
    {
        id: 7, title: "Utilização de ML em elementos textuais geográficos", author: "Matheus Emerick de Magalhães", 
        price: 60.00, isNew: false,
        tags: [{ label: "IA", colorClass: "bg-purple-100 text-purple-700" }, { label: "E-BOOK", colorClass: "bg-green-50 text-green-600" }],
        imageUrl: "https://covers.openlibrary.org/b/olid/OL45635391M-L.jpg",
        description: "Estudo acadêmico rigoroso detalhando o processo de aplicação e treinamento de modelos de Machine Learning para a interpretação de coordenadas e dados geográficos textuais.",
        pages: 145, language: "Português", year: 2021
    },

    // --- ARQUITETURA DE SOFTWARE ---
    { 
        id: 8, title: "Clean Architecture", author: "Robert C. Martin", 
        price: 195.00, oldPrice: 220.00, isNew: true,
        tags: [{ label: "ARQUITETURA", colorClass: "bg-indigo-100 text-indigo-700" }, { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9780134494166-L.jpg",
        description: "O guia absoluto do Uncle Bob sobre estruturação de software. Aprenda a separar a regra de negócio dos detalhes e criar sistemas facilmente testáveis e manuteníveis.",
        pages: 432, language: "Inglês", year: 2017
    },
    { 
        id: 9, title: "Design Patterns", author: "Erich Gamma et al.", 
        price: 210.50, isNew: false,
        tags: [{ label: "ARQUITETURA", colorClass: "bg-indigo-100 text-indigo-700" }, { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg",
        description: "O famoso livro do 'Gang of Four'. Ele cataloga 23 padrões de projeto orientados a objetos fundamentais que todo arquiteto e engenheiro de software precisa dominar.",
        pages: 416, language: "Inglês", year: 1994
    },
    { 
        id: 10, title: "Microservices Patterns", author: "Chris Richardson", 
        price: 95.00, isNew: false,
        tags: [{ label: "ARQUITETURA", colorClass: "bg-indigo-100 text-indigo-700" }, { label: "E-BOOK", colorClass: "bg-green-50 text-green-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781617294549-L.jpg",
        description: "Soluções práticas, padrões de design arquitetural e estratégias de transição para quem precisa refatorar aplicações monolíticas gigantescas em microsserviços modernos.",
        pages: 520, language: "Inglês", year: 2018
    },
    { 
        id: 15, title: "Building Microservices", author: "Sam Newman", 
        price: 85.00, oldPrice: 110.00, isNew: true,
        tags: [{ label: "ARQUITETURA", colorClass: "bg-indigo-100 text-indigo-700" }, { label: "E-BOOK", colorClass: "bg-green-50 text-green-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781492034025-L.jpg",
        description: "Segunda edição ampliada sobre arquitetura distribuída. Aborda desde as tecnologias de infraestrutura e orquestração até alinhamento organizacional e integração de banco de dados.",
        pages: 612, language: "Inglês", year: 2021
    },
    { 
        id: 18, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", 
        price: 245.00, oldPrice: 280.00, isNew: true,
        tags: [{ label: "ARQUITETURA", colorClass: "bg-indigo-100 text-indigo-700" }, { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781449373320-L.jpg",
        description: "Um guia profundo sobre como construir sistemas escaláveis e confiáveis. Explora os prós e contras de diferentes tecnologias de banco de dados e arquiteturas distribuídas complexas.",
        pages: 616, language: "Inglês", year: 2017
    },

    // --- CIBERSEGURANÇA ---
    { 
        id: 11, title: "The Web Application Hacker's Handbook", author: "Dafydd Stuttard", 
        price: 280.00, oldPrice: 320.00, isNew: false,
        tags: [{ label: "SEGURANÇA", colorClass: "bg-red-100 text-red-700" }, { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781118026472-L.jpg",
        description: "Um guia prático sobre como encontrar e explorar vulnerabilidades em aplicações web modernas. Leitura obrigatória para pentesters e engenheiros de segurança de sistemas.",
        pages: 912, language: "Inglês", year: 2011
    },
    { 
        id: 12, title: "Hacking: The Art of Exploitation", author: "Jon Erickson", 
        price: 75.00, isNew: true,
        tags: [{ label: "SEGURANÇA", colorClass: "bg-red-100 text-red-700" }, { label: "E-BOOK", colorClass: "bg-green-50 text-green-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781593271442-L.jpg",
        description: "Em vez de apenas usar exploits prontos, este livro ensina a ciência por trás da exploração de falhas em C, engenharia reversa e arquitetura de rede em baixo nível.",
        pages: 488, language: "Inglês", year: 2008
    },
    { 
        id: 16, title: "Practical Malware Analysis", author: "Michael Sikorski", 
        price: 195.00, isNew: false,
        tags: [{ label: "SEGURANÇA", colorClass: "bg-red-100 text-red-700" }, { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781593272906-L.jpg",
        description: "O guia prático para dissecar softwares maliciosos. Ensina desde a configuração de um ambiente de laboratório seguro até análise estática, dinâmica e depuração avançada.",
        pages: 802, language: "Inglês", year: 2012
    },
    { 
        id: 19, title: "Social Engineering: The Science of Human Hacking", author: "Christopher Hadnagy", 
        price: 120.00, isNew: false,
        tags: [{ label: "SEGURANÇA", colorClass: "bg-red-100 text-red-700" }, { label: "E-BOOK", colorClass: "bg-green-50 text-green-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781119433385-L.jpg",
        description: "Foca no elo mais fraco da segurança: o ser humano. O livro detalha técnicas de manipulação psicológica, pretexto, e como defender sua organização contra ataques de engenharia social.",
        pages: 320, language: "Inglês", year: 2018
    },

    // --- BLOCKCHAIN ---
    { 
        id: 13, title: "Mastering Bitcoin", author: "Andreas M. Antonopoulos", 
        price: 150.00, isNew: false,
        tags: [{ label: "BLOCKCHAIN", colorClass: "bg-yellow-100 text-yellow-700" }, { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781491954386-L.jpg",
        description: "A bíblia técnica do Bitcoin. Ideal para desenvolvedores e arquitetos que querem entender redes peer-to-peer, criptografia assimétrica e a verdadeira mecânica do consenso.",
        pages: 410, language: "Inglês", year: 2017
    },
    { 
        id: 14, title: "Mastering Ethereum", author: "Andreas M. Antonopoulos", 
        price: 89.90, isNew: true,
        tags: [{ label: "BLOCKCHAIN", colorClass: "bg-yellow-100 text-yellow-700" }, { label: "E-BOOK", colorClass: "bg-green-50 text-green-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781491971949-L.jpg",
        description: "Guia profundo para desenvolvedores interessados em construir contratos inteligentes (smart contracts) e aplicações descentralizadas (DApps) eficientes usando a linguagem Solidity.",
        pages: 424, language: "Inglês", year: 2018
    },
    { 
        id: 17, title: "Token Economy", author: "Shermin Voshmgir", 
        price: 65.00, isNew: true,
        tags: [{ label: "BLOCKCHAIN", colorClass: "bg-yellow-100 text-yellow-700" }, { label: "E-BOOK", colorClass: "bg-green-50 text-green-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9783982103815-L.jpg",
        description: "Como a Web3 reinventou a internet. Este livro mergulha na teoria dos jogos, criptoeconomia, tokens não fungíveis (NFTs) e organizações autônomas descentralizadas (DAOs).",
        pages: 374, language: "Inglês", year: 2020
    },
    { 
        id: 20, title: "Grokking Bitcoin", author: "Kalle Rosenbaum", 
        price: 85.00, oldPrice: 95.00, isNew: true,
        tags: [{ label: "BLOCKCHAIN", colorClass: "bg-yellow-100 text-yellow-700" }, { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781617294648-L.jpg",
        description: "Uma explicação visual e didática do funcionamento do Bitcoin. Sem exigir conhecimentos prévios de criptografia avançada, ensina arquitetura de mineração, carteiras e transações seguras.",
        pages: 400, language: "Inglês", year: 2019
    }
];