var webpack = require('webpack');
var yargs = require('yargs');
var args = yargs.alias('p', 'production').argv;
var ExtractTextPlugin = require("extract-text-webpack-plugin"); // extracts module content as text, does not wrap it as javascript function - used for css files
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({minimize: true});
var dedupePlugin = new webpack.optimize.DedupePlugin();
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin("commons.js"); //creates common javascript and css for parts which are same for all entrypoints
var extractTextPlugin = new ExtractTextPlugin('[name].css', {allChunks: true}); // extract required css files and put them into dist folder.
var labeledModulesPlugin =  new webpack.dependencies.LabeledModulesPlugin();
var cleanPlugin = require('clean-webpack-plugin');
var ignorePlugin = new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);

var fs = require('fs');


var plugins = [new cleanPlugin(['dist']), ignorePlugin, commonsPlugin, extractTextPlugin, labeledModulesPlugin, dedupePlugin];
console.log(args);
if (args.production) {
    plugins.push(uglifyPlugin);
}

var createEntryPoints = function (dirs) {
    var entries = {};
    for (var i = 0; i < dirs.length; i++) {
        fs.readdirSync(dirs[i]).forEach(function (file) {
            var fName = file.substring(0, file.lastIndexOf('.'));
            entries[fName.toLowerCase()] = dirs[i] + '/' + file;
        });
    }

    return entries;
};
//./src/main/webapp/WEB-INF/initializers','./src/main/webapp/WEB-INF/renderers
module.exports = {
    entry: createEntryPoints(['./src/main/webapp/WEB-INF/views']), // function that creates entrypoints object like index : '.../index.jsx' from files found in provided folder
    //target:"node",
    module: {
        loaders: [ // each filetype can be processed using diferent file loader
            {test: /\.jsx$/, loader: 'jsx-loader'}, // convert JSX files into Js files
            {test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader')}, // extrats css files from require(..) directives
            {test: /\.((svg)|(woff)|(woff)|(ttf)|(eot))$/, loader: 'file-loader', query: {name: '[name]\.[ext]'}} // extracts fonts from css files and adds them to distribution folder
        ]
    },
    resolve: {
        modulesDirectories: ["node_modules", "components"] // explicitly define where to look for node modules (if not defined webpack uses some defaults)
    },
    output: {
        path: "./src/main/webapp/dist", // where to put files after processing
        filename: "[name].js" // how to name javascript files
    },
    plugins: plugins
};

