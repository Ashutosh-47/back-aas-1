require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT ||  8000 ;
const cors = require("cors")
const { user } = require ( "./Models/Schema" )
require("./db")

app.use ( express.json() )

 app.use ( express.urlencoded ( { extended: true } ) )


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  


app.get ( "/" , ( req, res ) => res.send ( "Working" ) )




//------------------------------------------------------ Post for LogIn ------------------------------------------------
app.post ( "/" , async ( req , res ) => {

     const { email , password } = req.body ;

    try {
           const checkEmail = await user.findOne ( { email: email , password: password } )                       // To find email exist or not 

           if ( checkEmail )  res.status(200).json ( { success: true } )                           // If exist

           else  res.status ( 200 ).json ( { success: false} )
    }
    catch ( err ) { 
        console.log (  err ) 

        res.status ( 400 ).json ( { success: "error" } )
    } 

} )


// //------------------------------------------------------- Post Signup          ---------------------------------------
app.post ( "/signup" , async ( req , res ) => {

    const { name , email , password } = req.body ;

    const data = { 
        name: name ,                         // As we have save user to DB
        email: email ,
        password: password
    }

    try {
           const checkEmail = await user.findOne ( { email: email } )                       // if exist dont add

           if ( checkEmail )  res.status(200).json ( { success: true } )                           // If exist

           else {

             res.status(200).json ( { success: false } )

             await user.insertMany ( [ data ] )
           }
    }
    catch ( err ) { 
        console.log ( err )
        res.status(400).json ( { success: "error" } )
    } 

})



//------------------------------------------------------- To get Details from MongoDB for Card -------------------------------

app.get ( "/getDetail" , async ( req , res ) => {

    
   try{
    const data = await user.find ( {  } ) 
   res.status ( 200 ).json ( data );
   }
   catch ( err) {  res.status(400).json ( { success: "error" } ) }
})



//--------------------------------------------------- Edit----------------------------------------------------

app.post( "/edit" , async ( req , res ) => {
    const data = req.body
 
    try {
        const arr = await user.updateOne ( { _id: data.id } , {
            $set: { 
                name: data.name ,
                password: data.password
             }
        } )
   
        res.status(200).json ({ success: true } )
    }
    catch ( err ) { 
        res.status ( 400 ).json ( { success: "error" } )
    }
})




app.listen ( port , () => console.log ( "App is listinging on Port 8000") )

