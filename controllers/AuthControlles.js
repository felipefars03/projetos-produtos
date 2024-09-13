const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
class AuthController {

static async login(req,res){
    res.render('auth/login')
  }
  static async sair(req,res){
    req.session.destroy();
    res.redirect('/produtos')
  }
  static register(req,res){
    res.render('auth/register')

  }
  static async loginpost(req,res){
    const email = req.body.email
    const senha = req.body.senha

     //saber se o usuário existe

     const user = await Usuario.findOne({where: {email:email}})
     if(!user){
        //  req.flash('message', 'usuário naõ encontrado')
        console.log('aaaaaa')
         res.render('auth/login');
         return;

     }
     // checar se a senha bate com a do banco
     const passwordMatch = bcrypt.compareSync(senha, user.senha)

     if(!passwordMatch){
        //  req.flash('message', 'Senha inválida')
        console.log('aaaaaa')
         res.render('auth/login');
         return;
     }
     req.session.userid = user.id;
    //  req.flash('message', 'LOgin realizado com sucesso')
     req.session.save(()=>{
         res.redirect('/produtos/cadastrar')
     })

  }
  static async registerpost(req,res){
    const nome = req.body.nome
    const email = req.body.email
    const senha = req.body.senha
    const confirmacaoSenha = req.body.confirmacaoSenha
    const gerente = true;
    
    if(senha !== confirmacaoSenha){
      res.redirect('/register')
      return;
    }
    const checkUserExists = await Usuario.findOne({where: {email:email}})
        if(checkUserExists){
            // req.flash('message', 'O email já está em uso')
            res.render('auth/register')
            return;
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(senha, salt);

        const user = {
            nome: nome,
            email:email,
           senha: hashedPassword,
           confirmacaoSenha: confirmacaoSenha,
           gerente: gerente
        }
        try{
            const createdUser = await Usuario.create(user);
            // req.flash('message', 'Cadastro realizado com sucesso!')
            req.session.userid = createdUser.id;

            req.session.gerente = gerente

            //res.redirect('/login')

             req.session.save(()=>{
                 res.redirect('/login')
             })
        }
        catch(err){
            console.log(err)
        }    
  }


}

module.exports = AuthController