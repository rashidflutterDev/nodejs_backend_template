
try to close to this 


my-backend-project/
├── node_modules/       # Installed dependencies
├── src/                # Application source code
│   ├── routes/         # Routes folder
│   │   └── index.js    # Define API routes here
│   ├── app.js          # Main application file
│   └── config.js       # Configurations (e.g., environment variables)
├── .env                # Environment variables
├── .gitignore          # Files to ignore in Git
├── package.json        # Project metadata and scripts
└── package-lock.json   # Lock file for dependencies




1. Download and install Node.js
node -v
npm -v

mkdir my-backend-project
cd my-backend-project

npm init -y




start with nodemon
// with nodemon we get access to the hot restart functionlity ...
npm install --save-dev nodemon
add scripts :

    "start": "node app.js", // For production
    "dev": "nodemon app.js" // For development


    also change :   "main": "index.js", to   "main": "app.js", --> if your entry point is app.js
(
    scripts are the short cut keys commands for long commands 
    eg : if we wanned to do npm run node index.js 
    we can do 
          scripts{
         "run" : "node index.js"
          }

    now in terminal if we do :
    npm run run 
    we will get the same out put 
)

2. insall and configure express 
express is the framwork 

npm i express

start the server with express 
app.listen(PORT , HOSTNAME, () => {})  --> require 3 things to start the server --> 1 PORT, 2 HOSTNAME, 3 CALLBACK () => {}



3. npm i dotenv
    create .gitignore if it does not +nt there 
    add .node_modules
    add .env 

    both will be ignored to be pushed to gitHub because .evv has secrete information like api keys connection urls ports etc 

   // require('dotenv').config(); // modern way
                                   bcz we can do Configurations like require('dotenv').config(override = true)  
                                   by default it was false ...... but we dont need that
    require("dotenv/config"); 

    why are we doin that importing and we are also not storing it in a variable 
    because we just need import at the top 

    now we can access the variables defined inside of .env 
    like 
    proccess.env.HOSTNAME
    proccess.env.PORT -> for port stored in .env file


5.
// how a route is looked like ?
   app.get('/' , req , res) => {
    req.body  --> this gives us the full body that we passed from our client as jsonEncoded
    we also has :
    1. params 
    2. quesryParams
       let say we have a url of youtube video 
       url = https://www.youtube.com/whatch?v=jdoiejoijoijsoj&ab_channel=rashidflutterdeveloper
       www.youtube.com  --> domain name 
       /watch --> route name (/)
       but we also have (i): ?v and (ii): &ab_channel

       these both are called quesryParams
       they both are passed with query 
       and they are not the part of main url  ... becoz the original path or url looks /something/someother/
       

       but when ? or & appears its quesry for the specific need ... whay in this way becoz get requests do not have body ....
       a query param gives more information


       then if both are quesryParams whats the difference between ? and & 
       simple for hard thing would be that if we want to give quesryParam we would do start it with ?
       but if there is more than one so we will start quesryParam with ? but they will be seperated as well we can say concatinated with &..

       for accessing query params we do 
       const videoId = req.query.v
              where the v in url should be the vedioId 
              so in query param case we should know the variable the is representing the value .
              so typo will not get the quesryParam ...

           const channel = req.query.ab_channel


       2. params (pathParams)
       pathParams are the params that are passed directly with the url 

       let say url =  https://www.youtube.com/whatch/hshshljshocjk
                   where "hshshljshocjk" --> is vedioId (pathParam)
        so to get this like 

        on backend our route would be like
        app.get('/whatch/videos/:id ' , (req , res )=> {
                     you can also do    --> app.get('/whatch/videos/:id/:ab_channel)
        return res.json({'vedioId' : req.param.id})
       

        so this id the thing that we specify by backend but shoould be same in route and while accessing
        how client will do is 
        http://localhost:3000/watch/videos/12345

        where 12345 is the id 

       });     

        calling: http://localhost:3000/whatch/videos/12121212      ---> out put { " vedioId " : 12121212}

   }


   // now lets talk about res.send()

   you can do res.send() if you want to return text 
   also res.send('<h1> hi Welcome to home </h1>') you can do  send tags if you are working with browers kind of stuff 

  we also have res.json({})  in this we send json it is king of mao we send data n key and value pair and its will be used the most 
  so incase of error we send re.status().jaon()
  default status = 200 
  incase of server error we send 400 500 etc 

  so incase of error we send status code other that 200 and 201

  
+++++++++++++++++++++++++++++++++++++++++++++++++ + ++++ ++ +++++++++++++++++++++++++++++++++++++++++++

+   const express = require("express");                                                          +
+   require("dotenv/config");                                                                   +
+   const app = express();                                                                       +
+   const env = process.env;         

    // routes
    app.get('/' , (req , res )=> {
        return res.send('sorry cant find that');
    });  
    
     app.get('/whatch/videos/:id , (req, res) => {
        return res.json({'vedioId' : req.param.id})
         });
+                                                                                               +
+   // starting server                                                                           +
+   const port = env.PORT || 3000;                                                               +
+   const host = env.HOST || '0.0.0.0';                                                          +
+                                                                                               +
+   app.listen(port, host,() => {                                                                 +
+       console.log(`Server is running on http://${host}:${port}`);                              +
+   })                                                                                           +
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


