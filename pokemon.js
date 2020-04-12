var  axios  =  require ( 'axios' )
var  user  =  require ( 'readline-sync' )
var admin = require ("firebase-admin")
var serviceAccount = require("./credenciais (2).json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pokedex-70f31.firebaseio.com"
});

var nomeTabelaMensagens = 'Pokedex'
var db = admin.database().ref(nomeTabelaMensagens);

function menu(){
    console.clear
    console.log('\n ############### BEM-VINDO TREINADOR ############### \n')   
    var resp = user.questionInt(' Digite 1 parar mostrar um Pokemon: \n Digite 2 para cadastrar um pokemon: ')
    if(resp == 1){
        mostraPokemon()
    }if(resp == 2){
        cadastraPokemon()
    }if(resp == 3){
      mostraAbilities()
    }
}

function mostraPokemon(){
    console.log('\n')
    var id = user.question('digite o id ou o nome do Pokemon desejado: ')
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(resultado =>{
        console.log('\n')
        console.log('O nome do pokemon desejado é: '+ resultado.data.name)
        console.log('\n')
        console.log(resultado.data.types)
        console.log(resultado.data.abilities)
        console.log('\n')
        menu()
    })
}

function cadastraPokemon(){
    var treinador = user.question('digite seu nome: ')
    var id = user.question('digite o nome ou id do seu Pokemon: ')
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(resultado =>{
        db.push({
              treinador: treinador,
              id: id,
              pokemon: resultado.data.name,
              tipo: resultado.data.types,
              habilidades: resultado.data.abilities
          })
          console.log('Seu Pokemon foi adicionado ao pokedex!!!')
        menu()
      })
    .catch(erro =>{
        console.log('erro ao cadastrar o pokemon')
        menu()
    })
  }
  
 /* function mostraAbilities(){
    console.log('\n')
    var id = user.question('digite o id ou o nome do Pokemon desejado: ')
    
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(resultado =>{
        console.log('\n')
        //console.log('O nome do pokemon desejado é: '+ resultado.data.name)
        console.log('\n')
        //console.log(resultado.data.types)
        //console.log(resultado.data.abilities)
       var habilidade = console.log(resultado.data.abilities)
       console.log(habilidade.url)
        console.log('\n')
        menu()
    })
}*/


menu()
