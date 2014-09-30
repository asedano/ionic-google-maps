(function() {
  'use strict';

  angular
      .module('Gasolineo')
      .factory('gaDistancias', function() {
        var distancias = [5, 10, 25, 50, 100];

        return distancias.map(function(distancia) {
          return {
            nombre: distancia + 'Km',
            valor: distancia
          };
        });
      });
}());
