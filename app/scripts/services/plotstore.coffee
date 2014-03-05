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

	self.addDatapoint = (path, dp) ->
		# Create with Defaults
		self.plots[path] = {
			lastval: dp
		}

	self.getLatestDatapoint = (path) ->
		storage = self.plots[path]
		return null unless storage
		return storage.lastval

	return self
)