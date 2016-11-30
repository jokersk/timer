
(function($){
	
	var LetterCycler = function(options){
		this._index = 0;
		this._str1 = "";
		this._str2 = "";
		this._message = "";
		this._currentText = "";
		this._element = options.element;
		this._timer;
		this.onComplete;
		this.onUpdate;
		this.frame;
		
		var settings = {
			"message" : "",
			"frame" : 1000/25
		}
		
		if(options){
			$.extend(settings,options);	
		}
		if(!settings.message || settings.message == ""){
			this._message = this._element.attr("message");
		}else{
			this._message = settings.message;
		}
		
		this.frame = settings.frame;
		
		
		this.init = function(){
			if(!this._message || this._message == ""){
				return;	
			}
			
			this._timer = new Timer(this.timerEvent,1000/this.frame,this._message.length + 1,this);
			this._timer.start();
		}
		
		this.timerEvent = function(self){
			var index = self._timer.runIndex - 1;
			self._str1 = "";
			self._str2 = self._message.substr(0,index);
			self._str3 = self._message.substr(index);
			var len = self._str3.length;
			for(var i = 0 ;i < len ;i++){
				self._str1 += String.fromCharCode(self.randRange(48,122));	
			}
			var _currentText = self._str2 + self._str1;
			self._element.html(_currentText);
		}
		
		this.destory = function(){
			this._index = null;
			this._str1 = null;
			this._str2 = null;
			this._message = null;
			this._currentText = null;
			this._element = null;
			this.onComplete = null;
			this.onUpdate = null;
			this._timer.destory();	
		}
		
		this.randRange = function(_min,_max){
			return Math.floor(Math.random() * (_max - _min +1)) + _min;	
		}
	}
	
	$.fn.LetterCycler = function(options){
		
		return this.each(function()
	       {
			   options.element = $(this);
	           var _letterCycler = new LetterCycler(options);
			   $(this).data("cycler",_letterCycler);
			   _letterCycler.init();
	       });
	}
})(jQuery);


