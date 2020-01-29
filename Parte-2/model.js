let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

let bookmarkCollection = mongoose.Schema({
    id : {type: uuid},
    titulo : { type : String },
    descripcion : { type: String },
    url : {type: String}
});

let BookMark = mongoose.model( 'bookmarks', bookmarkCollection );


module.exports = {
    BookMark
};