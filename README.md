# Hadoop Monitor

Realtime Monitoring of Hadoop through jmx json

![](http://i.imgur.com/B2E91yt.png)

## Usage

Visit [hadoopmonitor.herokuapp.com](hadoopmonitor.herokuapp.com)

Enter the address of the cluster's json output of jmx. For example:

    Namenode running on port 50070: http://localhost:50070/jmx

    (If you visit this link you should see raw json)

Then click Connect

### Compatability

This will work with Hadoop 2.0+, or some versions of 1.X that support JSONP. If you have versions of 1.X that you wish to monitor, you'll need to install chrili/jsonwrapper.com in your internal network to proxy your requests.

## Building

Building the project is not necessary for normal usage, but it's easy to do (it's a yeoman/yeoman project).

	git clone https://github.com/chrili/hadoopmonitor.git
	npm install
	grunt build

## Patches

Feel free to submit a pull request, or if it's something big, open an issue first and we can discuss what to do.

# License

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
