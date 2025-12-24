descricoes = {
    "Node.js": "Node.js é um ambiente de execução JavaScript server-side, que utilizo para criar APIs escaláveis e de alta performance.",
    "TypeScript": "TypeScript é um superset do JavaScript que adiciona tipagem estática, garantindo código mais seguro e manutenível.",
    "Prisma": "Prisma é um ORM moderno para Node.js e TypeScript, que facilita a modelagem de dados e interações com o banco de dados.",
    "PostgreSQL": "PostgreSQL é um poderoso sistema de banco de dados relacional open source, conhecido por sua robustez e conformidade com SQL.",
    "Django": "Django é um framework web, escrito em Python, que segue o padrão de projeto 'MTV'; tendo como principal função para mim, o desenvolvimento de API's.",
    "Docker": "Docker é uma plataforma automatiza a implantação de aplicativos dentro de contêineres de software, fornecendo uma camada adicional de abstração.",
    "Linux": "Linux é um sistema operacional de código aberto,  essencial quando o assunto são servidores, o que o torna indispensável para um desenvolvedor backend.",
    "MongoDB": "MongoDB é um software de banco de dados orientado a documentos livre (não relacional). O MongoDB usa de documentos semelhantes a JSON com esquemas.",
}


function mostrarDescricao(tec) {
    document.getElementById("prof-name").innerHTML = tec;
    document.getElementById("descricao").innerHTML = descricoes[tec];
}
