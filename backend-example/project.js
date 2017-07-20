(function () {
    'use strict';

    angular.module('deepLinkingProject', ['ngRoute', 'firebase'])
        .value('fbURL', 'https://ng-projects-list.firebaseio.com/')
        .service('fbRef', function (fbURL) {
            return new Firebase(fbURL)
        })
        .service('fbAuth', function ($q, $firebase, $firebaseAuth, fbRef) {
            var auth,
                authObject,
                deferred;
            
            return function () {
                if (auth) {
                    return $q.when(auth);
                }
                
                authObject = $firebaseAuth(fbRef);
                if (authObject.$getAuth()) {
                    return $q.when(auth = authObject.$getAuth());
                }

                deferred = $q.defer();
                authObject.$authAnonymously().then(function (authData) {
                    auth = authData;
                    deferred.resolve(authData);
                });
                return deferred.promise;
            }
        })
        .service('Projects', function ($q, $firebase, fbRef, fbAuth, projectListValue) {
            var self = this;

            this.fetch = function () {
                if (this.projects) {
                    return $q.when(this.projects);
                }

                return fbAuth().then(function (auth) {
                    var deferred = $q.defer(),
                        ref = fbRef.child('projects-fresh/' + auth.auth.uid),
                        $projects = $firebase(ref);

                    ref.on('value', function (snapshot) {
                        if (snapshot.val() == null) {
                            $projects.$set(projectListValue);
                        }

                        self.projects = $projects.$asArray();
                        deferred.resolve(self.projects);
                    });

                    // Remove the projects list when it is no longer needed
                    ref.onDisconnect().remove();
                    return deferred.promise;
                });
            };
        })
        .config(function ($routeProvider) {
            var resolveProjects = {
                projects: function (Projects) {
                    return Projects.fetch();
                }
            };

            $routeProvider
                .when('/', {
                    controller: 'ProjectListController as projectList',
                    templateUrl: 'list.html',
                    resolve: resolveProjects
                })
                .when('/edit/:projectId', {
                    controller: 'EditProjectController as editProject',
                    templateUrl: 'detail.html',
                    resolve: resolveProjects
                })
                .when('/new', {
                    controller: 'NewProjectController as editProject',
                    templateUrl: 'detail.html',
                    resolve: resolveProjects
                })
                .otherwise({
                    redirectTo: '/'
                });
        })

        .controller('ProjectListController', function (projects) {
            var projectList = this;
            projectList.projects = projects;
        })
        .controller('NewProjectController', function ($location, projects) {
            var editProject = this;
            editProject.save = function () {
                projects.$add(editProject.project).then(function (data) {
                    $location.path('/');
                });
            };
        })
        .controller('EditProjectController', function ($location, $routeParameters, projects) {
            var editProject = this,
                projectId = $routeParameters.projectId,
                projectIndex;
            
            editProject.projects = projects;
            projectIndex = editProject.projects.$indexFor(projectId);
            editProject.project = editProject.projects[projectIndex];

            editProject.destroy = function () {
                editProject.projects.$remove(editProject.project).then(function (data) {
                    $location.path('/');
                });
            };

            editProject.save = function () {
                editProject.projects.$save(editProject.project).then(function (data) {
                    $location.path('/');
                });
            };
        });
}());