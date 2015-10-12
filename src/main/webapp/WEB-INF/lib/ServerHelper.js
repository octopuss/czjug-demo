var window = window || {};
window.app = {};
window.app.model = {}; 
window.app.model.data = {}; 
window.app.model.state = {}; 
if (typeof console == "undefined") {
    console = { 
        log: function (arg) {println(arg)}, 
        error: function (arg) {println(arg)} 
    }; 
}