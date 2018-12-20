
Mainapp.controller('mainCtrl', ['$scope','$http','contentful', function($scope,$http,contentful) {
    window.scrollTo(0, 0);


    $scope.aboutUs="The anomaly detection and diagnosis (AiDnD) lab in BGU has been established by Dr. Meir Kalech in 2008. The lab’s main focus is automated troubleshooting, which includes developing theories and algorithms for detecting anomalies in systems, diagnosing their root cause, and repairing detected faulty components. The research in the lab draws from a broad range of areas from the Artificial Intelligence literature, including both model-based and data-driven techniques. We have applied our research to several applications, including automobiles, software systems, Boolean circuits, physiotherapy, SCADA systems, and water pipes. ";

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
