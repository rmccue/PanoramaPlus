var Panorama = require("panorama");
var ToolbarWidget = require("toolbarwidget").ToolbarWidget;
var data = require("sdk/self").data;

var PanoramaPlus = {};

PanoramaPlus.titleWidget = ToolbarWidget({
	toolbarID: "TabsToolbar",
	id: "panoramaplus-title",
	label: "Tab Group Name",
	contentURL: data.url("widget.html"),
	contentScriptFile: data.url("widget.js"),
	width: 52
});
PanoramaPlus.titleWidget.port.on('resize', function (data) {
	PanoramaPlus.titleWidget.width = data.width;
});

PanoramaPlus.updateWidget = function () {
	var group = Panorama.getCurrentGroup();

	var content = "Unnamed";
	if ( group && group.title ) {
		content = group.title;
	}

	PanoramaPlus.titleWidget.port.emit('change', {
		content: content
	});
};

exports.main = function (options, callbacks) {
	console.log('main');
	PanoramaPlus.updateWidget();

	Panorama.on('init', function () {
		console.log('init');
		PanoramaPlus.updateWidget()
	});
	Panorama.on('change', function () {
		console.log('change');
		PanoramaPlus.updateWidget();
	});
};
exports.onUnload = function (reason) {
	Panorama.removeListener('change', PanoramaPlus.updateWidget);
};
