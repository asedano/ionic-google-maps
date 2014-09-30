/*global angular */
(function() {
  'use strict';

  angular
      .module('Gasolineo')
      .directive('variacion', function($rootScope, $filter) {
        return {
          restrict: 'A',
          scope: {
            actual: '=',
            anterior: '=',
            vacio: '@'
          },
          template: '<span bindonce="variacion" bo-class="{sube: positivo, baja: negativo}" alt="" bo-bind="variacion"></span>',
          compile: function() {
            var filtro = $filter('variacion');

            return function(scope) {
              if (scope.vacio !== 'true') {
                scope.vacio = 'N/D';
              } else {
                scope.vacio = '';
              }

              var centinelas = [
                scope.$watch('actual', actualiza),
                scope.$watch('anterior', actualiza)
              ];

              function actualiza() {
                var variacion = filtro(scope.actual, scope.anterior);
                scope.positivo = variacion > 0;
                scope.negativo = variacion < 0;

                if (isNaN(variacion)) {
                  scope.variacion = scope.vacio;
                } else {
                  scope.variacion = variacion + '%';
                }
              }
            };
          }
        };
      });
}());
