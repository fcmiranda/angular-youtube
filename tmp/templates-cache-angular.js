angular.module('app.core').run(['$templateCache', function($templateCache) {$templateCache.put('app/core/404.html','<div>teste</div>');
$templateCache.put('app/components/video-mini/vy-video-mini.directive.html','<div layout=row layout-align="start stretch" layout-margin class=video><div flex><img class=video-mini ng-src={{vm.url}}></div><div flex layout=column layout-align="space-between stretch"><div flex=100><md-text-float class="md-title flex md-primary">{{ vm.video.snippet.title | limitTo: 40 }}{{vm.video.snippet.title.length > 40 ? \'...\' : \'\'}}</md-text-float></div><div flex=100 layout=row layout-align="start end"><div flex layout=row layout-align="start center"><div><md-icon aria-label=Views class=material-icons>visibility</md-icon></div><div flex=80 flex-offset=5 class=md-caption><span ng-bind="vm.video.statistics.viewCount | thousandSuffix"></span> views</div></div></div></div></div>');
$templateCache.put('app/components/video/vy-video.directive.html','<iframe ng-if=vm.video.id width={{vm.width}} height={{vm.height}} src={{vm.src}} frameborder=0 allowfullscreen></iframe>');
$templateCache.put('app/video/dialog/video-dialog.html','<md-dialog aria-label="Mango (Fruit)"><form><md-toolbar><div class=md-toolbar-tools><span flex class=flex></span><md-button class=md-icon-button aria-label=close ng-click=cancel()><md-icon aria-label=close class=material-icons>close</md-icon></md-button></div></md-toolbar><md-dialog-content class=content layout=row layout-align="center start"><div flex=80 class=margin-top-10><div class=video-container><vy-video ng-if=!!vm.currentVideo.id video=vm.currentVideo></vy-video></div><div layout-gt-sm=row layout-align-gt-sm="start start" layout=column layout-align="start start" class=margin-top-10><md-card-title flex-gt-sm=70 flex=80><md-card-title-text><span class=md-title ng-bind=vm.currentVideo.snippet.title></span></md-card-title-text></md-card-title><md-card-actions flex-gt-sm=30 flex=10><div layout=row layout-align="start start"><md-card-icon-actions class=flex-end><md-button class=md-icon-button aria-label=Views><md-icon aria-label=Views class=material-icons><md-tooltip md-direction=top><span ng-bind=vm.currentVideo.statistics.viewCount></span> views</md-tooltip>visibility</md-icon></md-button><md-button class=md-icon-button aria-label=publishedAt><md-icon aria-label=publishedAt class=material-icons><md-tooltip md-direction=top><span>{{vm.currentVideo.snippet.publishedAt | date:"longDate" }}</span></md-tooltip>query_builder</md-icon></md-button></md-card-icon-actions></div></md-card-actions></div><md-card-content><p ng-bind=vm.currentVideo.snippet.description></p></md-card-content></div></md-dialog-content></form></md-dialog>');
$templateCache.put('app/video/featured/featured.html','<div flex=60 flex-sm=100 flex-xs=100><h2 class=md-display-1>V\xEDdeo em destaque</h2><div class=video-container><vy-video ng-if=!!vm.currentVideo.id video=vm.currentVideo></vy-video></div><md-card class="margin-0 margin-top-10"><div layout-gt-sm=row layout-align-gt-sm="start start" layout=column layout-align="start start"><md-card-title flex-gt-sm=80 flex=80><md-card-title-text><span class=md-headline ng-bind=vm.currentVideo.snippet.title></span></md-card-title-text></md-card-title><md-card-actions flex-gt-sm=10 flex=10><div layout=row layout-align="start start"><md-card-icon-actions class=flex-end><md-button class=md-icon-button aria-label=Views><md-icon aria-label=Views class=material-icons><md-tooltip md-direction=top><span ng-bind=vm.currentVideo.statistics.viewCount></span> views</md-tooltip>visibility</md-icon></md-button><md-button class=md-icon-button aria-label=publishedAt><md-icon aria-label=publishedAt class=material-icons><md-tooltip md-direction=top><span>{{vm.currentVideo.snippet.publishedAt | date:"longDate" }}</span></md-tooltip>query_builder</md-icon></md-button></md-card-icon-actions></div></md-card-actions></div><md-card-content><p ng-bind=vm.currentVideo.snippet.description></p></md-card-content></md-card></div><div flex=40 flex-sm=100 flex-xs=100><h2 class=md-display-1>+ V\xEDdeos</h2><md-card class=video-card><md-content><vy-video-mini ng-if=vm.videos ng-repeat="video in vm.videos" video=video ng-click=vm.play(video)></vy-video-mini></md-content><div flex layout=column layout-align="none stretch" ng-if="vm.pageToken && !vm.loading"><md-button class=simple ng-click=vm.loadFullVideo()>Carregar mais v\xEDdeos...</md-button></div><div flex layout=column layout-align="center center" ng-if=vm.loading><md-progress-circular md-diameter=40 md-mode=indeterminate></md-progress-circular></div></md-card></div>');
$templateCache.put('app/video/list/videos-list.html','<div flex><h2 class=md-display-1 ng-if=!vm.searchValue>Todos v\xEDdeos do canal</h2><h2 class=md-display-1 ng-if="!!vm.searchValue && vm.videos.length > 0">Resultados encontrados para: <span>"{{vm.searchValue}}"</span></h2><h2 class=md-display-1 ng-if="!vm.loading && !!vm.searchValue && vm.videos.length == 0">Nenhum resultado encontrado para: <span>"{{vm.searchValue}}"</span></h2><md-card><div flex layout=row layout-wrap layout-xs=column layout-sm=row layout-align="center start"><div flex=33 flex-xs=100 flex-sm=50 ng-repeat="video in vm.videos"><vy-video-mini ng-if=vm.videos video=video ng-click="vm.playOnDialog(video, $event)"></vy-video-mini></div></div><div flex layout=column layout-align="none stretch" ng-if="vm.pageToken && !vm.loading"><md-button class=simple ng-click=vm.loadFullVideo()>Carregar mais v\xEDdeos...</md-button></div><div flex layout=row layout-align="center center" ng-if=vm.loading><md-progress-circular md-diameter=40 md-mode=indeterminate></md-progress-circular></div></md-card></div>');}]);