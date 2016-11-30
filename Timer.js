/*
 * Jade Huang. <heaven_0421@live.cn>
 * The MIT License
 * --------
 * Copyright (c) 2012 Jade Huang.
 * Last Modify Date - Oct.30 2012  
 *
 *
 * Timer class created for the convenient of the use of your want do something repeat. generally can be used in a animation.
 * generaly it's same with the timer you use in actionscript(if you have experience on as3). Timer class provice some function to init a timer *  to run a function rountinely as specific delay and repeatTimes.As some unknown reason, "this" property's not accessibile in loop function 
 * passed into timer, so you need to point the obj you want to use into refObj parameter
 *
 * @parameter fun : function want to be run
 * @parameter delay :  function want to be run in a delay time
 * @parameter repeatTimes : times that function want to be repease, -1 repesent run forever
 * @parameter refObj : parameter you want to use in your function.
 * @parameter onComplete : the function that want to be display when timer complte;
 */

var Timer = function(fun,delay,repeatTimes,refObj,onComplete){
	this.repeatTimes = repeatTimes;
	this.fun = fun;
	this.delay = delay;
	this.intervalID;
	this.runIndex = 0;
	this.self = this;
	this.refObj = refObj;
	this.onComplete = onComplete;
	
	this.start = function(){
		this.intervalID = setInterval((function(self) {
			return function() {self.loop(); } } )(this),
		   this.delay); 		
	}
	
	this.pause = function(){
		if(this.intervalID){
			clearInterval(this.intervalID);
		}	
	}
	
	
	this.resume = function(){
		this.intervalID = setInterval((function(self) {
			return function() {self.loop(); } } )(this),
		   this.delay);
	}
	
	
	this.loop = function(){
		var self = this
		self.runIndex ++;
		fun.apply(null,[self.refObj]);
		if(self.runIndex >= self.repeatTimes && self.repeatTimes > 0){
			clearInterval(self.intervalID);
			self.destory();
			if(self.onComplete){
				self.onComplete.apply(null);
			}	
		}
	}
	
	
	
	this.destory = function(){
		if(this.intervalID){
			clearInterval(this.intervalID);	
		}
		this.repeatTimes = null;
		this.fun = null;
		this.delay = null;
		this.intervalID = null;
		this.runIndex = null;
		this.self = null;
	}
}
