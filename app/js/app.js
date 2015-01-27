(function(angular){
	'use strict';
	angular.module('noteModule',[])
		.controller('NoteController',['$scope',function($scope){
			$scope.notes = [];
			$scope.addNote = function(note){
				note.date = new Date();
				$scope.notes.push(note);
				$scope.note=null;
			}
			
			$scope.removeNote = function(noteIndex){
				$scope.notes.splice(noteIndex,1);
			}
		}])
		.directive('noteitemview',function(){
			return {
				restrict: 'E',
				template: 'template/note.tpl.html'
			}
		})
})(window.angular);