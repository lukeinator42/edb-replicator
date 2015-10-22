angular.module('starter.services', ['pouchdb'])
.factory('NotesFactory', function(pouchDB) {
     
    var factory = {}; 
    	var db = pouchDB('notes');

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

		  db.post(note)
		    .then(get)
		    .then(bind)
		    .catch(error);
    }
 
    return factory;
});
