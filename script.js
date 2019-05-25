var spoilerlist;

chrome.storage.sync.get("spoilerItem", function (results)) {
	spoilerlist = results;
	if(spoilerlist['spoilerItem'] == null) {
		spoilerlist = {'spoilerItem' : []};
		savespoilerlist();
	}
}

$(function() {
	updatelistview(); //todo
	searchforspoilers(); //todo

	$('yes-button').click(function (evt){
		//enable spoiler
	});

	$('no-button').click(function (evt){
		//disable spoiler
	});

	$('save-button').click(function (evt)){

	}
})




function savespoilerlist(){
	chrome.storage.sync.set({
		'spoilerItem': spoilerlist["spoilerItem"]
	}, function (results) {
		if (chrome.runtime.error) {
			console.log(chrome.runtime.error)
		}
	});
}

