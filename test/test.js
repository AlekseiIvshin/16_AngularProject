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

describe('ArchiveController test suite', function(){
	beforeEach(module(moduleName));
	
	var $rootScope, $controller;
	
	beforeEach(inject(function(_$rootScope_,_$controller_){
		$rootScope = _$rootScope_;
		$controller = _$controller_('ArchiveController',{'$scope': $rootScope});
	}));
	
	it('notes list should by empty on load',function(){
		expect($rootScope.getArchivedNotesCount()).toEqual(0);
	});
	
});


describe('ArchiveService test suite', function(){
	beforeEach(module(moduleName));
	var $rootScope,$archive;
	var testNote;
	beforeEach(inject(function(_$rootScope_,archive){
		$rootScope = _$rootScope_;
		$archive = archive;
		spyOn($archive,'set').and.callThrough();
		testNote = {title: 'title',body:'body'};
	}));
	
	it('note should set to archive and delete from visible note list', function(){	
		var id = $archive.set(testNote);
		var fromArchive = $archive.get(id);
		expect(testNote).toEqual(fromArchive);
	});
	
	it('note should get real count of archived notes',function(){
		$archive.set(testNote);
		expect($archive.getCount()).toEqual(1);
	});
	
	it('should retain notes if fetch all',function(){
		$archive.set(testNote);
		var v1 = $archive.fetchAll();
		var v2 = $archive.fetchAll();
		expect(v1).toBeDefined();
		expect(v1).toEqual(v2);
	});
});