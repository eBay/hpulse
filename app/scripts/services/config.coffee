###
Copyright 2013 eBay Software Foundation
 
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
 
    http://www.apache.org/licenses/LICENSE-2.0
 
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
###

angular.module('jmxRtMonApp').factory('ConfigService', ($timeout, $rootScope, $location) ->
	self = {}

	self.REFRESH_PERIOD_KEY = "refresh"
	self.URL_KEY = "url"
	self.PLOTS_KEY = "plots"

	self.settings = {}

	$rootScope.$on("ConfigService.config_changed", ->
		console.log "Got config_changed event, updating $location"
		$location.search(
			q: self.serialize()
		)
	)

	self.set = (key, val) ->
		self.settings[key] = val

	self.get = (key) ->
		return self.settings[key]

	self.setToDefault = ->
		self.settings = {
			refresh: 200
			url: ""
			plots: []
		}

	self.serialize = ->
		return encodeURIComponent(JSON.stringify(self.settings))

	self.deserialize = ->
		settings = JSON.parse(decodeURIComponent($location.search().q))
		for own key,val of settings
			self.set key, val

	self.isSynchronized = ->
		settings = JSON.parse(decodeURIComponent($location.search().q))
		return angular.equals(settings, self.settings)

	self.isConfigured = ->
		settings = self.settings
		return false unless settings

		url = settings.url
		return false unless url

		return url != ''

	return self
)