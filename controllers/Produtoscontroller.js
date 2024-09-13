const Produto = require('../models/Produto')

class Produtocontroller{
    static async mostrarprodutos(req,res){
        res.render('produtos/home')

    }
    static async excluirserviçospost(req,res){
        const id = req.body.id

        console.log(id)
        await Produto.destroy({where: {id: id}})
       
        res.redirect('/produtos/servicos')


    }
    static async editarserviçospost(req,res){
        const id = req.body.id;
        const serviço = req.body.serviço
        const preço = req.body.preço
        const categoria  = req.body.categoria

        const produto = {serviço: serviço, preço: preço, categoria:categoria}

        await Produto.update(produto, {where:{id:id}})

        res.redirect('/produtos/servicos')

    }
        static async editarserviços(req,res){
        const id = req.params.id
        const produtos = await Produto.findOne({where: {id:id}, raw:true})
        console.log(produtos)
        res.render('produtos/editar', {produtos})
    }

    static async mostrarServicos(req,res){
        const corte = await Produto.findAll({raw: true, where: {categoria: 1}})
        const escova = await Produto.findAll({raw: true, where: {categoria: 2}})
        const tratamento = await Produto.findAll({raw: true, where: {categoria: 3}})
        const retoqueMeiaCabeça = await Produto.findAll({raw: true, where: {categoria: 4}})
        const retoque = await Produto.findAll({raw: true, where: {categoria: 5}})

        res.render('produtos/serviços',  {corte, escova, tratamento, retoqueMeiaCabeça,retoque })
    }
    static cadastrarServiços(req,res){
        res.render('produtos/cadastrar')
    }
    static async cadastrarServiçosPost(req,res){
        const serviço = req.body.serviço;
        const preço = req.body.preço;
        const categoria = req.body.categoria;

        const produto = {
            serviço: serviço,
            preço: preço,
            categoria: categoria,
        }

        await Produto.create(produto)
            res.redirect('/produtos/servicos')
    }
}



module.exports = Produtocontroller