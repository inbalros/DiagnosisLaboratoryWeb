/**
 * Created by dor on 17/07/2016.
 */

var API_KEY = 'access_token=e3d1f3defe78ec9cedbb5c50563e89f4fee00d093ec4458dbbbeb64679822598'
var URL = 'https://cdn.contentful.com/spaces/07lyy2v445rx/entries?'

var Mainapp=angular.module('mainApp', [ 'ngAnimate','contentful', 'ui.bootstrap','ngSanitize','btford.markdown']);

var PagesApp=angular.module('PagesApp', ['ngRoute','angular.filter', 'contentful', 'ngAnimate','ngSanitize', 'ui.bootstrap',
    'btford.markdown']);

Mainapp.config(function(contentfulProvider){
        contentfulProvider.setOptions({
            space: '07lyy2v445rx',
            accessToken: 'e3d1f3defe78ec9cedbb5c50563e89f4fee00d093ec4458dbbbeb64679822598'
        });
      });

PagesApp.config(function(contentfulProvider){
              contentfulProvider.setOptions({
                  space: '07lyy2v445rx',
                  accessToken: 'e3d1f3defe78ec9cedbb5c50563e89f4fee00d093ec4458dbbbeb64679822598'
              });
            });

PagesApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
        when('/people', {
            templateUrl: 'pages/people.html',
            controller: 'peopleCtrl'
        }).
        when('/publications', {
            templateUrl: 'pages/publications.html',
            controller: 'publicationsCtrl'
        }).
        when('/projects', {
            templateUrl: 'pages/projects.html',
            controller: 'projectsCtrl'
        }).
        when('/contact', {
            templateUrl: 'pages/contact.html',
            controller: 'contactCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
    }]);

    PagesApp.directive('modal', function () {
  return {
  template: '<div class="modal fade">' +
  '<div style="width:90%" class="modal-dialog">' +
    '<div class="modal-content">' +
      '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">Abstract</h4>' +
      '</div>' +
      '<div class="modal-body" ng-transclude>' +
  '</div>' +
    '</div>' +
  '</div>' +
  '</div>',
  restrict: 'E',
  transclude: true,
  replace:true,
  scope:true,
  link: function postLink(scope, element, attrs) {
  scope.title = attrs.title;

  scope.$watch(attrs.visible, function(value){
  if(value == true)
    $(element).modal('show');
  else
    $(element).modal('hide');
  });

  $(element).on('shown.bs.modal', function(){
  scope.$apply(function(){
    scope.$parent[attrs.visible] = true;
  });
  });

  $(element).on('hidden.bs.modal', function(){
  scope.$apply(function(){
    scope.$parent[attrs.visible] = false;
  });
  });
  }
  };
  });
