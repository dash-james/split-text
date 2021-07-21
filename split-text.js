window.addEventListener("load", function() {
	//split text into lines
	let splitWords = function(selector) {
		var elements = document.querySelectorAll(selector);
		elements.forEach(function(el) {
			el.dataset.splitText = el.textContent;
			el.innerHTML = el.textContent.split(/\s/).map(function(word) {
				return word.split("-").map(function(word) {
					return '<div class="wordmask"><span class="word">' + word + "</span></div>";
				}).join('<div class="wordmask"><span class="word">-</span></div>');
			}).join('<span class="whitespace"> </span>');
		});
	};
	let splitLines = function(selector) {
		var elements = document.querySelectorAll(selector);
		splitWords(selector);
		elements.forEach(function(el) {
			var lines = getLines(el);
			var wrappedLines = "";
			lines.forEach(function(wordsArr) {
				wrappedLines += '<div class="linemask"><div class="line" data-scroll="1" data-scroll-class="in-view"><span class="words">';
				wordsArr.forEach(function(word) {
					wrappedLines += word.outerHTML;
				});
				wrappedLines += "</span></div></div>";
			});
			el.innerHTML = wrappedLines;
		});
	};
	let getLines = function(el) {
		var lines = [];
		var line;
		var words = el.querySelectorAll("span");
		var lastTop;
		for (var i = 0; i < words.length; i++) {
			var word = words[i];
			if (word.offsetTop != lastTop) {
				if (!word.classList.contains("whitespace")) {
					lastTop = word.offsetTop;
					line = [];
					lines.push(line);
				}
			}
			line.push(word);
		}
		return lines;
	};
	splitLines(".split");
});
