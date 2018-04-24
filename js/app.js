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
					/* Extract the RSS Feed URL from the website */
					try {
						let doc = DOMPARSER(htmlTxt, 'text/html')
						var feedUrl = doc.querySelector('link[type="application/rss+xml"]').href
						var placeOfDayElement = doc.querySelector('.hp-item-place');
						var placeOfDayImage = placeOfDayElement.querySelector('img').src;
						console.log(placeOfDayImage);
						$("#main-image").attr("src", placeOfDayImage); //TRY AND GET THIS IMAGE TO DISPLAY. I THINK THIS LINE OF CODE IS IN THE WRONG PLACE.
					} catch (e) {
						console.error('Error in parsing the website');
						return
					}
					/* Fetch the RSS Feed */
					// fetch(feedUrl).then((res) => {
					// 	res.text().then((xmlTxt) => {
					// 		/* Parse the RSS Feed and display the content */
					// 		try {
					// 			let doc = DOMPARSER(xmlTxt, "text/xml")
					// 			let heading = document.createElement('h1')
					// 			heading.textContent = url.hostname
					// 			frag.appendChild(heading)
					// 			doc.querySelectorAll('item').forEach((item) => {
					// 				let temp = document.importNode(document.querySelector('template').content, true);
					// 				let i = item.querySelector.bind(item)
					// 				let t = temp.querySelector.bind(temp)
					// 				t('h2').textContent = !!i('title') ? i('title').textContent : '-'
					// 				t('a').textContent = t('a').href = !!i('link') ? i('link').textContent : '#'
					// 				t('h3').textContent = url.hostname

					// 				frag.appendChild(temp)
					// 			})
					// 		} catch (e) {
					// 			console.error('Error in parsing the feed')
					// 		}
					// 		if(hasBegun) {
					// 			document.querySelector('output').textContent = '';
					// 			hasBegun = false;
					// 		}
					// 		document.querySelector('output').appendChild(frag)
					// 	})
					// }).catch(() => console.error('Error in fetching the RSS feed'))
				})
			}).catch(() => console.error('Error in fetching the website'))
		})
	})
}).catch(() => console.error('Error in fetching the URLs json'))
