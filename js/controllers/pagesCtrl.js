
PagesApp.controller("peopleCtrl", function($scope, $http) {
    window.scrollTo(0, 0);


    $http.get("https://cdn.contentful.com/spaces/tejt7nclu2w1/assets?access_token=92b1345622db74d4f4350cabde8df194adb4fb877a32871ac2f65cdc453886bb")
        .then(function(response) {
            console.log(response.data.items);

            $scope.assets = response.data.items;
            $http.get("https://cdn.contentful.com/spaces/tejt7nclu2w1/entries?access_token=92b1345622db74d4f4350cabde8df194adb4fb877a32871ac2f65cdc453886bb&content_type=student&order")
                .then(function(response) {
                    console.log(response.data.items);
                    $scope.people={
                        PhD: [],
                        MSc: [],
                        BSc: [],
                        alumni: []
                    };
                    response.data.items.forEach(function(item, index){
                        var thisesExist = false;
                        var imgSrcId=item.fields.img.sys.id;
                        if(item.fields.thesisFile)
                        {
                            thisesExist = true;
                            var thisesId = item.fields.thesisFile.sys.id;
                        }
                        var person=item.fields;
                        $scope.assets.forEach(function(it,i){
                            if (imgSrcId==it.sys.id){
                                person["img"]="http:"+it.fields.file.url;
                            }
                            if(thisesExist && thisesId ==it.sys.id){
                                person["thesis"]="http:"+it.fields.file.url;
                            }
                        })

                        if (person.student=="PhD"){
                            $scope.people.PhD.push(person)

                        }
                        if (person.student=="MSc"){
                            $scope.people.MSc.push(person)

                        }
                        if (person.student=="BSc"){
                            $scope.people.BSc.push(person)

                        }
                        if (person.student=="alumni"){
                            $scope.people.alumni.push(person)

                        }
                    })
                });

        });



    $scope.setAbout = function (firstName,lastName,data) {
        $scope.dialogFirstName = firstName;
        $scope.dialogLastName = lastName;
        $scope.dialoglongAbout = data;
        };

});

PagesApp.controller("projectsCtrl", function($scope, $http) {
    window.scrollTo(0, 0);
    $scope.projects=[]
    $http.get("https://cdn.contentful.com/spaces/tejt7nclu2w1/entries?access_token=92b1345622db74d4f4350cabde8df194adb4fb877a32871ac2f65cdc453886bb&limit=200&content_type=project&order")
        .then(function(responseProjects) {

                $http.get("https://cdn.contentful.com/spaces/tejt7nclu2w1/entries?access_token=92b1345622db74d4f4350cabde8df194adb4fb877a32871ac2f65cdc453886bb&limit=200&content_type=publication&order")
                    .then(function(responsePublications) {

                        $http.get("https://cdn.contentful.com/spaces/tejt7nclu2w1/assets?access_token=92b1345622db74d4f4350cabde8df194adb4fb877a32871ac2f65cdc453886bb")
                            .then(function(responseAssets) {
                                console.log(responseProjects.data.items);
                                console.log(responsePublications.data.items);
                                console.log(responseAssets.data.items);


                                responseProjects.data.items.forEach(function(item, index) {
                                    console.log(item.fields);
                                    var project = item.fields;
                                    if (item.fields.image) {
                                        var imgSrcId = item.fields.image.sys.id;
                                    }
                                    if (item.fields.papers) {
                                        var papers = item.fields.papers;
                                    }
                                    if (item.fields.publications)
                                    {
                                        var publications = item.fields.publications;
                                    }
                                    if(imgSrcId || papers)
                                    {
                                        project["papersDisplay"] =[];
                                        responseAssets.data.items.forEach(function(it,i){
                                            if (imgSrcId &&imgSrcId==it.sys.id){
                                                project["image"]="http:"+it.fields.file.url;
                                            }
                                            if(papers){
                                                papers.forEach(function(p,i) {
                                                if(p.sys.id == it.sys.id)
                                                {
                                                    var paperObj={
                                                        link: "http:"+it.fields.file.url,
                                                        title:it.fields.title
                                                    };
                                                    project["papersDisplay"].push(paperObj);
                                                }
                                                })
                                            }
                                        })
                                    }
                                    if(publications)
                                    {
                                        project["publicationsDisplay"]=[];
                                        responsePublications.data.items.forEach(function(publication,i) {
                                            publications.forEach(function(p,i) {
                                                if(p.sys.id == publication.sys.id)
                                                {
                                                    project["publicationsDisplay"].push(publication.fields);
                                                }
                                            })
                                        })
                                    }


                                    $scope.projects.push(project)

                                    console.log(project)
                                })

                            });

                    })
          });


        },

        // Error handler
        function(response){
          console.log('Oops, error ' + response.status);
        }
      );

