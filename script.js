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

	var enable_blocker = true;

	$('#yes-button').click(function (evt){
		enable_blocker = true;
	});

	$('#no-button').click(function (evt){
		enable_blocker = false;
		//grayout submit button
	});

	$('#submit-button').click(function (evt)){
		if(enable_blocker == true) {
			itemAdd = $('.textbox').val().toLowerCase();
			spoilerlist['spoilerItem'].push(itemAdd);
			savespoilerlist();
			$('.textbox').val('');
			updatelistview();
			searchforspoilers();
		}
	}

	var observer = new MutationObserver(function(mutations, observer) {
	searchforspoilers();
})
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

