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
	self.defaults = {
		refresh: 200
		seconds_to_remember: 40
		url: ""
		plots: []
		note: ""
	}

	$rootScope.$on("ConfigService.request_location_update", ->
		console.log "Got config_changed event, updating $location"
		$location.search(
			q: self.serialize()
		)
		$rootScope.$broadcast("ConfigService.location_updated")
	)

	# Deprecated, TODO: Remove
	self.set = (key, val) ->
		self.settings[key] = val

	# Deprecated, TODO: Remove
	self.get = (key) ->
		return self.settings[key]

	self.setToDefault = ->
		console.log "Reset Settings to Default"
		self.setTo self.defaults

	self.setTo = (conf) ->
		angular.copy(conf, self.settings)
		$rootScope.$emit('ConfigService.request_location_update')

	self.serialize = ->
		return encodeURIComponent(JSON.stringify(self.settings))

	self.deserialize = ->
		settings = JSON.parse(decodeURIComponent($location.search().q))
		defaults = angular.copy(self.defaults)

		merged = angular.extend(defaults, settings) # Ensures that all defaults will be present
		angular.copy(merged, self.settings)

	self.isConfigured = ->
		settings = self.settings
		return false unless settings

		url = settings.url
		return false unless url

		return url != ''

	# Initialize settings as defaults
	angular.copy(self.defaults, self.settings)
	return self
)