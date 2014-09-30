/*global angular, moment, $ */
(function() {
  'use strict';

  angular
      .module('Gasolineo')
      .directive('grafica', function($compile, $timeout) {
        return {
          restrict: 'E',
          scope: {
            datos: '=',
            titulo: '@',
            tituloX: '@',
            tituloY: '@'
          },
          replace: true,
          template: '<div class="contenedor-grafica"></div>',
          compile: function() {
            return function link(scope, element) {
              var centinela = scope.$watch('datos', function(datos) {
                if (typeof datos === 'undefined') {
                  return;
                }

                var ancho = element[0].offsetWidth;
                var alto = element[0].offsetHeight;

                var $template = $compile('<canvas id="grafica" tc-chartjs chart-type="line" chart-data="numeritos" chart-options="configuracion" width="' + ancho + '" height="' + alto + '"></canvas>');

                scope.configuracion = {
                  animation: false,
                  showTooltips: false
                };

                scope.numeritos = {
                  labels: _.map(scope.datos, function(dato) {
                    return moment(dato[0]).format('DD/MM');
                  }),
                  datasets: [{
                    label: scope.tituloX,
                    fillColor: 'rgba(76, 189, 176, 0.8)',
                    bezierCurve: false,
                    pointDotRadius: 2,
                    data: _.map(scope.datos, function(dato) {
                      return dato[1];
                    })
                  }]
                };

                var elemento = $template(scope);
                element.append(elemento);
                $timeout(function() {
                  var imagen = element.find('canvas')[0].toDataURL();
                  element.html('<img id="grafica" src="' + imagen + '">');
                }, 100);

                centinela();
              });
            };
          }
        };
      });
}());
