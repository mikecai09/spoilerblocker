var spoilerlist;
var enable_blocker = true;

chrome.storage.sync.get("spoilerItem", function (results)) {
	spoilerlist = results;
	if(spoilerlist['spoilerItem'] == null) {
		spoilerlist = {'spoilerItem' : []};
		savespoilerlist();
	}
}

$(function() {
	updatelistview();
	searchforspoilers(); //todo

	$('#yes-button').click(function (evt){
		enable_blocker = true;
	});

	$('#no-button').click(function (evt){
		enable_blocker = false;
		//grayout submit button
	});

	$('#submit-button').click(function (evt){
		if(enable_blocker == true) {
			itemAdd = $('.textbox').val().toLowerCase();
			spoilerlist['spoilerItem'].push(itemAdd);
			savespoilerlist();
			$('.textbox').val('');
			updatelistview();
			searchforspoilers();
		}
	});

	var observer = new MutationObserver(function(mutations, observer) {
		searchforspoilers();
	});

	observer.observe($('[id^topnews_main_stream_]').get(0), {
		subtree: true,
		attributes: true
	});
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

function updatelistview(){
	if(spoilerlist["spoilerItem"] != null) {
		$('#listview').empty();
		var html = '<ul>';
		for (var i = 0; i<spoilerlist["spoilerItem"].length; i++) {
			html += '<li><a class="item" href="#">'+spoilerlist['spoilerItem'][i]+"</a></li>";
		}
		html+='</ul>';
		$('#listview').append(html);
	}
}

function searchforspoilers(){
	if(spoilerlist["spoilerItem"] != null&&enable_blocker==true) {
		var searchstr="";
		spoilerlist["spoilerItem"].forEach(function(item){
			searchstr = searchstr + "p:contains(" +item+")";
		});
		searchstr = searchstr.substring(0, searchstr.length-2);
		$(searchstr).parents('.userContentWrapper').css('-webkit-filter', 'blur(5px)')
	}
}





