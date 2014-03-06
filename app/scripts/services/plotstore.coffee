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

# 
# The plot settings are stored in ConfigService
# The plot data is stored in PlotStore, keyed by name
# Anything stored here is wiped on refresh
#
angular.module('jmxRtMonApp').factory('PlotStore', ($timeout, $rootScope, ConfigService) ->
	self = {}
	self.plots = {}

	HISTORYLENGTH = 100

	self.addDatapoint = (path, val) ->
		# Create if not exist
		unless self.plots[path]
			self.plots[path] = {
				series: []
			}

		# Build a datapoint
		dp = (
			x: new Date()
			y: val
		)

		# Append value
		arr = self.plots[path].series
		arr.push dp
		if arr.length > HISTORYLENGTH
			arr.shift() # Keep it at the right length

	self.getLatestDatapoint = (path) ->
		storage = self.plots[path]
		return null unless storage
		return storage.series[storage.series.length-1]

	self.getLatestDifference = (path) ->
		storage = self.plots[path]
		return null unless storage

		series = storage.series
		return null unless series.length > 2

		last = series[series.length-1]
		penultimate = series[series.length-2]

		return {
			x: last.x,
			y: last.y - penultimate.y
		}



	return self
)