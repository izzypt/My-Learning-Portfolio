const express = require('express');
const bcrypt = require('bcrypt');
const app = express()
const port = 3000
const fs = require('fs');
const path = require('path')
const url = require('url');
const readdir = require('fs/promises');
const cookieParser = require('cookie-parser');
const { pathToFileURL } = require('url');
const session = require('express-session');
const {v4 : uuidv4} = require('uuid')


app.use(cookieParser());
app.use(express.urlencoded({ extended: true})); // a method inbuilt in express to recognize the incoming Request Object as strings or arrays
app.use(express.json()); //a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.static('../../StockChart/'))
app.use(express.static('../../StockChart/Login'))
app.use(session({
  secret : "Evangelis",
  genid : function(req) {
    return uuidv4() 
  },
  resave : false,
  saveUninitialized : false,
  maxAge : 1000 * 60 * 15, 
  authenticated : false,
}))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
  if(req.session.authenticated === true)
    return  res.redirect('/HomePage/HomePage.html')
  else
    return res.redirect('/Login/Login.html')
  
})

app.post('/Register' , async (req,res) => 
{
  fs.promises.readdir('./utilizadores/').then( async (filenames) => 
  {
      if(filenames.indexOf(req.body.username + ".json") == (-1))
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


app.post('/Login' , async (req, res) =>
{
  let userInputUsername = req.body.username
  let userInputPassword = req.body.password
  console.log('Estão a tentar fazer login com o Username : ' + req.body.username)
  console.log('Estão a tentar fazer login com a password : ' + req.body.password)

  fs.promises.readdir('./utilizadores/').then( async (filenames) => 
  {
    if(filenames.indexOf(req.body.username + ".json") !== (-1))
      {
        let userIndex = filenames.indexOf(userInputUsername + ".json")

        fs.readFile("./utilizadores/" + filenames[userIndex] , null , (err , data) => 
        {
          if (err) throw err
          userRegisteredInfo = JSON.parse(data.toString());
          return bcrypt.compare(userInputPassword, userRegisteredInfo.password, (err, result) =>
          {
            if (err) throw err;
            if(result == true)
              {
                req.session.authenticated = true;
                req.session.userID = userInputUsername;
                return res.redirect("/HomePage/HomePage.html");
              }
            else
              res.send("Wrong Password")
          }) 
        }) 
      }
    else
      {
        res.status(401).send('There is no user registered with that name')
      }
  }).catch((err) => 
      {
        console.log(err)
      })
})

app.get('/counter' , function(req, res){
  if(req.session.page_views){
     req.session.page_views++;
     res.send("You visited this page " + req.session.page_views + " times");
  } else {
     req.session.page_views = 1;
     res.send("Welcome to this page for the first time!");
  }
});

app.get('/Logout' , function(req,res)
{
  req.session.destroy()
  res.redirect('Login/Login.html')
})
