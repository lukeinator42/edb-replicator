var db;
var remoteDB;

angular.module('starter.replicator', ['pouchdb']) 
.factory('ReplicatorFactory', function(pouchDB) {

	db = new pouchDB('notes');
    remoteDB = new PouchDB('http://127.0.0.1:5984/notes');

});