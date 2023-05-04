const mongoose = require("mongoose")
const url = `mongodb+srv://Ashu:Ashu1998@cluster0.bzecepf.mongodb.net/Login?retryWrites=true&w=majority`
mongoose.connect ( url ).then( () => console.log ( "MongoDb is connected" ) ).catch ( ( err ) => console.log ( err ) )