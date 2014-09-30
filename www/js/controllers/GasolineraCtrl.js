/*global angular, moment, _ */
(function() {
  'use strict';

  angular
      .module('Gasolineo')
      .controller('GasolineraCtrl', function($scope, $stateParams, $q,
          $timeout, gaGasolineras, gaCombustibles, gaUsuario,
          gasolinera) {

        $scope.gasolinera = gasolinera;
        $scope.combustibleActivo = gaUsuario.combustible;

        $q
            .all([gaCombustibles.todos().$promise,
              gasolinera.$promise,
              gaGasolineras.ultimasMedidas($stateParams.id).$promise])
            .then(function(resultados) {
              $scope.medidas = resultados[2];

              $scope.combustibles = _.filter(resultados[0], function(c) {
                return $scope.gasolinera.Precios[c.Nombre] &&
                    $scope.gasolinera.Precios[c.Nombre].length > 0;
              });

              actualizaGrafica();

              actualizaEnlaceAlMapa();
            });

        function actualizaEnlaceAlMapa() {
          var lng = $scope.gasolinera.Posicion[0],
              lat = $scope.gasolinera.Posicion[1];

          if (angular.element(document.body).hasClass('platform-android')) {
            $scope.urlMapa = 'geo:' + lat + ',' + lng;
          } else {
            $scope.urlMapa = 'maps://maps.apple.com/?q=' + lat + ',' + lng;
          }
        }

        function actualizaGrafica() {
          var medidas = _.filter($scope.medidas, function(medida) {
            return medida.Combustible == $scope.combustibleActivo;
          }).reverse();
          $scope.datosGrafica = _.map(medidas, function(lect) {
            var fecha =
                moment.utc(lect.Fecha, 'YYYY-MM-DDTHH:mm:ss')
                    .add(2, 'hours');

            return [
              Date.UTC(fecha.year(), fecha.month(), fecha.date()),
              Math.round(lect.Precio * 1000) / 1000
            ];
          });
        }

        $scope.abreMapa = function() {
          var maps = window.plugin.google.maps,
              map = maps.Map.getMap(),
              posicion = new maps.LatLng($scope.gasolinera.Posicion[1],
              $scope.gasolinera.Posicion[0]);

          map.addEventListener(maps.event.MAP_READY, function() {
            $timeout(function() {
              map.addMarker({
                title: $scope.gasolinera.Nombre,
                position: posicion
              }, function(marker) {
                marker.setIcon({
                  url: 'www/img/logos/' +
                      $scope.gasolinera.Rotulo.toLowerCase() + '.png',
                  size: {
                    width: 40,
                    height: 40
                  }
                });
              });

              map.addMarker({
                title: $scope.gasolinera.Nombre,
                position: new maps.LatLng(gasolinera.Posicion[1] - 0.00005,
                    $scope.gasolinera.Posicion[0] + 0.00005)
              });

              map.setCenter(posicion);
              map.setZoom(17);
              map.showDialog();

              map.addEventListener(maps.event.MAP_CLOSE, function() {
                map.remove();
                map = null;
              });
            });
          });
        };
      });
}());
