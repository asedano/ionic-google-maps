/*global angular, cordova */
(function() {
  'use strict';

  angular
      .module('Gasolineo.Usuario', ['Gasolineo'])
      .factory('gaUsuario', function($rootScope, $http, Usuario) {
        var usuario = new Usuario();

        if (usuario._id === null && usuario.apiKey !== null) {
          // Si ya dio permiso para las notificaciones pero todavía no se ha
          // podido registrar en el sistema, volvemos a intentarlo
          usuario.guardar();
        } else {
          // Si todavía no dio permiso, esperamos a que nos avisen cuando
          // lo haga
          $rootScope.$on('push:registrado', function(evento, apiKey) {
            usuario.apiKey = apiKey;
            usuario.guardar();
          });
        }

        return usuario;
      })
      .factory('Usuario', function($http, $q) {
        var Usuario = function(datos) {
          if (typeof datos === 'undefined') {
            datos = cargaDatos();
          }

          for (var clave in datos) {
            if (datos.hasOwnProperty(clave)) {
              this[clave] = datos[clave];
            }
          }
        };

        Usuario.prototype.guardar = function() {
          var deferred = $q.defer();

          this.sistema = document.body.classList.contains('platform-android') ?
              'Android' : 'iOS';

          localStorage.setItem('usuario', JSON.stringify(this));
          deferred.resolve();

          return deferred.promise;
        };

        return Usuario;

        function cargaDatos() {
          var datos = localStorage.getItem('usuario');

          if (datos) {
            return JSON.parse(datos);
          } else {
            return {
              _id: null,
              apiKey: null,
              favoritos: [],
              combustible: '5419a5604e83aa5c8c83bfbc',
              deposito: 50,
              radio: 25,
              consumo: 6,
              notificarSiSube: false,
              notificarSiBaja: false
            };
          }
        }
      });
}());
