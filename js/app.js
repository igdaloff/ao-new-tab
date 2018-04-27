const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser())
/* Fetch URLs from JSON */
fetch('/js/urls.json').then((res) => {
	res.text().then((data) => {
		var frag = document.createDocumentFragment()
		var hasBegun = true
		JSON.parse(data).urls.forEach((u) => {
			try {
				var url = new URL(u)
			}
			catch (e) {
				console.error('URL invalid');
				return
			}
			fetch(url).then((res) => {
				res.text().then((htmlTxt) => {
					try {
						let doc = DOMPARSER(htmlTxt, 'text/html')

						var placeOfDayElement = doc.querySelector('.place-of-the-day-card');
						var placeOfDayName = placeOfDayElement.querySelector('.place-of-the-day-card .js-title-content');
						var placeOfDayDescription = placeOfDayElement.querySelector('.place-of-the-day-card .js-subtitle-content');
						var placeOfDayUrl = placeOfDayElement.getAttribute('href');

						$.get('https://atlasobscura.com' + placeOfDayUrl, function(response) {
				  		var mainImage = $(response).find('.gallery-image-container')[0];
				  		var mainImageUrl = $(mainImage).attr('data-lightbox-src');
				  		$('.page-container').css('background-image', 'url(https:' + mainImageUrl + ')');
						});

						$('h1').html(placeOfDayName);
						$('h2').html(placeOfDayDescription);
						$('.text-container').attr('href', 'https://atlasobscura.com' + placeOfDayUrl);

					} catch (e) {
						console.error('Error in parsing the site');
						return
					}
				})
			}).catch(() => console.error('Error in fetching the website'))
		})
	})
}).catch(() => console.error('Error in fetching the URLs json'))