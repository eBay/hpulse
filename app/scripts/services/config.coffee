angular.module('jmxRtMonApp').factory('ConfigService', ($timeout, $rootScope) ->
	self = {}

	self.REFRESH_PERIOD_KEY = "refresh"
	self.URL_KEY = "url"
	self.PLOTS_KEY = "plots"

	self.settings = {
		"refresh": 200
		"url": "http://localhost:50070/jmx"
		"plots": []
	}

	self.set = (key, val) ->
		self.settings[key] = val

	self.get = (key) ->
		return self.settings[key]

	self.serialize = ->
		return encodeURIComponent(JSON.stringify(self.settings))

	self.deserialize = (str) ->
		settings = JSON.parse(decodeURIComponent(str))
		for own key,val of settings
			self.set key, val

	return self
)