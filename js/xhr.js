class MySimpleHttpClient {

	constructor(apiURL) {
		this.apiURL = apiURL;
	}

	sendGetRequest(handler) {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', this.apiURL, true);

		xhr.addEventListener('load', (res) => {
			if (handler) {
				handler(null, res, xhr.responseText);
			}
		});

		xhr.addEventListener('error', (err) => {
			if (handler) {
				handler(err, null, null);;
			}
		});

		xhr.send();
	}

	sendPostRequest(handler, rawBody) {
		if (rawBody) {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', this.apiURL, true);
			xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");

			xhr.addEventListener('load', (res) => {
				if (handler) {
					handler(null, res, xhr.responseText);
				}
			});

			xhr.addEventListener('error', (err) => {
				if (handler) {
					handler(err, null, null);;
				}
			});

			xhr.send(JSON.stringify(rawBody));			
		}
	}

}
