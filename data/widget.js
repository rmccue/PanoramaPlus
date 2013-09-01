self.port.on('change', function (data) {
	var container = document.getElementById("text");
	container.innerHTML = data.content;
	self.port.emit("resize", {
		"width": container.offsetWidth || 5
	});
});