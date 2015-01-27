var moduleName = 'noteModule';

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
	
	it('should set and get note to archive', function(){	
		var id = $archive.set(testNote);
		var fromArchive = $archive.get(id);
		expect(testNote).toEqual(fromArchive);
	});
	
	it('should get real count of archived notes',function(){
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