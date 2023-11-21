const http = require("http");
const url = require("url");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("easyAccess.db", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Conexão estabelecida com sucesso.");
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
const search = (filters, callback) => {
    let sql = "SELECT * FROM Local WHERE 1";
    const params = [];

    if (filters.name) {
        sql += " AND EstabelecimentoName LIKE ?";
        params.push(`%${filters.name}%`);
    }

    if (filters.endereco) {
        sql += " AND Endereco LIKE ?";
        params.push(`%${filters.endereco}%`);
    }

    if (filters.accessibility) {
        sql += " AND Acessibilidade LIKE ?";
        params.push(`%${filters.accessibility}%`);
    }

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
    // Para permitir os CORS e evitar problemas neste exemplo.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Verifica se é uma solicitação com o método GET.
    if (req.method === "GET") {
        // Obtém os filtros da URL
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const filters = {
            name: parsedUrl.searchParams.get('name'),
            endereco: parsedUrl.searchParams.get('endereco'),
            accessibility: parsedUrl.searchParams.get('accessibility'),
        };

        // Retorna as informações filtradas para o servidor.
        search(filters, (result) => {
            res.write(JSON.stringify(result));
            res.end();
        });
    } else if (req.method === "POST") {
        // Verifica se é uma solicitação com o método POST.
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

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.end("Dados criados com sucesso.");
        });
    } else if (req.method === "DELETE") {
        // Verifica se é uma solicitação com o método DELETE.
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

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.end("Dados excluídos com sucesso.");
        });
    } else if (req.method === "PUT") {
        // Verifica se é uma solicitação com o método PUT.
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

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "PUT");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.end("Dados modificados com sucesso.");
        });
    } else {
        // Caso não seja nenhum dos métodos acima, retorna 404 Not Found.
        res.statusCode = 404;
        res.end("Not Found");
    }
});

const port = 3002;
server.listen(port);
console.log(`Servidor escutando no porta ${port}`)