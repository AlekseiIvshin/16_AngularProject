var moduleName = 'noteModule';

describe('NoteController test suite', function(){
	beforeEach(module(moduleName));
	
	var $rootScope, $controller;
	
	beforeEach(inject(function(_$rootScope_,_$controller_){
		$rootScope = _$rootScope_;
		$controller = _$controller_('NoteController',{'$scope': $rootScope});
		spyOn($rootScope,'removeNote').and.callThrough();
	}));
	
	it('notes list should by empty on load',function(){
		expect($rootScope.notes).toEqual([]);
	});
	
	it('should add new note',function(){
		$rootScope.addNote({});
		expect($rootScope.notes.length).toEqual(1);
	});
	
	it('should remove note by id', function(){
		$rootScope.addNote({});
		expect($rootScope.notes.length).toEqual(1);
		$rootScope.removeNote(0);
		expect($rootScope.notes.length).toEqual(0);
		expect($rootScope.removeNote.calls.count()).toEqual(1);
	});
	
	
	it('should set note to archive',inject(function(archive){
		var note = {title: 'title',body:'body'};
		$rootScope.notes = [note];
		spyOn(archive,'set').and.callThrough();
		$rootScope.setToArchive(0);
		expect(archive.set).toHaveBeenCalled();
	}));
	
});