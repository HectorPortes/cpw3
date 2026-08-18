const musicas = [
{ id: 1, titulo: "Dark Red", artista: "Steve Lacy", nota: 10 },
{ id: 2, titulo: "Instant Crush", artista: "Daft Punk", nota: 9 },
{ id: 3, titulo: "Chop Suey!", artista: "System of a Down", nota: 8 },
{ id: 4, titulo: "Backstage", artista: "Matuê", nota: 7 }
];

GET /musicas → listar todas
GET /musicas/:id → buscar por id
GET /artista/:nome → listar músicas daquele artista
GET /top → nota >= 9