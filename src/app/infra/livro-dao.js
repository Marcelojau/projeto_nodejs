class LivroDao {

    constructor(db){
        this._db = db;
    }

    adiciona(livro){
        return new Promise((resolve, reject) => {
            this._db.run(
                `INSERT INTO livros (titulo, preco, descricao) Values (?,?,?)`
                , [ livro.titulo, livro.preco, livro.descricao ]
                , 
                function (err) {
                    if (err){
                        console.log(err);
                        return reject('Não foi possível adicionar o livro!');
                    }

                    resolve();
                }
            )
        });
    }

    lista(){
        return new Promise((resolve, reject) => {
            this._db.all(
                "SELECT * FROM livros", 
                (erro, resultados) => {
                    if (erro) return reject('Não foi possivel lista os livros!');

                    return resolve(resultados);
                })
        });
        
    }

    buscarPorId(id) {
        return new Promise((resolve, reject) => {
            this._db.get(`SELECT * FROM livros WHERE id = ? `, [id],
            (erro, livro ) => {
                if (erro)
                    return reject('Não foi possivel encontrar o livro esperado');
                
                return resolve(livro);
            });
        });
        
    }

    atualiza(livro) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `UPDATE livros SET
                 titulo = ? , preco = ?, descricao = ?
                 WHERE id = ? 
                `,[
                    livro.titulo
                    , livro.preco
                    , livro.descricao
                    , livro.id
                ],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possivel atualizar o livro');
                    }

                    return resolve();
                }
                )
        })
    }

    remover(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `DELETE FROM livros
                 WHERE id = ?
                `,[id],
                (erro) => {
                        if (erro) {
                            return reject('Não foi possivel remover o livro');
                        }

                        return resolve();
                    }
            );
        });
    }


}

module.exports  = LivroDao;