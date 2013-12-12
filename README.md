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