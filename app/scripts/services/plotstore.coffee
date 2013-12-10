'use strict'

# 
# The names of active plots are stored in ConfigService
# The plot data is stored in PlotStore, keyed by name
#
angular.module('jmxRtMonApp').factory('PlotStore', ($timeout, $rootScope, ConfigService) ->
	self = {}

	self.plots = {}

	self.addDatapoint = (path, dp) ->
		self.plots[path] = dp

	self.getLatestDatapoint = (path) ->
		storage = self.plots[path]
		return null unless storage
		return storage

	return self
)