const http = require("http");
const sqlite3 = require("sqlite3").verbose();

// Cria uma conexão com o banco de dados easyAccess.db
const db = new  sqlite3.Database("easyAccess.db", (err)=>{
    if(err){
        console.error(err);
    }else{
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
    (err)=>{
        if(err){
            console.error(err);
        }else{
            console.log("Tabela criada com sucesso.");
        }
    }
);

// Realiza uma consulta de todas as informações da tabela local.
const search = (callback)=>{
    db.all("SELECT * FROM Local", (err, rows)=>{
        if(err){
            console.error(err);
        }else{
            callback(rows);
        }
    });
};

// Prepara uma consulta para adicionar dados ao nosso bd.
const insertData = db.prepare(
    `INSERT INTO Local (EstabelecimentoName, Endereco, Acessibilidade, Telefone)
    VALUES (?, ?, ?, ?, ?)`,
    (err)=>{
        if(err){
            console.error(err);
        }else{
            console.log("Dados inseridos com sucesso.");
        }
    }
);

// Prepara uma consulta para excluir dados do bd.
const deleteData = db.prepare(
    `DELETE FROM Local WHERE EstabelecimentoID == ?`,
    (err)=>{
        if(err){
            console.error(err);
        }else{
            console.log("Dados excluídos com sucesso.");
        }
    }
);

// Prepara uma consulta para modificar os dados do bd.
const modifyData = db.prepare(
    `UPDATE Produtos
      SET EstabelecimentoName = ?,
          Endereco TEXT = ?,
          Acessibilidade TEXT = ?,
          Telefone TEXT,
     WHERE EstabelecimentoID = ?`,
     (err)=>{
        if(err){
            console.error(err);
        }else{
            console.log("Dados modificados com sucesso.");
        }
     }
);

const server = http.createServer((req, res)=>{
    // Para permitir os CORS e que não tenha problema en este exemplo.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    // Retorna todas as informações para o servidor.
    search((result)=>{
        res.write(JSON.stringify(result));
        res.end();
    });


    // Verifica se é uma solicitação com o método POST.
    if(req.method === "POST"){
        let body = "";
        // Recebe as informações enviadas para o servidor.
        req.on("data", (chunk)=>{
            body += chunk;
        });
        req.on("end", ()=>{
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
    }else if(req.method === "DELETE"){
        let body = "";
        req.on("data", (chunk)=>{
            body += chunk;
        });
        req.on("end", ()=>{
            const parsedBody = JSON.parse(body);
            console.log(parsedBody);
            // Usamos a consulta preparada para excluir os dados que o Frontend indicar.
            deleteData.run(parsedBody.EstabelecimentoID);
            console.log("Dados excluídos com sucesso.");
        });
    // Verifica se é uma solicitação com o método PUT.
    }else if(req.method === "PUT"){
        let body = "";
        req.on("data", (chunk)=>{
            body += chunk;
        });
        req.on("end", ()=>{
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

const port = 3001;
server.listen(port);
console.log(`Servidor escutando no porta ${port}`)