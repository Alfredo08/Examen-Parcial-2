let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );

let app = express();

let server;

/* Tu código va aquí */
app.put('/api/bookmarks/:id',(req,res)=>{
	let parID = req.params.id;
	let bodyID = req.body.id;
	let {titulo,descripcion,url} = req.body
	if(!bodyID){
		res.statusMessage = "No se encontro el Id";
		res.status(406).send();
	}
	if(parID != bodyID){
		res.statusMessage = "El Id no coincide";
		res.status(409).send();
	}
	if(!titulo && !descripcion && !url){
		res.statusMessage = "No hay ningun campo a cambiar";
		res.status(406).send();
	}

})

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}