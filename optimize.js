function getLowHangingLeaves() {
	var parList = [document];
	var chiList = document.childNodes;
	while (chiList.length > 0) {
		parList = chiList;
		chiList = [];
		for (var i = 0; i < parList.length; i++) {
			Array.prototype.push.apply(chiList, parList[i].childNodes);
		}
	}
	return parList;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function trimDomIteratively(initialDelay, levelDelay, iterDelay, maxPerIter) {
	console.log("DOM optimization called with initialDelay="+initialDelay+" levelDelay="+levelDelay+" iterDelay="+iterDelay+" maxPerIter="+maxPerIter);
	if (maxPerIter < 1)
		maxPerIter = Number.POSITIVE_INFINITY;
	var topEls = [null]
	if (initialDelay > 0)
		await sleep(initialDelay);
	while (topEls.length > 0) {
		if (levelDelay > 0)
			await sleep(levelDelay);
		topEls = getLowHangingLeaves()
		for (var i = 0; i < topEls.length && i < maxPerIter; i++) {
			if (iterDelay > 0)
				await sleep(iterDelay);
			topEls[i].parentNode.removeChild(topEls[i]);
		}
		console.log("Optimized " + i + " elements");
	}
}

chrome.storage.sync.get({
		initialDelay: 10000,
		levelDelay: 1000,
		iterDelay: 0,
		maxPerIter: 0
	}, function(items) {
		trimDomIteratively(items.initialDelay, items.levelDelay, items.iterDelay, items.maxPerIter);
	}
);