PagesApp.controller("publicationsCtrl", function($scope, $http, filterFilter, $modal, $log) {
    window.scrollTo(0, 0);

     $scope.setBib = function (bibData) {
        $scope.dialogBibtex = bibData;
         };


    $scope.list = [];
    $scope.fliter_year = function(year) {
        if ($scope.search && $scope.search.name.length > 0) {
            $scope.years_filter_list = $scope.filterList
        } else {

            $scope.years_filter_list = $scope.list
        }
        console.log(year)
        if ($("#" + year).hasClass('crossLine')) {
            $("#" + year).removeClass('crossLine')

            var test = filterFilter($scope.years_filter_list, year);
            $scope.filterList = $scope.filterList.concat(test);
            console.log($scope.filterList)

        } else {
            $(".years_filter").addClass('crossLine')

            $scope.filterList = filterFilter($scope.years_filter_list, year);
        }
        $("#" + year).removeClass('crossLine')

        if (year == "All") {
            if ($scope.search && $scope.search.name.length > 0) {
                var term = $scope.search.name
                var obj = {
                    name: term
                };

                $scope.filterList = filterFilter($scope.list, obj);
                obj = {
                    year: term
                };
                var test = filterFilter($scope.list, obj);
                $scope.filterList = $scope.filterList.concat(test);
                obj = {
                    authors: term
                };
                var test = filterFilter($scope.list, obj);
                $scope.filterList = $scope.filterList.concat(test);
                obj = {
                    publish: term
                };
                var test = filterFilter($scope.list, obj);
                $scope.filterList = $scope.filterList.concat(test);
            } else {
                $scope.filterList = $scope.years_filter_list
            }

            $(".years_filter").removeClass('crossLine')
        }

    }

    $scope.init = function() {
        $http.get("https://cdn.contentful.com/spaces/tejt7nclu2w1/entries?access_token=92b1345622db74d4f4350cabde8df194adb4fb877a32871ac2f65cdc453886bb&limit=200&content_type=publication&order")
            .then(function(response) {

                $scope.list = [];
                response.data.items.forEach(function(item, index){
                    $scope.list.push(item.fields)
                });
                $scope.list.sort(function(a,b) {return (a.year > b.year) ? -1 : ((b.year > a.year) ? 1 : (a.type < b.type) ? -1 : (b.type < a.type) ? 1 : 0);} );

                $scope.showModal = false;
                $scope.toggleModal = function(abstract) {
                    $scope.abstract = abstract;
                    $scope.showModal = !$scope.showModal;
                };

                $scope.pageSize = 6;

                $scope.years = new Set()
                angular.forEach($scope.list, function(publication, index) {
                    $scope.years.add(publication.year)
                });

                $scope.years = Array.from($scope.years)
                $scope.filterList = $scope.list;
                $scope.currentPage = 1;


            })
    };

}).filter('start', function() {
    return function(input, start) {
        if (!input || !input.length) {
            return;
        }

        start = +start;
        return input.slice(start);
    };
});

PagesApp.controller("contactCtrl", function($scope, $http) {
    window.scrollTo(0, 0);
});
