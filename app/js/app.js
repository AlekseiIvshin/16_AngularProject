(function(angular){
	'use strict';
	angular.module('noteModule',[])
		.controller('NoteController',['$scope','archive','$http',function($scope,archive,$http){
			$scope.notes = [];
			$scope.addNote = function(note){
				note.date = new Date();
				$scope.notes.push(note);
				$scope.note=null;
			}
			
			$scope.removeNote = function(noteIndex){
				$scope.notes.splice(noteIndex,1);
			}
			
			$scope.setToArchive = function(noteIndex) {
				var id = archive.set($scope.notes[noteIndex]);
				if(!angular.isUndefined(id)){
					$scope.removeNote(noteIndex);
				}
			}
			
			$scope.fetchLevels = function(){
				$http.get('data/data.json')
					.success(function(data){
						$scope.levels = data.level;
					})
			}
			
			$scope.fetchLevels();
		}]) 
		.controller('ArchiveController',['$scope','archive',function($scope,archive){			
			
			$scope.archivednotes = [];
			$scope.getArchivedNotesCount = function(){
				return archive.getCount();
			}			
			
			$scope.setToActive = function(noteIndex){
				var pulledNote = archive.get(noteIndex);
				if(!angular.isUndefined(pulledNote)){
					$scope.notes.push(pulledNote);
					$scope.refreshArchived();
				}
			}
			
			$scope.refreshArchived = function(){
				$scope.archivedNotesCount = $scope.getArchivedNotesCount();
				$scope.archivednotes = $scope.getArchivedNotes();
			}
			
			$scope.getArchivedNotes = function(){
				return archive.fetchAll();
			}
			
			$scope.$watch('archivednotes',function(){
					$scope.refreshArchived();
			});
			
			$scope.removeArchivedNote = function(noteIndex){
				$scope.archivednotes.splice(noteIndex,1);
			}
			
			$scope.archivedNotesCount = $scope.getArchivedNotesCount();
		}])
		.factory('archive',function(){
			var _archivedNotes = [];
			return {
				set: function(note){
					var index = _archivedNotes.length;
					_archivedNotes[index] = note;
					return index;
				},
				get: function(index) {
					var note = _archivedNotes[index];
					if(!angular.isUndefined(note)){
						_archivedNotes.splice(index,1);
						return note;
					}
				},
				fetchAll: function(index) {
					return _archivedNotes;
				},
				getCount: function(){
					return _archivedNotes.length;
				}
			}
		})
		.directive('noteitemview',function(){
			return {
				restrict: 'E',
				templateUrl: 'templates/note.tpl.html'
			}
		})
		.directive('archivednoteitemview',function(){
			return {
				restrict: 'E',
				templateUrl: 'templates/archived.note.tpl.html'
			}
		})
		.directive('myDraggable',['$document',function($document){
			return function(scope, element, attr) {
				var startX = 0, startY = 0 , x=0,y=0;
				element.css({
					position: 'relative',
					cursor: 'pointer'
				});
				element.on('mousedown',function(event){
					event.preventDefault();
					startX = event.pageX - x;
					startY = event.pageY - y;
					$document.on('mousemove',mousemove);
					$document.on('mouseup',mouseup);
				});
				
				function mousemove(event){
					y = event.pageY - startY;
					x = event.pageX - startX;
					element.css({
						top: y+'px',
						left: x+'px'
					});
				}
				
				
				function mouseup() {
				  $document.off('mousemove', mousemove);
				  $document.off('mouseup', mouseup);
				}
			}
		}])
})(window.angular);