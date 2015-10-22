angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, NotesFactory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.noteData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/add_note.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeAddNote = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.addNote = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doAddNote = function() {
    NotesFactory.addNote($scope.noteData);
    console.log('Doing login', $scope.noteData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeAddNote();
    }, 1000);
  };
})

.controller('NotesCtrl', function($scope, NotesFactory) {
  $scope.notes = NotesFactory.getNotes();
})

.controller('NoteCtrl', function($scope, $stateParams) {
});