// Middlewares and routes 
Middlewares are the glorified listeners ...  that sit between your main server and client .. so when ever the client send any data or request or any thing they do 
you can put the Middlewares that will listen to all the requests and do the certain thing (what you tell it to do ) before reaching to the accual endpoint  ...
you can chage the data in request , you can change the header of the request , or can apply logic on that data and send diferent diferent data based on that to the end point ..

ex : lets say we do 

app.use((req , res , next ) => { 
    // your code and logic
    next();
}) ;

this was our Middlewares  .. we do get next in the req   .... the next is generally used with Middlewares
what it do is that it says ---> go to the next function ----(continue)

we can have many many Middlewares 

like 
app.use((_ , _ , next )=> {
    next();
});


these are the global Middlewares and will be .. and the order matters here 
you should call the next at the end of the Middleware if not then the user request will never reach t the actual route..

note : till now we are dealing with global Middlewares ---> they runs irrespective what ever endpoint we are trying to visit .
(runs for every single request)

so when we have more than one Middleware in our index.js or app.js 
it calls the Middlewares one after another and if we have missed any where to call next() it wont even rach to the requested path :
so after all the Middlewares it will go ahead and try to visit the endpoint..


// contextual Middlewares 

they would be not like app.use  ....  they would be like functions 

so lets say we will allow users to (/whatch/videos/:id) this endpoint only if thy are authurized ...

cosnt authurized = (_ , _ , next ) => {
    const isAuthorized = true;
    if(isAuthorized){
        console.log("user is authorized --> continue with the request");
       return next();
    }else{
       return res.status(401).send("UnAuthorized)
    }
}

calling contextual Middleware :

    app.get('/whatch/videos/:id , isAuthorized ,(req, res) => {
        return res.json({'vedioId' : req.param.id})
         });
    
     so we will call the Middleware after the route ... and if user is not authorized we will never get to the route and inside of Middleware
     as we are UnAuthorized we will got inside of the else bock and and there we are rturning error (or response) ....

     but if we are authorized we will be returning next from the Middleware which means continue with the request.


     so this Middleware will only be excute with the routes that has specificied that Middleware.....

     so if we are calling any route it will only run those contextual Middleware that are mentioned ... but all the global middle will be exicuted in both cases.


     there are some Middleware liberaries that we use in our backend those are global ones , 
     1. body-parser
     2. morgan 
     3.cors

    body-parser : when we get an http req  the body of the req can be in any format it can be in json or in any other format .
                 so the contentType in header is usually application/json but it can be url encoded or binary data .
                 so the body parser will hel us to accept the application/json type req and will give us data in proper dataType ..

    morgan : it is an automatic loggor .. 
    cors : (cross origion resource sharing) ... lets say my web server will listed on a different domain and my client app will be hosted on a different doamin 
            now if my client (flutter) is interacting with server (vice versa) .. they are making a cross-origion-request.

            so that cors will handle all these for us .
    npm i body-parser cors morgan 

    Middlewares  should be before everything ... specially before the routes bcox we wanna exicute Middlewares and then routes 
    also they should be after 

         const app = express();
         const env = process.env;

         like :
         app.use(bodyParser.json());
         app.use(morgan('tiny'));  -- > predefined default format string (ref from docomentation)
         you can do custom configurations .. this will print the response in defalut configurations.
         app.use(cors());
         app.options('*', cors());

        * we are allowing request from all the routes 

        (do import or require the file imports at the top)

what is mongoose? mongoDb 
    * unlike sql (it do not have rows and columns or tables) --> its most similar to firebase 
      noSQL docoment based database , meaning it stored your data in docoments. 
    * collection are same like folders in inside of that we store user data as docoments 
       like the single user data docoment is something like json object ..
       but this is a very headach to store data in that format (bson) so doing manually is very cumbersom
       so we will do use a liberary that will structure our docoment and will give it to the mongoose.
       and that liberary handles aevery thing about mongoDb
    * to use mongoose we just have to give it the connection string of the project that we want to qury inert or update mongodb oerations in .


    go to mongoDb and create a project and get the project password or just get the nitive drivers link from there and replace the password and other plahoders with acuall data
    but if you are viewing for the first time it willl give you the connection string with all data filled in it 
    do create a var MONGODB_CONNECTION_STRING in .env file .

    and make sure that the url is in the string ' ' quptes .

    and then befre 
    app.listen at the last do connect mongo db 
    also install : npm i mongoDb mongoose


