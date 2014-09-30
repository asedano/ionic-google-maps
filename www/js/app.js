/*global angular, cordova */
(function() {
  'use strict';

  angular.module('Gasolineo', ['ionic', 'ngSanitize', 'Gasolineo.Usuario',
    'tc.chartjs', 'pasvaz.bindonce'])
      .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
          if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          }
          if (window.StatusBar) {
            StatusBar.styleDefault();
          }
        });
      })

      .config(function($stateProvider, $urlRouterProvider, $compileProvider) {
        $stateProvider
            .state('gasolinera-detalle', {
              url: '/gasolinera/:id/:distancia',
              controller: 'GasolineraCtrl',
              templateUrl: 'templates/gasolinera.html',
              resolve: {
                gasolinera: function($stateParams, gaGasolineras) {
                  return gaGasolineras.porId($stateParams.id);
                }
              }
            });

        $urlRouterProvider.otherwise('/gasolinera/5429619441c04368a3c1d3f2/1220');

        var whiteList = /^\s*(https?|ftp|mailto|tel|file|geo|maps):/;
        $compileProvider.aHrefSanitizationWhitelist(whiteList);
      });
}());
