'use strict'

angular.module('jmxRtMonApp').factory('JmxRefresher', ($timeout, $rootScope) ->
	self = {}

	self.connected = false
	# self.url = "https://ares/proxy/ares-nn/50070/jmx"
	self.url = "http://localhost:12345"
	# self.url = "http://chrili-cluster-nn.localdomain:50070/jmx"
	# self.url = "https://apollo-phx-nn.vip.ebay.com:50070/jmx"

	self.beans = []
	self.update_interval = 200

	self.fetch_data = ->
		# jQuery.ajax
		# 	type: "GET"
		# 	url: self.url
		# 	dataType: "jsonp"
		# 	jsonp: 'callback'
		# 	success: (result) ->
		# 		console.log "Success"
		# 		self.beans = result['beans']
		# 		$rootScope.$broadcast("JmxRefresher.data_updated")
		# 	error: ->
		# 		console.log "Error!"

		jQuery.getJSON("#{self.url}?callback=?", (result) ->
			return unless result
			self.beans = result['beans']
			$rootScope.$broadcast("JmxRefresher.data_updated")
		)

	self.connect = ->
		return if self.connected # We're already connected
		self.connected = true
		console.log "Connect"

		# Infinitely poll for new data
		poll = ->
			self.fetch_data()

			$timeout((->
				poll()
			), self.update_interval)
		poll()

	return self
)