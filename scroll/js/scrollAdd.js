$(document).ready(function(){


    var questionnaireList = $($(".questionnaire-list")[0]);
    var listData = [];

   function getQuestion(){
       $.get({url:"data/list.do"},function(res,status){
           console.log(["res",res]);
           res =JSON.parse(res);
           console.log(["res",res.data]);
           listData.concat(res.data);
           //$.extend(listData,res.data);
           console.log(["listData",listData]);
           listData.forEach(function(item,index){
               questionnaireList.append('<div class="questionnaire-item">'+
               '<div class="questionnaire-head">'+
                   '<div class="questionnaire-name">'+item.title+index+'</div>'+
                   '<div class="questionnaire-more">'+
                        '<div class="iconfont icon-jiantou">&#xe677</div>'+
                    '</div>'+
               '</div>'+
               '<div class="questionnaire-foot">'+
                   '<div class="questionnaire-time">结束时间:'+item.time+'</div>'+
               '<div class="questionnaire-num">'+item.respondent_count+'人参加</div>'+
               '</div>'+
               '</div>')
           })
       });
   }

    //getQuestion();

    var questionnaire = $(".questionnaire")[0];

    questionnaire.addEventListener("scroll",function(){
        getQuestion();
    })

});