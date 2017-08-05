"use strict"

const os = require('os');

var CpuLoad = function () {
	var prev_info = os.cpus();
	var usage = new Array(prev_info.length);
	var timer = null;
	var update = null;

	CpuLoad.prototype.onUpdate = function(callback){
		update = callback;
	}

	CpuLoad.prototype.start = function(_delay){
		let delay;

		if(_delay){
			delay = _delay;
		}else{
			delay = 1000;
		}

		timer = setInterval(function(){		
			let info = os.cpus();

			for (let i in prev_info) {
				let cpu = info[i].times;
				let prev_cpu = prev_info[i].times;
				
				let user =  cpu.user - prev_cpu.user;
				let idle = cpu.idle - prev_cpu.idle;
				let sys = cpu.sys - prev_cpu.sys;
				let nice = cpu.nice - prev_cpu.nice;

				let total = sys + user + idle + nice;
				usage[i] = Math.round(((total - idle) * 100.0) / (total));
			}

			prev_info = info;

			if(update){
				update(usage);
			}

		}, delay);
	}

	CpuLoad.prototype.stop = function(){
		if(timer){
			clearInterval(timer)
			timer = null;
		}
	}
};

module.exports = CpuLoad;
