# CPU_Usage_Monitor
Nodejs module of cpu usage utilization monitor

<br>

Simple usage example:
```js
const cpuload = require("./cpuload.js");
var cpu_monitor = new cpuload();

cpu_monitor.onUpdate(function(load){
	console.log(load)
});

cpu_monitor.start(500)
cpu_monitor.stop();
```

<br>

Output is array of % presented by integers :
```
[ 8, 2, 11, 1 ]
[ 1, 0, 3, 0 ]
...
```
