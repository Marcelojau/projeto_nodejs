const {check}  = require('express-validator/check');
class Livro{
    static validacoes(){
        return [
            check('titulo').isLength({min: 5}).withMessage('Minimo de caracteres é 5'),
            check('preco').isCurrency().withMessage('O preço precisa ter um valor monetario válido')
        ]
    }
}
module.exports = Livro;