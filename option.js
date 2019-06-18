var spoilerlist;
var enable_blocker;

chrome.storage.sync.get("spoilerItem", function (results) {
	spoilerlist = results;
	if(spoilerlist['spoilerItem'] == null) {
		spoilerlist = {'spoilerItem' : []};
		savespoilerlist();
	}
});

loadSettings();
$(function() {
	updatelistview();
	setCSS();
	$('#yes-button').click(function (evt){
		enable_blocker = "true";
		// localStorage.setItem("value", enable_blocker);

		chrome.storage.sync.set({"key": enable_blocker},function(){
			console.log("Message Saved!");
		});

		$('#yes-button').css('color','black');
		$('#yes-button').css('background-color','#FFF5EE');
		$('#yes-button:hover').css('cursor','default');
		$('#yes-button:hover').css('background-color','#FAEBD7');

		$('#no-button').css('color','#D3D3D3');
		$('#no-button').css('background-color','#A9A9A9');
		$('#no-button:hover').css('cursor','pointer');
		$('#no-button:hover').css('background-color','#808080');

		$('#submit-button').css('color','black');
		$('#submit-button').css('background-color','#FFF5EE');
		$('#submit-button:hover').css('cursor','pointer');
		$('#submit-button:hover').css('background-color','#FAEBD7');
	});

	$('#no-button').click(function (evt){
		enable_blocker = "false";
		// localStorage.setItem("value", enable_blocker);
		chrome.storage.sync.set({"key": enable_blocker},function(){
			console.log("Message Saved!");
		});

		//grayout submit button
		$('#no-button').css('color','black');
		$('#no-button').css('background-color','#FFF5EE');
		$('#no-button:hover').css('cursor','default');
		$('#no-button:hover').css('background-color','#FAEBD7');

		$('#yes-button').css('color','#D3D3D3');
		$('#yes-button').css('background-color','#A9A9A9');
		$('#yes-button:hover').css('cursor','pointer');
		$('#yes-button:hover').css('background-color','#808080');

		$('#submit-button').css('color','#D3D3D3');
		$('#submit-button').css('background-color','#A9A9A9');
		$('#submit-button:hover').css('cursor','default');
		$('#submit-button:hover').css('background-color','#808080');
	});

	$('#submit-button').click(function (evt){
		if(enable_blocker == "true") {
			itemAdd = $('#textbox').val().toLowerCase();
			spoilerlist['spoilerItem'].push(itemAdd);
			savespoilerlist();
			$('#textbox').val('');
			updatelistview();
		}
	});

	$('#clear-button').click(function (evt){
		spoilerlist = {
			'spoilerItem' : []
		};
		savespoilerlist();
		$('#textbox').val('');
		updatelistview();
	});
});

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

function loadSettings(){
		// if(!localStorage.getItem("value")){
		// 	enable_blocker = "true";
		// }
		// else {
		// 	enable_blocker = localStorage.getItem("value");
		// }
	chrome.storage.sync.get(['key'], function(result) {
		enable_blocker = result.key;
		if(enable_blocker == null) {
			enable_blocker = "true";
		}
    });
}

function setCSS(){
	var bool = enable_blocker;
	if(bool == "true"){
		$('#yes-button').css('color','black');
		$('#yes-button').css('background-color','#FFF5EE');
		$('#yes-button:hover').css('cursor','default');
		$('#yes-button:hover').css('background-color','#FAEBD7');

		$('#no-button').css('color','#D3D3D3');
		$('#no-button').css('background-color','#A9A9A9');
		$('#no-button:hover').css('cursor','pointer');
		$('#no-button:hover').css('background-color','#808080');

		$('#submit-button').css('color','black');
		$('#submit-button').css('background-color','#FFF5EE');
		$('#submit-button:hover').css('cursor','pointer');
		$('#submit-button:hover').css('background-color','#FAEBD7');
	}
	if(bool == "false") {
		$('#no-button').css('color','black');
		$('#no-button').css('background-color','#FFF5EE');
		$('#no-button:hover').css('cursor','default');
		$('#no-button:hover').css('background-color','#FAEBD7');

		$('#yes-button').css('color','#D3D3D3');
		$('#yes-button').css('background-color','#A9A9A9');
		$('#yes-button:hover').css('cursor','pointer');
		$('#yes-button:hover').css('background-color','#808080');

		$('#submit-button').css('color','#D3D3D3');
		$('#submit-button').css('background-color','#A9A9A9');
		$('#submit-button:hover').css('cursor','default');
		$('#submit-button:hover').css('background-color','#808080');
	}
}