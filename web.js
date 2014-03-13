var gzippo = require('gzippo');
var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('Hi there. I am a fake namenode jmx json server. Visit me /jmx to see my data. Visit <a href="http://hpulse.io">hpulse.io</a> to learn more.');
});

function makeRand(lowBound, upBound) {
	var range = upBound - lowBound;
	var numInRange = Math.random() * range;
	return numInRange + lowBound;
}

var incrementables = {};
function randomIncrement(uniqueid) {
	if (!incrementables[uniqueid]) {
		incrementables[uniqueid] = 0;
	}

	incrementables[uniqueid] += makeRand(0, 30);
	return incrementables[uniqueid];
}

app.get('/jmx', function(req, res){
	var obj = {
		"beans" : [ {
			"name" : "java.lang:type=Memory",
			"modelerType" : "sun.management.MemoryImpl",
			"Verbose" : false,
			"ObjectPendingFinalizationCount" : 0,
			"HeapMemoryUsage" : {
				"committed" : makeRand(0, 1000000),
				"init" : makeRand(0, 1000000),
				"max" : makeRand(0, 1000000),
				"used" : makeRand(0, 1000000)
			},
			"NonHeapMemoryUsage" : {
				"committed" : makeRand(0, 1000000),
				"init" : makeRand(0, 1000000),
				"max" : makeRand(0, 1000000),
				"used" : makeRand(0, 1000000)
			},
			"ObjectName" : "java.lang:type=Memory"
		}, {
			"name" : "Hadoop:service=NameNode,name=NameNodeStatus",
			"modelerType" : "org.apache.hadoop.hdfs.server.namenode.NameNode",
			"NNRole" : "NameNode",
			"HostAndPort" : "fakenamenode.herokuapp.com:8020",
			"SecurityEnabled" : false,
			"State" : "active"
		}, {
			"name" : "Hadoop:service=NameNode,name=RpcActivityForPort8020",
			"modelerType" : "RpcActivityForPort8020",
			"tag.port" : "8020",
			"tag.Context" : "rpc",
			"tag.Hostname" : "fakenamenode.herokuapp.com",
			"ReceivedBytes" : randomIncrement("ReceivedBytes"),
			"SentBytes" : randomIncrement("SendBytes"),
			"RpcQueueTimeNumOps" : randomIncrement("RpcQueueTimeNumOps"),
			"RpcQueueTimeAvgTime" : makeRand(0, 500),
			"RpcProcessingTimeNumOps" : makeRand(0, 500),
			"RpcProcessingTimeAvgTime" : makeRand(0, 500),
			"RpcAuthenticationFailures" : randomIncrement("RpcAuthenticationFailures"),
			"RpcAuthenticationSuccesses" : randomIncrement("RpcAuthenticationSuccesses"),
			"RpcAuthorizationFailures" : randomIncrement("RpcAuthorizationFailures"),
			"RpcAuthorizationSuccesses" : randomIncrement("RpcAuthorizationSuccesses"),
			"NumOpenConnections" : makeRand(0, 10),
			"CallQueueLength" : makeRand(0, 300)
		}, {
			"name" : "java.nio:type=BufferPool,name=mapped",
			"modelerType" : "sun.management.ManagementFactoryHelper$1",
			"TotalCapacity" : makeRand(0, 21083),
			"MemoryUsed" : makeRand(0, 21083),
			"Count" : makeRand(0, 10),
			"Name" : "mapped",
			"ObjectName" : "java.nio:type=BufferPool,name=mapped"
		}, {
			"name" : "Hadoop:service=NameNode,name=NameNodeActivity",
			"modelerType" : "NameNodeActivity",
			"tag.ProcessName" : "NameNode",
			"tag.SessionId" : null,
			"tag.Context" : "dfs",
			"tag.Hostname" : "fakenamenode.herokuapp.com",
			"CreateFileOps" : randomIncrement("CreateFileOps"),
			"FilesCreated" : randomIncrement("FilesCreated"),
			"FilesAppended" : randomIncrement("FilesAppended"),
			"GetBlockLocations" : randomIncrement("GetBlockLocations"),
			"FilesRenamed" : randomIncrement("FilesRenamed"),
			"GetListingOps" : randomIncrement("GetListingOps"),
			"DeleteFileOps" : randomIncrement("DeleteFileOps"),
			"FilesDeleted" : randomIncrement("FilesDeleted"),
			"FileInfoOps" : randomIncrement("FileInfoOps"),
			"AddBlockOps" : randomIncrement("AddBlockOps"),
			"GetAdditionalDatanodeOps" : randomIncrement("GetAdditionalDatanodeOps"),
			"CreateSymlinkOps" : randomIncrement("CreateSymlinkOps"),
			"GetLinkTargetOps" : randomIncrement("GetLinkTargetOps"),
			"FilesInGetListingOps" : randomIncrement("FilesInGetListingOps"),
			"AllowSnapshotOps" : randomIncrement("AllowSnapshotOps"),
			"DisallowSnapshotOps" : randomIncrement("DisallowSnapshotOps"),
			"CreateSnapshotOps" : randomIncrement("CreateSnapshotOps"),
			"DeleteSnapshotOps" : randomIncrement("DeleteSnapshotOps"),
			"RenameSnapshotOps" : randomIncrement("RenameSnapshotOps"),
			"ListSnapshottableDirOps" : randomIncrement("ListSnapshottableDirOps"),
			"SnapshotDiffReportOps" : randomIncrement("SnapshotDiffReportOps"),
			"BlockReceivedAndDeletedOps" : randomIncrement("BlockReceivedAndDeletedOps"),
			"TransactionsNumOps" : randomIncrement("TransactionsNumOps"),
			"TransactionsAvgTime" : makeRand(0, 100),
			"SyncsNumOps" : randomIncrement("SyncsNumOps"),
			"SyncsAvgTime" : makeRand(0, 10),
			"TransactionsBatchedInSync" : randomIncrement("TransactionsBatchedInSync"),
			"BlockReportNumOps" : randomIncrement("BlockReportNumOps"),
			"BlockReportAvgTime" : makeRand(0, 100),
			"CacheReportNumOps" : randomIncrement("CacheReportNumOps"),
			"CacheReportAvgTime" : makeRand(0, 50),
			"SafeModeTime" : 0,
			"FsImageLoadTime" : makeRand(0, 100),
			"GetEditNumOps" : randomIncrement("GetEditNumOps"),
			"GetEditAvgTime" : makeRand(0, 100),
			"GetImageNumOps" : randomIncrement("GetImageNumOps"),
			"GetImageAvgTime" : makeRand(0, 100),
			"PutImageNumOps" : randomIncrement("PutImageNumOps"),
			"PutImageAvgTime" : makeRand(0, 100)
		}, {
			"name" : "java.lang:type=Compilation",
			"modelerType" : "sun.management.CompilationImpl",
			"TotalCompilationTime" : makeRand(0, 10000),
			"CompilationTimeMonitoringSupported" : true,
			"Name" : "HotSpot 64-Bit Tiered Compilers",
			"ObjectName" : "java.lang:type=Compilation"
		}, {
			"name" : "java.lang:type=GarbageCollector,name=MarkSweepCompact",
			"modelerType" : "sun.management.GarbageCollectorImpl",
			"LastGcInfo" : {
				"GcThreadCount" : 1,
				"duration" : 35,
				"endTime" : 4286,
				"id" : 2,
				"memoryUsageAfterGc" : [ {
					"key" : "Eden Space",
					"value" : {
						"committed" : 4521984,
						"init" : 4456448,
						"max" : 279642112,
						"used" : 0
					}
				}, {
					"key" : "Code Cache",
					"value" : {
						"committed" : 2555904,
						"init" : 2555904,
						"max" : 50331648,
						"used" : 1103552
					}
				}, {
					"key" : "Perm Gen",
					"value" : {
						"committed" : 21757952,
						"init" : 21757952,
						"max" : 174063616,
						"used" : 19429856
					}
				}, {
					"key" : "Survivor Space",
					"value" : {
						"committed" : 524288,
						"init" : 524288,
						"max" : 34930688,
						"used" : 0
					}
				}, {
					"key" : "Tenured Gen",
					"value" : {
						"committed" : 19996672,
						"init" : 11075584,
						"max" : 699072512,
						"used" : 19783728
					}
				} ],
				"memoryUsageBeforeGc" : [ {
					"key" : "Eden Space",
					"value" : {
						"committed" : 4521984,
						"init" : 4456448,
						"max" : 279642112,
						"used" : 0
					}
				}, {
					"key" : "Code Cache",
					"value" : {
						"committed" : 2555904,
						"init" : 2555904,
						"max" : 50331648,
						"used" : 1103552
					}
				}, {
					"key" : "Perm Gen",
					"value" : {
						"committed" : 21757952,
						"init" : 21757952,
						"max" : 174063616,
						"used" : 19429856
					}
				}, {
					"key" : "Survivor Space",
					"value" : {
						"committed" : 524288,
						"init" : 524288,
						"max" : 34930688,
						"used" : 415688
					}
				}, {
					"key" : "Tenured Gen",
					"value" : {
						"committed" : 19996672,
						"init" : 11075584,
						"max" : 699072512,
						"used" : 19532968
					}
				} ],
				"startTime" : 4251
			},
			"CollectionCount" : 2,
			"CollectionTime" : 57,
			"MemoryPoolNames" : [ "Eden Space", "Survivor Space", "Tenured Gen", "Perm Gen" ],
			"Valid" : true,
			"Name" : "MarkSweepCompact",
			"ObjectName" : "java.lang:type=GarbageCollector,name=MarkSweepCompact"
		}, {
			"name" : "java.lang:type=MemoryPool,name=Perm Gen",
			"modelerType" : "sun.management.MemoryPoolImpl",
			"Usage" : {
				"committed" : 26345472,
				"init" : 21757952,
				"max" : 174063616,
				"used" : 26177152
			},
			"PeakUsage" : {
				"committed" : 26345472,
				"init" : 21757952,
				"max" : 174063616,
				"used" : 26177152
			},
			"MemoryManagerNames" : [ "MarkSweepCompact" ],
			"UsageThreshold" : 0,
			"UsageThresholdExceeded" : false,
			"UsageThresholdCount" : 0,
			"UsageThresholdSupported" : true,
			"CollectionUsageThreshold" : 0,
			"CollectionUsageThresholdExceeded" : false,
			"CollectionUsageThresholdCount" : 0,
			"CollectionUsage" : {
				"committed" : 21757952,
				"init" : 21757952,
				"max" : 174063616,
				"used" : 19429856
			},
			"CollectionUsageThresholdSupported" : true,
			"Valid" : true,
			"Name" : "Perm Gen",
			"Type" : "NON_HEAP",
			"ObjectName" : "java.lang:type=MemoryPool,name=Perm Gen"
		}, {
			"name" : "java.lang:type=OperatingSystem",
			"modelerType" : "com.sun.management.UnixOperatingSystem",
			"OpenFileDescriptorCount" : makeRand(50, 100),
			"MaxFileDescriptorCount" : 4096,
			"CommittedVirtualMemorySize" : makeRand(1000000, 1710034944),
			"TotalSwapSpaceSize" : makeRand(0, 2080366592),
			"FreeSwapSpaceSize" : makeRand(0, 2077167616),
			"ProcessCpuTime" : makeRand(1111112220, 201950000000),
			"FreePhysicalMemorySize" : makeRand(152330240, 252330240),
			"TotalPhysicalMemorySize" : 1059708928,
			"SystemCpuLoad" : makeRand(0, 10),
			"ProcessCpuLoad" : 0.0,
			"Arch" : "amd64",
			"SystemLoadAverage" : 0.0,
			"Version" : "2.6.32-431.5.1.el6.x86_64",
			"AvailableProcessors" : 1,
			"Name" : "Linux",
			"ObjectName" : "java.lang:type=OperatingSystem"
		}, {
			"name" : "Hadoop:service=NameNode,name=UgiMetrics",
			"modelerType" : "UgiMetrics",
			"tag.Context" : "ugi",
			"tag.Hostname" : "fakenamenode.herokuapp.com",
			"LoginSuccessNumOps" : randomIncrement("LoginSuccessNumOps"),
			"LoginSuccessAvgTime" : makeRand(0, 100),
			"LoginFailureNumOps" : randomIncrement("LoginFailureNumOps"),
			"LoginFailureAvgTime" : makeRand(0, 100),
			"GetGroupsNumOps" : 7,
			"GetGroupsAvgTime" : makeRand(0, 10)
		}, {
			"name" : "java.lang:type=MemoryManager,name=CodeCacheManager",
			"modelerType" : "sun.management.MemoryManagerImpl",
			"MemoryPoolNames" : [ "Code Cache" ],
			"Valid" : true,
			"Name" : "CodeCacheManager",
			"ObjectName" : "java.lang:type=MemoryManager,name=CodeCacheManager"
		}, {
			"name" : "java.lang:type=GarbageCollector,name=Copy",
			"modelerType" : "sun.management.GarbageCollectorImpl",
			"LastGcInfo" : {
				"GcThreadCount" : 1,
				"duration" : 1,
				"endTime" : 102298590,
				"id" : 116,
				"memoryUsageAfterGc" : [ {
					"key" : "Eden Space",
					"value" : {
						"committed" : 13238272,
						"init" : 4456448,
						"max" : 279642112,
						"used" : 0
					}
				}, {
					"key" : "Code Cache",
					"value" : {
						"committed" : 2949120,
						"init" : 2555904,
						"max" : 50331648,
						"used" : 2869376
					}
				}, {
					"key" : "Perm Gen",
					"value" : {
						"committed" : 26345472,
						"init" : 21757952,
						"max" : 174063616,
						"used" : 26177152
					}
				}, {
					"key" : "Survivor Space",
					"value" : {
						"committed" : 1638400,
						"init" : 524288,
						"max" : 34930688,
						"used" : 69544
					}
				}, {
					"key" : "Tenured Gen",
					"value" : {
						"committed" : 32976896,
						"init" : 11075584,
						"max" : 699072512,
						"used" : 24037320
					}
				} ],
				"memoryUsageBeforeGc" : [ {
					"key" : "Eden Space",
					"value" : {
						"committed" : 13238272,
						"init" : 4456448,
						"max" : 279642112,
						"used" : 13238272
					}
				}, {
					"key" : "Code Cache",
					"value" : {
						"committed" : 2949120,
						"init" : 2555904,
						"max" : 50331648,
						"used" : 2869376
					}
				}, {
					"key" : "Perm Gen",
					"value" : {
						"committed" : 26345472,
						"init" : 21757952,
						"max" : 174063616,
						"used" : 26177152
					}
				}, {
					"key" : "Survivor Space",
					"value" : {
						"committed" : 1638400,
						"init" : 524288,
						"max" : 34930688,
						"used" : 22064
					}
				}, {
					"key" : "Tenured Gen",
					"value" : {
						"committed" : 32976896,
						"init" : 11075584,
						"max" : 699072512,
						"used" : 24036784
					}
				} ],
				"startTime" : 102298589
			},
			"CollectionCount" : 116,
			"CollectionTime" : 520,
			"MemoryPoolNames" : [ "Eden Space", "Survivor Space" ],
			"Valid" : true,
			"Name" : "Copy",
			"ObjectName" : "java.lang:type=GarbageCollector,name=Copy"
		}, {
			"name" : "Hadoop:service=NameNode,name=MetricsSystem,sub=Control",
			"modelerType" : "org.apache.hadoop.metrics2.impl.MetricsSystemImpl"
		}, {
			"name" : "Hadoop:service=NameNode,name=RpcDetailedActivityForPort8020",
			"modelerType" : "RpcDetailedActivityForPort8020",
			"tag.port" : "8020",
			"tag.Context" : "rpcdetailed",
			"tag.Hostname" : "fakenamenode.herokuapp.com",
			"GetFileInfoNumOps" : 1,
			"GetFileInfoAvgTime" : 17.0
		}, {
			"name" : "Hadoop:service=NameNode,name=JvmMetrics",
			"modelerType" : "JvmMetrics",
			"tag.Context" : "jvm",
			"tag.ProcessName" : "NameNode",
			"tag.SessionId" : null,
			"tag.Hostname" : "fakenamenode.herokuapp.com",
			"MemNonHeapUsedM" : makeRand(0, 30),
			"MemNonHeapCommittedM" : makeRand(0, 30),
			"MemNonHeapMaxM" : 214.0,
			"MemHeapUsedM" : 28.34262,
			"MemHeapCommittedM" : 45.63672,
			"MemHeapMaxM" : 966.6875,
			"MemMaxM" : 966.6875,
			"GcCountCopy" : 116,
			"GcTimeMillisCopy" : 520,
			"GcCountMarkSweepCompact" : 2,
			"GcTimeMillisMarkSweepCompact" : 57,
			"GcCount" : 118,
			"GcTimeMillis" : 577,
			"ThreadsNew" : makeRand(0, 10),
			"ThreadsRunnable" : makeRand(28, 30),
			"ThreadsBlocked" : makeRand(0, 2),
			"ThreadsWaiting" : makeRand(0, 2),
			"ThreadsTimedWaiting" : makeRand(0, 1),
			"ThreadsTerminated" : makeRand(0, 1),
			"LogFatal" : 0,
			"LogError" : 0,
			"LogWarn" : 8,
			"LogInfo" : 859
		}, {
			"name" : "Hadoop:service=NameNode,name=FSNamesystemState",
			"modelerType" : "org.apache.hadoop.hdfs.server.namenode.FSNamesystem",
			"CapacityTotal" : makeRand(100000, 300000),
			"CapacityUsed" : randomIncrement("CapacityUsed"),
			"CapacityRemaining" : makeRand(10000, 12000),
			"TotalLoad" : makeRand(0, 100),
			"SnapshotStats" : "{\"SnapshottableDirectories\":0,\"Snapshots\":0}",
			"BlocksTotal" : randomIncrement("BlocksTotal"),
			"MaxObjects" : 10000000,
			"FilesTotal" : randomIncrement("FilesTotal"),
			"PendingReplicationBlocks" : makeRand(0, 100),
			"UnderReplicatedBlocks" : makeRand(0, 100),
			"ScheduledReplicationBlocks" : makeRand(0, 100),
			"FSState" : "Operational",
			"NumLiveDataNodes" : makeRand(1000, 1020),
			"NumDeadDataNodes" : makeRand(0, 20),
			"NumDecomLiveDataNodes" : makeRand(0, 20),
			"NumDecomDeadDataNodes" : makeRand(0, 20),
			"NumDecommissioningDataNodes" : makeRand(0, 1),
			"NumStaleDataNodes" : makeRand(0, 10)
		}, {
			"name" : "java.lang:type=MemoryPool,name=Code Cache",
			"modelerType" : "sun.management.MemoryPoolImpl",
			"Usage" : {
				"committed" : 2949120,
				"init" : 2555904,
				"max" : 50331648,
				"used" : 2869376
			},
			"PeakUsage" : {
				"committed" : 2949120,
				"init" : 2555904,
				"max" : 50331648,
				"used" : 2880064
			},
			"MemoryManagerNames" : [ "CodeCacheManager" ],
			"UsageThreshold" : 0,
			"UsageThresholdExceeded" : false,
			"UsageThresholdCount" : 0,
			"UsageThresholdSupported" : true,
			"CollectionUsage" : null,
			"CollectionUsageThresholdSupported" : false,
			"Valid" : true,
			"Name" : "Code Cache",
			"Type" : "NON_HEAP",
			"ObjectName" : "java.lang:type=MemoryPool,name=Code Cache"
		}, {
			"name" : "java.lang:type=Runtime",
			"modelerType" : "sun.management.RuntimeImpl",
			"SpecName" : "Java Virtual Machine Specification",
			"SpecVendor" : "Oracle Corporation",
			"SpecVersion" : "1.7",
			"ManagementSpecVersion" : "1.2",
			"Uptime" : 103381053,
			"SystemProperties" : [ {
				"key" : "java.vm.version",
				"value" : "24.45-b08"
			}, {
				"key" : "java.vendor.url",
				"value" : "http://java.oracle.com/"
			}, {
				"key" : "sun.jnu.encoding",
				"value" : "UTF-8"
			}, {
				"key" : "java.vm.info",
				"value" : "mixed mode"
			}, {
				"key" : "user.dir",
				"value" : "/opt/apache"
			}, {
				"key" : "sun.cpu.isalist",
				"value" : ""
			}, {
				"key" : "java.awt.graphicsenv",
				"value" : "sun.awt.X11GraphicsEnvironment"
			}, {
				"key" : "sun.os.patch.level",
				"value" : "unknown"
			}, {
				"key" : "hadoop.log.dir",
				"value" : "/opt/apache/logs"
			}, {
				"key" : "java.io.tmpdir",
				"value" : "/tmp"
			}, {
				"key" : "java.awt.printerjob",
				"value" : "sun.print.PSPrinterJob"
			}, {
				"key" : "java.version",
				"value" : "1.7.0_51"
			}, {
				"key" : "file.encoding.pkg",
				"value" : "sun.io"
			}, {
				"key" : "java.vendor.url.bug",
				"value" : "http://bugreport.sun.com/bugreport/"
			}, {
				"key" : "file.encoding",
				"value" : "UTF-8"
			}, {
				"key" : "line.separator",
				"value" : "\n"
			}, {
				"key" : "sun.java.command",
				"value" : "org.apache.hadoop.hdfs.server.namenode.NameNode"
			}, {
				"key" : "java.vm.specification.vendor",
				"value" : "Oracle Corporation"
			}, {
				"key" : "java.vm.vendor",
				"value" : "Oracle Corporation"
			}, {
				"key" : "hadoop.security.logger",
				"value" : "INFO,RFAS"
			}, {
				"key" : "sun.io.unicode.encoding",
				"value" : "UnicodeLittle"
			}, {
				"key" : "os.arch",
				"value" : "amd64"
			}, {
				"key" : "user.language",
				"value" : "en"
			}, {
				"key" : "java.runtime.version",
				"value" : "1.7.0_51-mockbuild_2014_01_15_01_39-b00"
			}, {
				"key" : "sun.cpu.endian",
				"value" : "little"
			}, {
				"key" : "awt.toolkit",
				"value" : "sun.awt.X11.XToolkit"
			}, {
				"key" : "hadoop.root.logger",
				"value" : "INFO,RFA"
			}, {
				"key" : "sun.boot.library.path",
				"value" : "/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.51.x86_64/jre/lib/amd64"
			}, {
				"key" : "java.vm.name",
				"value" : "OpenJDK 64-Bit Server VM"
			}, {
				"key" : "java.home",
				"value" : "/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.51.x86_64/jre"
			}, {
				"key" : "java.endorsed.dirs",
				"value" : "/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.51.x86_64/jre/lib/endorsed"
			}, {
				"key" : "java.net.preferIPv4Stack",
				"value" : "true"
			}, {
				"key" : "sun.management.compiler",
				"value" : "HotSpot 64-Bit Tiered Compilers"
			}, {
				"key" : "java.runtime.name",
				"value" : "OpenJDK Runtime Environment"
			}, {
				"key" : "hdfs.audit.logger",
				"value" : "INFO,NullAppender"
			}, {
				"key" : "java.library.path",
				"value" : "/usr/java/packages/lib/amd64:/usr/lib64:/lib64:/lib:/usr/lib"
			}, {
				"key" : "file.separator",
				"value" : "/"
			}, {
				"key" : "java.specification.vendor",
				"value" : "Oracle Corporation"
			}, {
				"key" : "java.vm.specification.version",
				"value" : "1.7"
			}, {
				"key" : "hadoop.home.dir",
				"value" : "/opt/apache"
			}, {
				"key" : "sun.java.launcher",
				"value" : "SUN_STANDARD"
			}, {
				"key" : "user.timezone",
				"value" : "GMT-08:00"
			}, {
				"key" : "os.name",
				"value" : "Linux"
			}, {
				"key" : "path.separator",
				"value" : ":"
			}, {
				"key" : "proc_namenode",
				"value" : ""
			}, {
				"key" : "java.ext.dirs",
				"value" : "/usr/lib/jvm/java-1.7.0-openjdk-1.7.0.51.x86_64/jre/lib/ext:/usr/java/packages/lib/ext"
			}, {
				"key" : "sun.arch.data.model",
				"value" : "64"
			}, {
				"key" : "java.specification.name",
				"value" : "Java Platform API Specification"
			}, {
				"key" : "os.version",
				"value" : "2.6.32-431.5.1.el6.x86_64"
			}, {
				"key" : "hadoop.policy.file",
				"value" : "hadoop-policy.xml"
			}, {
				"key" : "user.country",
				"value" : "US"
			}, {
				"key" : "java.class.version",
				"value" : "51.0"
			}, {
				"key" : "java.vendor",
				"value" : "Oracle Corporation"
			}, {
				"key" : "java.vm.specification.name",
				"value" : "Java Virtual Machine Specification"
			}, {
				"key" : "java.specification.version",
				"value" : "1.7"
			} ],
			"StartTime" : 1392271554024,
			"BootClassPathSupported" : true,
			"VmName" : "OpenJDK 64-Bit Server VM",
			"VmVendor" : "Oracle Corporation",
			"VmVersion" : "24.45-b08",
			"LibraryPath" : "-",
			"BootClassPath" : "-",
			"Name" : "user@fakenamenode.herokuapp.com",
			"ClassPath" : "-",
			"ObjectName" : "java.lang:type=Runtime"
		}, {
			"name" : "java.nio:type=BufferPool,name=direct",
			"modelerType" : "sun.management.ManagementFactoryHelper$1",
			"TotalCapacity" : 1913595,
			"MemoryUsed" : 1913595,
			"Count" : 20,
			"Name" : "direct",
			"ObjectName" : "java.nio:type=BufferPool,name=direct"
		}, {
			"name" : "java.lang:type=ClassLoading",
			"modelerType" : "sun.management.ClassLoadingImpl",
			"TotalLoadedClassCount" : 3829,
			"Verbose" : false,
			"LoadedClassCount" : 3829,
			"UnloadedClassCount" : 0,
			"ObjectName" : "java.lang:type=ClassLoading"
		}, {
			"name" : "java.lang:type=Threading",
			"modelerType" : "sun.management.ThreadImpl",
			"ThreadAllocatedMemorySupported" : true,
			"ThreadAllocatedMemoryEnabled" : true,
			"ThreadCount" : makeRand(0, 100),
			"ThreadContentionMonitoringSupported" : true,
			"CurrentThreadCpuTimeSupported" : true,
			"ObjectMonitorUsageSupported" : true,
			"SynchronizerUsageSupported" : true,
			"ThreadCpuTimeEnabled" : true,
			"PeakThreadCount" : makeRand(90, 100),
			"TotalStartedThreadCount" : randomIncrement("TotalStartedThreadCount"),
			"ThreadCpuTimeSupported" : true,
			"CurrentThreadCpuTime" : makeRand(10000, 200000),
			"CurrentThreadUserTime" : makeRand(10000, 20000),
			"ThreadContentionMonitoringEnabled" : false,
			"AllThreadIds" : [ 103, 36, 35, 34, 33, 32, 31, 30, 29, 28, 20, 23, 17, 18, 27, 26, 24, 22, 21, 16, 15, 12, 4, 3, 2, 1 ],
			"ObjectName" : "java.lang:type=Threading"
		}, {
			"name" : "Hadoop:service=NameNode,name=FSNamesystem",
			"modelerType" : "FSNamesystem",
			"tag.Context" : "dfs",
			"tag.HAState" : "active",
			"tag.Hostname" : "fakenamenode.herokuapp.com",
			"MissingBlocks" : makeRand(0, 10),
			"ExpiredHeartbeats" : makeRand(0, 10),
			"TransactionsSinceLastCheckpoint" : 1,
			"TransactionsSinceLastLogRoll" : 1,
			"LastWrittenTransactionId" : 3,
			"LastCheckpointTime" : 1392271558172,
			"CapacityTotal" : makeRand(10000, 12000),
			"CapacityTotalGB" : makeRand(10000, 12000),
			"CapacityUsed" : makeRand(10000, 12000),
			"CapacityUsedGB" : makeRand(10000, 12000),
			"CapacityRemaining" : makeRand(10000, 12000),
			"CapacityRemainingGB" : makeRand(10000, 12000),
			"CapacityUsedNonDFS" : makeRand(10000, 12000),
			"TotalLoad" : makeRand(10000, 12000),
			"SnapshottableDirectories" : makeRand(10000, 12000),
			"Snapshots" : makeRand(10000, 12000),
			"BlocksTotal" : makeRand(10000, 12000),
			"FilesTotal" : makeRand(10000, 12000),
			"PendingReplicationBlocks" : makeRand(10000, 12000),
			"UnderReplicatedBlocks" : makeRand(10000, 12000),
			"CorruptBlocks" : makeRand(10000, 12000),
			"ScheduledReplicationBlocks" : makeRand(10000, 12000),
			"PendingDeletionBlocks" : makeRand(10000, 12000),
			"ExcessBlocks" : makeRand(10000, 12000),
			"PostponedMisreplicatedBlocks" : makeRand(10000, 12000),
			"PendingDataNodeMessageCount" : makeRand(10000, 12000),
			"MillisSinceLastLoadedEdits" : makeRand(10000, 12000),
			"BlockCapacity" : makeRand(10000, 12000),
			"StaleDataNodes" : makeRand(10000, 12000),
			"TotalFiles" : makeRand(10000, 12000),
		}, {
			"name" : "Hadoop:service=NameNode,name=StartupProgress",
			"modelerType" : "StartupProgress",
			"tag.Hostname" : "fakenamenode.herokuapp.com",
			"ElapsedTime" : makeRand(10000, 12000),
			"PercentComplete" : makeRand(10000, 12000),
			"LoadingFsImageCount" : makeRand(10000, 12000),
			"LoadingFsImageElapsedTime" : makeRand(10000, 12000),
			"LoadingFsImageTotal" : makeRand(10000, 12000),
			"LoadingFsImagePercentComplete" : makeRand(10000, 12000),
			"LoadingEditsCount" : makeRand(10000, 12000),
			"LoadingEditsElapsedTime" : makeRand(10000, 12000),
			"LoadingEditsTotal" : makeRand(10000, 12000),
			"LoadingEditsPercentComplete" : makeRand(10000, 12000),
			"SavingCheckpointCount" : makeRand(10000, 12000),
			"SavingCheckpointElapsedTime" : makeRand(10000, 12000),
			"SavingCheckpointTotal" : makeRand(10000, 12000),
			"SavingCheckpointPercentComplete" : makeRand(10000, 12000),
			"SafeModeCount" : makeRand(10000, 12000),
			"SafeModeElapsedTime" : makeRand(10000, 12000),
			"SafeModeTotal" : makeRand(10000, 12000),
			"SafeModePercentComplete" : makeRand(10000, 12000),
		}, {
			"name" : "java.util.logging:type=Logging",
			"modelerType" : "sun.management.ManagementFactoryHelper$PlatformLoggingImpl",
			"ObjectName" : "java.util.logging:type=Logging",
		}, {
			"name" : "Hadoop:service=NameNode,name=MetricsSystem,sub=Stats",
			"modelerType" : "MetricsSystem,sub=Stats",
			"tag.Context" : "metricssystem",
			"tag.Hostname" : "fakenamenode.herokuapp.com",
			"NumActiveSources" : 7,
			"NumAllSources" : 7,
			"NumActiveSinks" : 0,
			"NumAllSinks" : 0,
			"SnapshotNumOps" : 0,
			"SnapshotAvgTime" : 0.0,
			"PublishNumOps" : 0,
			"PublishAvgTime" : 0.0,
			"DroppedPubAll" : 0
		}, {
			"name" : "java.lang:type=MemoryPool,name=Eden Space",
			"modelerType" : "sun.management.MemoryPoolImpl",
			"Usage" : {
				"committed" : 13238272,
				"init" : 4456448,
				"max" : 279642112,
				"used" : 5878528
			},
			"PeakUsage" : {
				"committed" : 13238272,
				"init" : 4456448,
				"max" : 279642112,
				"used" : 13238272
			},
			"MemoryManagerNames" : [ "MarkSweepCompact", "Copy" ],
			"UsageThresholdSupported" : false,
			"CollectionUsageThreshold" : 0,
			"CollectionUsageThresholdExceeded" : false,
			"CollectionUsageThresholdCount" : 0,
			"CollectionUsage" : {
				"committed" : 13238272,
				"init" : 4456448,
				"max" : 279642112,
				"used" : 0
			},
			"CollectionUsageThresholdSupported" : true,
			"Valid" : true,
			"Name" : "Eden Space",
			"Type" : "HEAP",
			"ObjectName" : "java.lang:type=MemoryPool,name=Eden Space"
		}, {
			"name" : "Hadoop:service=NameNode,name=NameNodeInfo",
			"modelerType" : "org.apache.hadoop.hdfs.server.namenode.FSNamesystem",
			"Total" : 0,
			"ClusterId" : "CID-c051b952-958e-4f02-a1da-992348c5a9d5",
			"Version" : "3.0.0-SNAPSHOT, re74251d553f3cab8df6c66aeaa7edbcd8b602872",
			"Used" : 0,
			"Free" : 0,
			"Safemode" : "",
			"UpgradeFinalized" : true,
			"NonDfsUsedSpace" : 0,
			"PercentUsed" : 100.0,
			"BlockPoolUsedSpace" : 0,
			"PercentBlockPoolUsed" : 100.0,
			"PercentRemaining" : 0.0,
			"CacheCapacity" : 0,
			"CacheUsed" : 0,
			"TotalBlocks" : 0,
			"TotalFiles" : 1,
			"NumberOfMissingBlocks" : 0,
			"LiveNodes" : "{}",
			"DeadNodes" : "{}",
			"DecomNodes" : "{}",
			"BlockPoolId" : "BP-1713910848-192.168.16.131-1392105610849",
			"NodeUsage" : "{\"nodeUsage\":{\"min\":\"0.00%\",\"median\":\"0.00%\",\"max\":\"0.00%\",\"stdDev\":\"0.00%\"}}",
			"JournalTransactionInfo" : "{\"LastAppliedOrWrittenTxId\":\"3\",\"MostRecentCheckpointTxId\":\"2\"}",
			"NNStarted" : "Wed Feb 12 22:05:57 GMT-08:00 2014",
			"CorruptFiles" : "[]",
			"DistinctVersionCount" : 0,
			"DistinctVersions" : [ ],
			"SoftwareVersion" : "3.0.0-SNAPSHOT",
			"Threads" : 26
		}, {
			"name" : "com.sun.management:type=HotSpotDiagnostic",
			"modelerType" : "sun.management.HotSpotDiagnostic",
			"DiagnosticOptions" : [ {
				"name" : "HeapDumpBeforeFullGC",
				"origin" : "DEFAULT",
				"value" : "false",
				"writeable" : true
			}, {
				"name" : "HeapDumpAfterFullGC",
				"origin" : "DEFAULT",
				"value" : "false",
				"writeable" : true
			}, {
				"name" : "HeapDumpOnOutOfMemoryError",
				"origin" : "DEFAULT",
				"value" : "false",
				"writeable" : true
			}, {
				"name" : "HeapDumpPath",
				"origin" : "DEFAULT",
				"value" : "",
				"writeable" : true
			}, {
				"name" : "CMSAbortablePrecleanWaitMillis",
				"origin" : "DEFAULT",
				"value" : "100",
				"writeable" : true
			}, {
				"name" : "CMSWaitDuration",
				"origin" : "DEFAULT",
				"value" : "2000",
				"writeable" : true
			}, {
				"name" : "PrintGC",
				"origin" : "DEFAULT",
				"value" : "false",
				"writeable" : true
			}, {
				"name" : "PrintGCDetails",
				"origin" : "DEFAULT",
				"value" : "false",
				"writeable" : true
			}, {
				"name" : "PrintGCDateStamps",
				"origin" : "DEFAULT",
				"value" : "false",
				"writeable" : true
			}, {
				"name" : "PrintGCTimeStamps",
				"origin" : "DEFAULT",
				"value" : "false",
				"writeable" : true
			}, {
				"name" : "PrintClassHistogramBeforeFullGC",
				"origin" : "DEFAULT",
				"value" : "false",
				"writeable" : true
			}, {
				"name" : "PrintClassHistogramAfterFullGC",
				"origin" : "DEFAULT",
				"value" : "false",
				"writeable" : true
			}, {
				"name" : "PrintClassHistogram",
				"origin" : "DEFAULT",
				"value" : "false",
				"writeable" : true
			}, {
				"name" : "PrintConcurrentLocks",
				"origin" : "DEFAULT",
				"value" : "false",
				"writeable" : true
			} ],
			"ObjectName" : "com.sun.management:type=HotSpotDiagnostic"
		}, {
			"name" : "java.lang:type=MemoryPool,name=Survivor Space",
			"modelerType" : "sun.management.MemoryPoolImpl",
			"Usage" : {
				"committed" : 1638400,
				"init" : 524288,
				"max" : 34930688,
				"used" : 69544
			},
			"PeakUsage" : {
				"committed" : 1638400,
				"init" : 524288,
				"max" : 34930688,
				"used" : 1638400
			},
			"MemoryManagerNames" : [ "MarkSweepCompact", "Copy" ],
			"UsageThresholdSupported" : false,
			"CollectionUsageThreshold" : 0,
			"CollectionUsageThresholdExceeded" : false,
			"CollectionUsageThresholdCount" : 0,
			"CollectionUsage" : {
				"committed" : 1638400,
				"init" : 524288,
				"max" : 34930688,
				"used" : 69544
			},
			"CollectionUsageThresholdSupported" : true,
			"Valid" : true,
			"Name" : "Survivor Space",
			"Type" : "HEAP",
			"ObjectName" : "java.lang:type=MemoryPool,name=Survivor Space"
		}, {
			"name" : "java.lang:type=MemoryPool,name=Tenured Gen",
			"modelerType" : "sun.management.MemoryPoolImpl",
			"Usage" : {
				"committed" : 32976896,
				"init" : 11075584,
				"max" : 699072512,
				"used" : 24037320
			},
			"PeakUsage" : {
				"committed" : 32976896,
				"init" : 11075584,
				"max" : 699072512,
				"used" : 24037320
			},
			"MemoryManagerNames" : [ "MarkSweepCompact" ],
			"UsageThreshold" : 0,
			"UsageThresholdExceeded" : false,
			"UsageThresholdCount" : 0,
			"UsageThresholdSupported" : true,
			"CollectionUsageThreshold" : 0,
			"CollectionUsageThresholdExceeded" : false,
			"CollectionUsageThresholdCount" : 0,
			"CollectionUsage" : {
				"committed" : 19996672,
				"init" : 11075584,
				"max" : 699072512,
				"used" : 19783728
			},
			"CollectionUsageThresholdSupported" : true,
			"Valid" : true,
			"Name" : "Tenured Gen",
			"Type" : "HEAP",
			"ObjectName" : "java.lang:type=MemoryPool,name=Tenured Gen"
		}, {
			"name" : "JMImplementation:type=MBeanServerDelegate",
			"modelerType" : "javax.management.MBeanServerDelegate",
			"MBeanServerId" : "fakenamenode.herokuapp.com_1392271555638",
			"SpecificationName" : "Java Management Extensions",
			"SpecificationVersion" : "1.4",
			"SpecificationVendor" : "Oracle Corporation",
			"ImplementationName" : "JMX",
			"ImplementationVersion" : "1.7.0_51-mockbuild_2014_01_15_01_39-b00",
			"ImplementationVendor" : "Oracle Corporation"
		} ]
	}

	res.jsonp(obj);
});

app.use(express.logger('dev'));
app.listen(process.env.PORT || 5000);
