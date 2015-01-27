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
				templateUrl: 'templates/note.tpl.html'
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