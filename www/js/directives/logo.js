/*global angular */
(function() {
  'use strict';

  angular
      .module('Gasolineo')
      .directive('gaLogo', function() {
        return {
          restrict: 'E',
          template: '<img ng-src="{{ruta}}" class="logo">',
          scope: {
            gasolinera: '='
          },
          replace: true,
          link: function(scope) {
            var centinela = scope.$watch('gasolinera._id', function(valor) {
              if (typeof valor === 'undefined') {
                return;
              }
              var rotulo = scope.gasolinera.Rotulo.toLowerCase();
              scope.ruta = 'img/logos/' + rotulo + '.png';

              centinela();
            });
          }
        };
      });
}());
