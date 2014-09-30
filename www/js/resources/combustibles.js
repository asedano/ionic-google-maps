/*global angular */
(function() {
  'use strict';

  angular
      .module('Gasolineo')
      .factory('gaCombustibles', function($q) {
        return {
          todos: function() {
            var retorno = [{
              "_id": "5419a5534e83aa5c8c83bfba",
              "Nombre": "Gasolina 95",
              "Identificador": 1,
              "Orden": 1
            }, {
              "_id": "5419a5584e83aa5c8c83bfbb",
              "Nombre": "Gasolina 98",
              "Identificador": 3,
              "Orden": 2
            }, {
              "_id": "5419a5604e83aa5c8c83bfbc",
              "Nombre": "Diesel",
              "Identificador": 4,
              "Orden": 3
            }, {
              "_id": "5419a5664e83aa5c8c83bfbd",
              "Nombre": "Nuevo diesel",
              "Identificador": 5,
              "Orden": 4
            }, {
              "_id": "5419a56f4e83aa5c8c83bfbe",
              "Nombre": "GLP",
              "Identificador": 17,
              "Orden": 5
            }, {
              "_id": "5419a5774e83aa5c8c83bfbf",
              "Nombre": "Biodiesel",
              "Identificador": 8,
              "Orden": 6
            }, {
              "_id": "5419a57f4e83aa5c8c83bfc0",
              "Nombre": "Bioetanol",
              "Identificador": 16,
              "Orden": 7
            }];

            retorno.$promise = $q.when(retorno);
            return retorno;
          }
        };
      });
}());