// connecting to db
    mongoose.connect(env.MONGODB_CONNECTION_STRING).then(() => {
        console.log("Connected to db");
    }).catch((err) => {
        console.log(err);
    });


    // moving towards the architecture 
     we will create the routes folder and will move all the routes there .
     create folder routes
     in inside of that we will create auth.js 
     inside of this file we will be having all the auth related routes 


     but then ther inside of the routes folder we need the app instance particularly express 
     so there we do not have acceess to the framwork how is it gonna works with that ?

     we can do const express = require("express");
     and then const app = express();

     but the app insde of the routes do not know about the app present inside of the app.js 
     so they are not linked and will not works ... we want only one app variable in our whole server 
     and as app is the main point of our program we will do reference the routes in this fiel only 

     but there is the solution for that like 
      const app = express();

      const router = app.router();

      router.get() ;   ----> use your router here 

      and at the last in this file we will export our router to the app.js to get 
      module.export = router;


      so in app.js we would do 
      after Middlewares 
      // routes
      const authRouter = require('./routes/auth");
      so using this [ app.use()] i can do plug the router to the main app obj.

      app.use(authrouter)


      now we can do like if we have 
        router.get('/prodects/:id', ( req , res ) => {}); 
        router.get('/prodects/:count', ( req , res ) => {}); 
        router.get('/prodects/:csh', ( req , res ) => {}); 
        router.get('/prodects/:llb', ( req , res ) => {}); 


     we can do set the 
     like       app.use( 'products/' ,authrouter);

     in app.js
     so here it will become 
     router.get(':id', ( req , res ) => {}); 
     router.get(':count', ( req , res ) => {}); 
     router.get(':csh', ( req , res ) => {}); 
     router.get(':llb', ( req , res ) => {}); 


     // that was nothing hard :

     now lets talk about the something inforamtional 
     lets say we have it like this :

        router.get('/prodects/:id', ( req , res ) => {}); 
        router.get('/prodects/count', ( req , res ) => {}); 

        router.delete ('/prodects/:id', ( req , res ) => {}); 
        router.get('/prodects/:id', ( req , res ) => {}); 
        router.get('/prodects/count', ( req , res ) => {}); 


        router.get('/prodects/count', ( req , res ) => {}); 
        in such case if user go to the route : https://rashidflutterdeveloper.com/products/12121212


        so at the point of url mached with the products/
        it will go to the products route snd will start searching for the url in wich there is one url that takes the 12121212
        and yes it is 
          router.get('/prodects/:id', ( req , res ) => {}); 

          and thats okay ...
          but what will happen if user is doing 
          https://rashidflutterdeveloper.com/products/count
          means a request for getting counts of all the products and in this case same thing will happen but 
          this time the :id will be iterated before  router.get('/products/count', ( req , res ) => {});
          it eill met with router.delete ('/prodects/:id', ( req , res ) => {});  so the id will become id = count 

          and that is the crucial case and unexpected behavior that we can get in get routes 
          but this can be prhibetted by if we do 

        router.get('/prodects/count', ( req , res ) => {}); 
        router.get('/prodects/:id', ( req , res ) => {}); 

        at this is the only solution in those cases so always put your routes like this .
        specific (/count etc) routes should be at the top .

what does a good architecture need ?
    it needs a module should be having only one responsibility
    so we will create a folder called controllers
    and inside of that we will create a file called auth.js
    and inside of that we will create a functions like sigunup , login , logout etc



so before if auth route looked liked this

const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.send('Login');
});
module.exports = router

it will now look like this
1.routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);
module.exports = router

2.controllers/auth.js
exports.getLogin = (req, res, next) => {}
                    or 
exports.getLogin = function (req, res, next) {}



go to the post man create a collection  (nodejs_backend_template)
create a folder auth inside of that:
inside of that crate requests for login
like http://0.0.0.0:8000login   you can test it (post req)
but this usually what we do for web development .... but if that is api we usually do add api/v1 
so according to convension this all will become : http://0.0.0.0:8000/api/v1/login


now we will be repeating this in each route so for maintainable code change at one place and effect on all where it is used sake we will do 
http://0.0.0.0:8000/api/v1 store this in a variable in .env file 

    API_URL=http://0.0.0.0:8000/api/v1

    in app.js 
    const API = env.API_URL

    now
    app.use(`${API}/`, authRouter);


    we can also set the base url in post man for this project by doing click on to right side and create a environment for this project and then creat ea base url
    or we can do it by selecting the url and setting it as variable.

................................................................................
app.js 
const bodyParser = require("body-parser");
const express = require("express");
require("dotenv/config");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const env = process.env;
const API = env.API_URL;

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());

// routes
 const authRouter = require("./routes/auth");
 app.use(`${API}/`, authRouter);

// starting server
const port = env.PORT || 3000;
const host = env.HOST || '0.0.0.0';

// connecting to db
mongoose.connect(env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connected to db");
}).catch((err) => {
    console.log(err);
});

app.listen(port, host,() => {
    console.log(`Server is running on port: ${port} and host: ${host}`);
});
...................... routes/auth.js....................
const express = require('express');

const router = express.Router();


router.post('/login', (req, res) => {
    res.send('Login');
});

router.post('/register', (req, res) => {
    res.send('Register');
});

router.post('/forgot-password', (req, res) => {
    res.send('Forgot Password');
});


router.post('/reset-password', (req, res) => {
    res.send('Reset Password');
});

router.post('/verify-otp', (req, res) => {
    res.send('Verify Email');
});

router.post('/logout', (req, res) => {
    res.send('Logout');
});

module.exports = router


............................controllers/auth.js...............................






.............................. section 3 .....................................
