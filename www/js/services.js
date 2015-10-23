var db;
var remoteDB;

angular.module('starter.services', ['pouchdb'])
.factory('NotesFactory', function(pouchDB) {
    
    db = new pouchDB('notes');
    remoteDB = new PouchDB('http://52.88.243.149:5984/notes');
 
 db.sync(remoteDB, {
  live: true
}).on('change', function (change) {
  // yo, something changed!
}).on('error', function (err) {
  // yo, we got an error! (maybe the user went offline?)
});
    
    var factory = {}; 

    	factory.notes = [];

    	db.allDocs({
			include_docs: true,
			attachments: true,
			}).then(function (result) {
			  // handle result
			console.log(result.rows[0].doc);
				for(var i=0; i<result.rows.length; i++)
					factory.notes.push(result.rows[i].doc);
				
			}
			).catch(function (err) {
			console.log(err);
		});

    factory.getNotes = function() {
        return factory.notes;
        }

    factory.addNote = function(note) {

		  function error(err) {
		    console.log(err);
		  }

		  function get(res) {
		    if (!res.ok) {
		      return error(res);
		    }
		    return db.get(res.id);
		  }

		  function bind(res) {
		    factory.notes.push(res);
		 }

		 function sync() {
		 	 db.sync(remoteDB);
		 }

		  db.post(note)
		    .then(get)
		    .then(bind)
		    .then(sync)
		    .catch(error);
    }
 
    return factory;
});
