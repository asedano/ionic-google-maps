/*global angular */
(function() {
  'use strict';

  angular
      .module('Gasolineo')
      .factory('gaCoste', function() {
        return function(gasolinera, combustible, usuario) {
          var distancia = gasolinera.Distancia / 1000,
              consumo = usuario.consumo,
              deposito = usuario.deposito,
              precioLlegar = (distancia / 100 * consumo),
              precioLlenar = gasolinera.Precio * deposito,
              precioTotal = precioLlegar + precioLlenar;

          return Math.round(precioTotal * 100) / 100;
        };
      });
}());
