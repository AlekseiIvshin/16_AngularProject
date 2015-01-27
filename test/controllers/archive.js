var moduleName = 'noteModule';

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
	
	it('should get archived notes count', inject(function(archive){
		spyOn(archive,'getCount').and.returnValue(0);
		expect($rootScope.getArchivedNotesCount()).toEqual(0);
		expect(archive.getCount.calls.count()).toEqual(1);
	}));
	
	it('should set archived note to active note',inject(function(archive){
		var note = {title: 'title',body:'body'};
		spyOn(archive,'get').and.returnValue(note);
		$rootScope.notes = [];
		var index = 0;
		$rootScope.setToActive(index);
		expect(archive.get).toHaveBeenCalledWith(index);
	}));
});