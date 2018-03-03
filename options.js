function save_options() {
	var initial = document.getElementById('initial').value;
	var level = document.getElementById('level').value;
	var iter = document.getElementById('iter').value;
	var maxPer = document.getElementById('maxPer').value;
	chrome.storage.sync.set({
		initialDelay: initial,
		levelDelay: level,
		iterDelay: iter,
		maxPerIter: maxPer
	}, function() {
		var status = document.getElementById('save');
		status.textContent = 'Saved!';
		setTimeout(function() {
			status.textContent = 'Save';
		}, 750);
	});
}

function restore_options() {
	chrome.storage.sync.get({
		initialDelay: 10000,
		levelDelay: 1000,
		iterDelay: 0,
		maxPerIter: 0
	}, function(items) {
		document.getElementById('initial').value = items.initialDelay;
		document.getElementById('level').value = items.levelDelay;
		document.getElementById('iter').value = items.iterDelay;
		document.getElementById('maxPer').value = items.maxPerIter;
	});
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
	save_options);