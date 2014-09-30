/*global angular */
(function() {
  'use strict';

  angular
      .module('Gasolineo')
      .factory('gaMapa', function() {
        return function() {
          return window.plugin ? window.plugin.google.maps.Map.getMap() : {};
        };
      });
}());
