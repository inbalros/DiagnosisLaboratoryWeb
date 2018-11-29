
Mainapp.controller('mainCtrl', ['$scope','$http','contentful', function($scope,$http,contentful) {
    window.scrollTo(0, 0);


    $scope.aboutUs="The Anomaly Detection and Diagnosis Laboratory has been established by Dr. Meir Kalech in 2008, and Dr. Roni Stern have been leading the lab together with Dr. Kalech since 2013. In the lab we research various topics related to automated anomaly detection, diagnosis, and troubleshooting. In paricular, we use model-based and data-driven techniques, and study the way they can complement each other. ";

    $http.get("https://cdn.contentful.com/spaces/tejt7nclu2w1/assets?access_token=92b1345622db74d4f4350cabde8df194adb4fb877a32871ac2f65cdc453886bb")
        .then(function(response) {
            console.log(response.data.items);

            $scope.assets = response.data.items;
            $http.get("https://cdn.contentful.com/spaces/tejt7nclu2w1/entries?access_token=92b1345622db74d4f4350cabde8df194adb4fb877a32871ac2f65cdc453886bb&content_type=news&order")
                .then(function(response) {
                    console.log(response.data.items);
                    $scope.allNews=[];

                    response.data.items.forEach(function(item, index){
                        var imgSrcId=item.fields.img.sys.id;
                        var news=item.fields;
                        $scope.assets.forEach(function(it,i){
                            if (imgSrcId==it.sys.id){
                                news["img"]="http:"+it.fields.file.url;
                            }
                        })
                        $scope.allNews.push(news)
                    })
                });

        });


}]);
