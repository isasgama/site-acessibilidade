const http = require("http");
const sqlite3 = require("sqlite3").verbose();

// Cria uma conexão com o banco de dados easyAccess.db
const db = new sqlite3.Database("easyAccess.db", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Conexão estabelecida com sucesso.")
    }
});

// Cria Tabela Local
db.run(
    `CREATE TABLE IF NOT EXISTS Local(
        EstabelecimentoID INTEGER PRIMARY KEY AUTOINCREMENT,
        EstabelecimentoName TEXT,
        Endereco TEXT,
        Acessibilidade TEXT,
        Telefone TEXT
    )`,
    (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Tabela criada com sucesso.");
        }
    }
);

// Realiza uma consulta de todas as informações da tabela local.
const search = (callback) => {
    db.all("SELECT * FROM Local", (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            callback(rows);
        }
    });
};

const filterData = (name, accessibility, callback) => {
    let sql = "SELECT * FROM Local";
    let params = [];

    if (!name && !accessibility) {
        callback([]); // Retorna uma lista vazia se nenhum filtro for fornecido
        return;
    }

    sql += " WHERE ";
    let conditions = [];

    if (name) {
        conditions.push("EstabelecimentoName LIKE ?");
        params.push(`%${name}%`);
    }

    if (accessibility) {
        conditions.push("Acessibilidade = ?");
        params.push(accessibility);
    }

    sql += conditions.join(" AND ");

    db.all(sql, params, (err, rows) => {
        if (err) {
            console.error(err);
        } else {
            callback(rows);
        }
    });
};

// Prepara uma consulta para adicionar dados ao nosso bd.
const insertData = db.prepare(
    `INSERT INTO Local (EstabelecimentoName, Endereco, Acessibilidade, Telefone)
    VALUES (?, ?, ?, ?)`,
    (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Dados inseridos com sucesso.");
        }
    }
);

// Prepara uma consulta para excluir dados do bd.
const deleteData = db.prepare(
    `DELETE FROM Local WHERE EstabelecimentoID == ?`,
    (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Dados excluídos com sucesso.");
        }
    }
);

// Prepara uma consulta para modificar os dados do bd.
const modifyData = db.prepare(
    `UPDATE Local
      SET EstabelecimentoName = ?,
          Endereco = ?,
          Acessibilidade = ?,
          Telefone = ?
      WHERE EstabelecimentoID = ?`,
    (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Dados modificados com sucesso.");
        }
    }
);

const server = http.createServer((req, res) => {
    // Para permitir os CORS e que não tenha problema en este exemplo.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // Retorna todas as informações para o servidor.
    search((result) => {
        res.write(JSON.stringify(result));
        res.end();
    });

    // if (req.method === "GET") {
    //     const url = new URL(req.url, `http://${req.headers.host}`);
    //     const name = url.searchParams.get("name");
    //     const accessibility = url.searchParams.get("accessibility");

    //     filterData(name, accessibility, (result) => {
    //         res.write(JSON.stringify(result));
    //         res.end();
    //     });
    // }

    // Verifica se é uma solicitação com o método POST.
    if (req.method === "POST") {
        let body = "";
        // Recebe as informações enviadas para o servidor.
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            // Deserializa as informações.
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            // Usa a consulta preparada para inserir os dados recebidos do Frontend.
            insertData.run(
                parsedBody.EstabelecimentoName,
                parsedBody.Endereco,
                parsedBody.Acessibilidade,
                parsedBody.Telefone,
            );
            console.log("Dados criados com sucesso.");
        });


        // Verifica se é uma solicitação com o método DELETE.
    } else if (req.method === "DELETE") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            // Usamos a consulta preparada para excluir os dados que o Frontend indicar.
            deleteData.run(parsedBody.EstabelecimentoID);
            console.log("Dados excluídos com sucesso.");
        });
        // Verifica se é uma solicitação com o método PUT.
    } else if (req.method === "PUT") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            // Usamos a consulta preparada para modificar os dados recebidos do Frontend.
            modifyData.run(
                parsedBody.EstabelecimentoName,
                parsedBody.Endereco,
                parsedBody.Acessibilidade,
                parsedBody.Telefone,
            );
            console.log("Dados modificados com sucesso.");
        });
    }

});

const port = 3002;
server.listen(port);
console.log(`Servidor escutando no porta ${port}`)