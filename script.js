var spoilerlist;
var enable_blocker;	

chrome.storage.sync.get("spoilerItem", function (results) {
	spoilerlist = results;
	if(spoilerlist['spoilerItem'] == null) {
		spoilerlist = {'spoilerItem' : []};
		savespoilerlist();
	}
});

$(function() {
	chrome.storage.sync.get(['key'], function(result) {
		enable_blocker = result.key;
		if(enable_blocker == null) {
			enable_blocker = "true";
		}
		if(enable_blocker == "true"){
			searchforspoilers();
			var observer = new MutationObserver(function(mutations, observer) {
				searchforspoilers();
			});
			observer.observe($('[id^="topnews_main_stream_"]').get(0), {
				subtree: true,
				attributes: true
			});
		}
	});
});

function searchforspoilers(){
	if(spoilerlist["spoilerItem"] != null&&enable_blocker=="true") {
		var searchstr = "";
		spoilerlist["spoilerItem"].forEach(function(item){
			searchstr = searchstr + "p:contains(" +item+"), ";
		});
		searchstr = searchstr.substring(0, searchstr.length-2);
		$(searchstr).parents('.userContentWrapper').css('-webkit-filter', 'blur(5px)')
	}
}

function savespoilerlist(){
	chrome.storage.sync.set({
		'spoilerItem': spoilerlist["spoilerItem"]
	}, function (results) {
		if (chrome.runtime.error) {
			console.log(chrome.runtime.error)
		}
	});
}