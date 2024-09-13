const express = require('express')
const router = express.Router()
const Produtocontroller = require('../controllers/Produtoscontroller')


router.post('/excluir', Produtocontroller.excluirserviçospost)
router.post('/editar',Produtocontroller.editarserviçospost)
router.get('/editar/:id', Produtocontroller.editarserviços)
router.post('/cadastrar', Produtocontroller.cadastrarServiçosPost)
router.get('/cadastrar', Produtocontroller.cadastrarServiços)
router.get('/servicos', Produtocontroller.mostrarServicos)
router.get('/', Produtocontroller.mostrarprodutos)


module.exports = router;