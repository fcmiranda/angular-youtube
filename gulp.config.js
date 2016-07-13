module.exports = function () {
    var client = './src/client/';
    var clientApp = client + 'app/';
    var temp = './.tmp/';
    var root = './';
    var server = './src/server/';
    var sass = './src/scss/**/*.scss';

    var config = {
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        build: './build/', // a pasta build está também definida no src/server/app.js linha:42
        client: client,
        css: temp + 'style.css',
        fonts: ['./bower_components/font-awesome/fonts/**/*.*', client + 'fonts/**/*.*'],
        images: client + 'images/**/*.*',
        htmlTemplates: clientApp + '**/*.html',

        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js'
        ],
        sass: sass,
        server: server,
        temp: temp,

        /*arquivos otimizados*/
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },

        root: root,

        packages: [
            './package.json',
            './bower.json'
        ],

        templateCache: {
            file: 'templates-cache-angular.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: 'app/'
            }
        },
        /**
         * Configurações do Bower
         */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
        /**
         * Configurações do server node
         */
        defaultPort: 7203,
        nodeServer: './src/server/app.js',
        /**
         * Blob de exclusão
         */
        exclude: {
            sass: '!' + sass.replace('./', '')
        },
        /**
         * BrowserSync
         */
        browserReloadDelay: 1000
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};
