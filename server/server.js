const http = require("http");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("easyAccess.db", (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Conexão estabelecida com sucesso.");
    }
});

db.run(
    `CREATE TABLE IF NOT EXISTS Local(
        EstabelecimentoID INTEGER PRIMARY KEY AUTOINCREMENT,
        EstabelecimentoName TEXT,
        Endereco TEXT,
        Acessibilidade TEXT,
        Telefone TEXT,
        Latitude REAL,
        Longitude REAL
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
    `INSERT INTO Local (EstabelecimentoName, Endereco, Acessibilidade, Telefone, Latitude, Longitude)
     VALUES (?, ?, ?, ?, ?, ?)`,
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
         Telefone = ?,
         Latitude = ?,
         Longitude = ?
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
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
        return;
    }

    if (req.method === "GET") {
        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const filters = {
            name: parsedUrl.searchParams.get('name'),
            endereco: parsedUrl.searchParams.get('endereco'),
            accessibility: parsedUrl.searchParams.get('accessibility'),
        };

        search(filters, (result) => {
            res.write(JSON.stringify(result));
            res.end();
        });
    } else if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            // Deserializa as informações.
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            insertData.run(
                parsedBody.EstabelecimentoName,
                parsedBody.Endereco,
                parsedBody.Acessibilidade,
                parsedBody.Telefone,
                parsedBody.Latitude,
                parsedBody.Longitude
            );
            console.log("Dados criados com sucesso.");

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "POST");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.end("Dados criados com sucesso.");
        });
    } else if (req.method === "DELETE") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            deleteData.run(parsedBody.EstabelecimentoID);
            console.log("Dados excluídos com sucesso.");

            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "DELETE");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.end("Dados excluídos com sucesso.");
        });
    } else if (req.method === "PUT") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = JSON.parse(body);
            modifyData.run(
                parsedBody.EstabelecimentoName,
                parsedBody.Endereco,
                parsedBody.Acessibilidade,
                parsedBody.Telefone,
                parsedBody.EstabelecimentoID
            );
            console.log("Dados modificados com sucesso.");
    
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Methods", "PUT");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            res.end("Dados modificados com sucesso.");
        });
    } else {
        res.statusCode = 404;
        res.end("Not Found");
    }
});

const port = 3002;
server.listen(port);
console.log(`Servidor escutando no porta ${port}`)