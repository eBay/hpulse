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

'use strict'

angular.module('jmxRtMonApp').factory('JmxRefresher', ($timeout, $rootScope, ConfigService) ->
	self = {}

	self.error = "Still waiting for response... Server could be slow or unreachable."
	self.connected = false
	self.url = ->
		return ConfigService.get(ConfigService.URL_KEY)

	self.beans = []
	self.update_interval = ->
		ConfigService.get(ConfigService.REFRESH_PERIOD_KEY)

	self.fetch_data = ->
		jQuery.getJSON("#{self.url()}?callback=?", (result) ->
			return unless result
			self.error = undefined
			self.beans = result['beans']
			$rootScope.$broadcast("JmxRefresher.data_updated", result.beans)
		).fail(->
			console.log "ERROR"
			self.error = "Could not connect to '#{self.url()}'. Make sure the location is reachable and returns a json document."
			$rootScope.$apply()
		)

	self.connect = ->
		if self.connected # We're already connected
			console.log "Already connected"
			return
		
		self.connected = true

		# Infinitely poll for new data
		poll = ->
			self.fetch_data()

			$timeout((->
				poll() if self.connected
			), self.update_interval())
		poll()

	self.disconnect = ->
		self.connected = false

	return self
)