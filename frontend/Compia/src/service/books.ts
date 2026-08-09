export const initialBooks = [
    { 
        id: 1, 
        title: "IA: Uma Abordagem Moderna", 
        author: "Stuart Russell", 
        price: 250.00, 
        oldPrice: 300.00,
        isNew: true,
        tags: [
            { label: "BEST SELLER", colorClass: "bg-blue-100 text-blue-700" },
            { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }
        ],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9788535237016-L.jpg" 
    },
    { 
        id: 2, 
        title: "Superinteligência", 
        author: "Nick Bostrom", 
        price: 65.90, 
        isNew: false,
        tags: [
            { label: "FILOSOFIA", colorClass: "bg-purple-100 text-purple-700" },
            { label: "E-BOOK", colorClass: "bg-green-50 text-green-600" }
        ],
        imageUrl: "https://covers.openlibrary.org/b/isbn/8594540604-L.jpg" 
    },
    { 
        id: 3, 
        title: "Life 3.0", 
        author: "Max Tegmark", 
        price: 79.90, 
        isNew: true,
        tags: [
            { label: "IA", colorClass: "bg-purple-50 text-purple-600" },
            { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }
        ],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781101946596-L.jpg" 
    },
    { 
        id: 4, 
        title: "Deep Learning", 
        author: "Ian Goodfellow", 
        price: 310.00, 
        oldPrice: 350.00,
        isNew: false,
        tags: [
            { label: "TÉCNICO", colorClass: "bg-gray-200 text-gray-800" },
            { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }
        ],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9780262035613-L.jpg" 
    },
    { 
        id: 5, 
        title: "Machine Learning", 
        author: "Tom Mitchell", 
        price: 180.00, 
        oldPrice: 210.00,
        isNew: false,
        tags: [
            { label: "IA", colorClass: "bg-purple-50 text-purple-600" },
            { label: "FÍSICO", colorClass: "bg-blue-50 text-blue-600" }
        ],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9780070428072-L.jpg" 
    },
    { 
        id: 6, 
        title: "Rebooting AI", 
        author: "Gary Marcus", 
        price: 85.50, 
        isNew: true,
        tags: [
            { label: "CRÍTICA", colorClass: "bg-orange-100 text-orange-700" },
            { label: "E-BOOK", colorClass: "bg-green-50 text-green-600" }
        ],
        imageUrl: "https://covers.openlibrary.org/b/isbn/9781524748258-L.jpg" 
    },
    {
        id: 7,
        title: "Utilização de ML em elementos textuais geográficos",
        author: "Matheus Emerick de Magalhães",
        price: 60.00,
        isNew: false,
        tags: [
            { label: "TESE", colorClass: "bg-green-100 text-green-700" },
            { label: "PDF", colorClass: "bg-red-50 text-red-600" }
        ],
        imageUrl: "https://covers.openlibrary.org/b/olid/OL45635391M-L.jpg"
    }
];