const express = require('express');
const bcrypt = require('bcrypt');
const app = express()
const port = 3000
const fs = require('fs');
const path = require('path')
const url = require('url');
const readdir = require('fs/promises');

const { pathToFileURL } = require('url');

app.use(express.urlencoded({ extended: true})); // a method inbuilt in express to recognize the incoming Request Object as strings or arrays
app.use(express.json()); //a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
//app.use(express.static('../../StockChart/HomePage'))
app.use(express.static('../../StockChart/'))
//app.use(express.static('../../StockChart/Register'))


console.log("O nome da dir em que estamos é : " + __dirname)

app.get('/', (req, res) => {
  res.redirect( 301 , "/Login/Login.html")
})

app.get('/Login', (req,res) =>{

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


app.post('/Register' , async (req,res) => 
{
  fs.promises.readdir('./utilizadores/').then( async (filenames) => 
    {
      if(filenames.indexOf(req.body.username + ".txt") == (-1))
        {
          const salt = await bcrypt.genSalt()
          const hashedPassword = await bcrypt.hash(req.body.password , salt);
          newUser = {name : req.body.username , password : hashedPassword , email : req.body.email};
          fs.appendFile( './utilizadores/' + newUser.name + '.txt' , JSON.stringify(newUser) , (error) =>
          {
            if (error) console.log(error);
            res.send('Utilizador registado com sucesso')
          })
        }
        else
        {
          res.send('There is already an user with this name')
        }
      }).catch(err => 
        {
          console.log(err)
        })
})

app.post('/Login' , async (req, res) =>{
  console.log(req.body.username);
  console.log(req.body.password);

})
