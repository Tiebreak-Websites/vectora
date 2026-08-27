/**
	Made by Milen Karmidzhanov
	30.11.2017

	-------

	Please inlcude JQuery before this script
	so it can run smoothly :)

	**/

	var LegalData = function(brandDomain, language, requestURL) {

		// private
		var self = this;
		var prefix = 'lgl';
		self.jsonObj = {};
		self.requestURL = requestURL;

		var jsonFileName = 'LP.json';

		/*
			build path of json file
		*/
		var buildUrl = function() {
			var mainUrl = '/assets/';
			mainUrl += brandDomain + '/';
			mainUrl += language + '/';
			mainUrl += jsonFileName;

			return mainUrl;
		}

		if ( self.requestURL && self.requestURL.indexOf('//') > -1 ) {
			buildUrl = function() { return self.requestURL; }
		}		

		/* Find DOM elements and render the relevant HTML */
		var renderData = function() {
			var domElements = {};

			for ( var legalKey in self.jsonObj ) {

				var searchKey = legalKey.toLowerCase();

				var targetElements = document.querySelectorAll('[data-' + prefix + '="' + searchKey + '"]');

				if ( targetElements.length > 0) {

					for (var i = targetElements.length - 1; i >= 0; i--) {

						targetElements[i].innerHTML = self.jsonObj[legalKey];
					}

				}
			}

			/* Add custom event */ 
			var isOldBrowser = typeof CustomEvent !== 'function' ? true : false;
			var event = null;

			if ( !isOldBrowser ) {
				event = new CustomEvent('legalDataLoaded');
				document.dispatchEvent(event);
			} else {
				event = document.createEvent('Event');
				event.initEvent('legalDataLoaded', true, true);
				document.dispatchEvent(event);
			}

		}


		/*
			get html data from the json and render it in DOM element
			elId = @string ( id of dom element )
		*/
		var getJson = function(elId) {

			var jsonUrl = buildUrl();

			// $.ajax({
			// 	url: jsonUrl,
			// 	success: function( data ) {
			//
			// 		console.log(data);
			//
			// 		// self.jsonObj = JSON.parse(data);
			// 		//
			// 		// init();
			// 	}
			// });

			var xhttp = new XMLHttpRequest();

	        xhttp.onreadystatechange = function() {

	            if (this.readyState == 4 && this.status == 200) {
					self.jsonObj = JSON.parse(this.responseText);
					init();
	            }
	        };
	        xhttp.open("GET", jsonUrl, true);
	        xhttp.send();
		}

		var init = function() {
			renderData();
		}

		getJson();
		// public
		return {
			getJson : function() { return self.jsonObj }
		}


	}
