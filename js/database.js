var database = function () {
	var data = [];
	var pointer = 0;
	var container = "data"

	this.init = function (data) {
		this.pointer = 0;
		this.data = data;
		console.log(data)
		this.first();
	}
	
	this.add = function (name, email) {
		if (name == "" || email == "") {
			return;
		}
		var lastID = (this.data[this.data.length - 1]['id']) + 1
		this.data.push({ id: lastID, name: name, email: email });
		this.last();
	}

	this.first = function () {
		this.pointer = 0;
		this.print(this.pointer);
	}

	this.previous = function () {
		if (this.pointer > 0) this.pointer--
		this.print(this.pointer);
	}

	this.next = function () {
		if (this.pointer < this.data.length - 1) this.pointer++
		this.print(this.pointer);
	}

	this.last = function () {
		this.pointer = this.data.length -1;
		this.print(this.pointer);
	}

	this.print = function (pointer) {
		var that = this;
		var $t = $("<div></div>");
		$t.append("<b>ID: " + that.data[pointer]['id'] + "</b><br>");
		$t.append("<b>Name: " + that.data[pointer]['name'] + "</b><br>");
		$t.append("<b>E-Mail: " + that.data[pointer]['email'] + "</b><br>");
		$('#' + container).html($t);
	}

	this.save = function(){
		var that = this;
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(that.data)));
		element.setAttribute('download', "datos.json");
		element.style.display = 'none';
		document.body.appendChild(element);
		console.log(element);
		element.click();
		document.body.removeChild(element);
	}
}