/*global angular */
(function() {
  'use strict';

  angular
      .module('Gasolineo.distancias', [])
      .provider('gaDistancia', function() {
        function radianes(grado) {
          return grado * Math.PI / 180;
        }

        var precision = 1000;

        this.setPrecision = function(p) {
          precision = Math.pow(10, p);
        };

        function calcular(a, b) {
          if (!_.isArray(a) || !_.isArray(b)) {
            throw new Error('Los parámetros deben ser arrays');
          }
          if (a.length !== 2 || b.length !== 2) {
            throw new Error('Los arrays deben tener dos valores');
          }

          var R = 6371,
              radianes1 = Math.cos(radianes(a[0])),
              radianes2 = Math.cos(radianes(b[0])),
              deltaLatitud = Math.sin(radianes(b[1] - a[1]) / 2),
              deltaLongitud = Math.sin(radianes(b[0] - a[0]) / 2),
              A = deltaLatitud * deltaLatitud +
                  radianes1 * radianes2 *
                  deltaLongitud * deltaLongitud,
              C = 2 * Math.atan2(Math.sqrt(A), Math.sqrt(1 - A)),
              distancia = R * C;

          return Math.round(distancia * precision) / precision;
        }

        this.$get = function() {
          return calcular;
        };

        return this;
      });
}());
