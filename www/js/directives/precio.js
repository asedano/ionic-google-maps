/*global angular */
(function() {
  'use strict';

  angular
      .module('Gasolineo')
      .directive('gaPrecio', function() {
        return {
          restrict: 'E',
          replace: true,
          scope: true,
          template: '<div class="precio {{clase}}">{{gasolinera.Precio | comas}} €</div>',
          link: function(scope) {
            if (scope.gasolinera.Precio < scope.verde) {
              scope.clase = 'precio-verde';
            } else if (scope.gasolinera.Precio > scope.rojo) {
              scope.clase = 'precio-rojo';
            } else {
              scope.clase = 'precio-ambar';
            }
          }
        };
      });
}());
