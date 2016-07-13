var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var config = require('./gulp.config.js')();
var browserSync = require('browser-sync');
var debug = require('gulp-debug');
var port = process.env.PORT || config.defaultPort;

var $ = require('gulp-load-plugins')({lazy: true});
//modulo carregador, não é necessário importar (require) e
// colocar nas variáveis apenas salvar nas dependencias do package.json

gulp.task('vet', function () {
    log('Analizando o código fonte do projeto com jshint...');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('fonts', function () {
    log('Copiando as fontes...');
    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', function () {
    log('Copiando e comprimindo imagens...');

    return gulp
        .src('./src/client/images/**/*.*')
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'));
});


gulp.task('styles-sass', ['clean-styles'], function () {
    log('Compilando SASS em CSS...');

    return gulp
        .src(config.sass)
        .pipe($.print())
        .pipe($.plumber())
        .pipe($.sass().on('error', errorLogger))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(config.temp))
        .pipe(gulp.dest(config.client + 'css/'));
});

gulp.task('clean-code', function () {
    log('Limpando arquivos...');

    var files = [
        config.temp + "**/*.js",
        config.temp + "**/*.css",
        config.build + "**/*/*.html",
        config.build + "js/**/*.js",
        config.client + 'css/'
    ];

    return clean(files);
});

gulp.task('templatecache', ['clean-code'], function () {
    log('Criando Angular template');

    gulp.src(config.htmlTemplates)
        .pipe($.minifyHtml({empty: true}))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
        ))
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function () {
    var files = [config.temp + '**/*.css', config.client + 'css/'];
    clean(files);
});

gulp.task('wiredep', function () {
    log('Injetando bower css/js e o nossos app/js no index.html');

    var wiredep = require('wiredep').stream; //A propriedade stream é chamada para retornar o stream e usá-lo no pipe.
    var options = config.getWiredepDefaultOptions();

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))  //Utiliza o gulp-inject para injetar as dependencias customizadas
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles-sass', 'templatecache'], function () {
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))  //Utiliza o gulp-inject para injetar os css compilado
        .pipe(gulp.dest(config.client));
});

gulp.task('optimize', ['inject', 'fonts', 'images'], function () {
    log('Otimizando JS, HTML e CSS');

    var useref = require('gulp-useref');
    var filter = require('gulp-filter');
    var csso = require('gulp-csso');
    var uglify = require('gulp-uglify');
    var rev = require('gulp-rev');
    var revReplace = require('gulp-rev-replace');

    var templateCache = config.temp + config.templateCache.file;

    var jsLibFilter = filter("**/lib.js", {restore: true});
    var jsAppFilter = filter("**/app.js", {restore: true});
    var cssFilter = filter("**/*.css", {restore: true});
    var indexHtmlFilter = filter(['**/*', '!**/index.html'], {restore: true});

    console.log('PATH::::::',templateCache);

    return gulp
        .src(config.index)
        //usado para evitar erros de pipe no gulp
        .pipe($.plumber())
        //injeta os templates cache no template.js e o referencia no index.html
        .pipe($.inject(
            gulp.src(templateCache, {
                read: true
            }), {
                starttag: '<!-- inject:templates:js -->'
            }))
        //pega as referencias da index e concatena os arquivos especificados
        .pipe(useref({searchPath: './'}))

        .pipe(jsLibFilter) //Filtra js de bibliotecas
        .pipe(uglify()) // minifica js
        .pipe(jsLibFilter.restore)

        .pipe(jsAppFilter) //Filtra js de app
        .pipe($.ngAnnotate())
        .pipe(uglify()) //minifica js
        .pipe(jsAppFilter.restore)

        .pipe(cssFilter)
        .pipe(csso()) // Minify any CSS sources
        .pipe(cssFilter.restore)

        .pipe(indexHtmlFilter)
        .pipe(rev()) // Renomeia arquivos concatenados (exceto index.html)
        .pipe(indexHtmlFilter.restore)
        .pipe(revReplace())  // substitui novos nomes de arquivo
        .pipe(gulp.dest(config.build))
        .pipe(rev.manifest())
        .pipe(gulp.dest(config.build));
});

gulp.task('bump', function () {
    msg = 'Bumping versões';

    var type = args.type;
    var version = args.version;
    var options = {};

    if (version) {
        options.version = version;
        msg += 'to' + version;
    } else {
        options.type = type;
        msg += 'for a' + type;
    }
    log(msg);

    return gulp
        .src(config.packages)
        .pipe($.bump(options))
        .pipe($.print())
        .pipe(gulp.dest(config.root));
});

gulp.task('serv-build', ['optimize'], function () {
    serve(false);
});

gulp.task('serv-dev', ['inject'], function () {
    serve(true) /*is Dev*/;
});

function serve(isDev) {

    var nodemonOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            PORT: port,
            NODE_ENV: isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    console.log(nodemonOptions.env.NODE_ENV);

    return $.nodemon(nodemonOptions)
        .on('restart', function (ev) {
            log('* -Arquivos alterados no restart:\n' + ev);
            setTimeout(function () {
                browserSync.notify('Reiniciando browserSync...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function () {
            log('*** Nodemon iniciado ***');
            startBrowserSync();
        })
        .on('crash', function () {
            log('*** Nodemon derrubado ***');
        })
        .on('exit', function () {
            log('*** Nodemon disconectado corretamente ***');
        });
}

gulp.task('help', $.taskListing);
gulp.task('default', ['help']);

////////////

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ', event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync() {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Iniciando BrowserSync na porta:' + port);

    gulp.watch([config.sass], ['styles-sass'])
        .on('change', function (event) {
            changeEvent(event);
        });

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        open: true,
        files: [
            config.client + '**/*.*',
            config.exclude.sass,
            config.temp + '**.*.css'
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gul-patterns',
        notify: true,
        reloadDelay: 0
    };

    browserSync(options);
}

function errorLogger(error) {
    log('***');
    log(error);
    log('***');
    this.emit('end');
}

function clean(path) {
    log('Limpando:' + $.util.colors.blue(path));
    del(path);
}

function log(msg) {
    $.util.log($.util.colors.blue(msg));
}
