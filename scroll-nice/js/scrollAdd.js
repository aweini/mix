$(document).ready(function(){


    var questionnaireList = $($(".questionnaire-list")[0]);
    var listData = [];

   function getQuestion(){
       $.get({url:"data/list.do"},function(res,status){
           console.log(["res  string",res]);
           res =JSON.parse(res);
           console.log(["res json",res]);
           var orignIndex = listData.length;
           listData = listData.concat(res.data);
          // $.extend(listData,res.data);
           console.log(["listData",listData]);
           var DOMArr = [];
           res.data.forEach(function(item,index){
               DOMArr.push('<div class="questionnaire-item">'+
               '<div class="questionnaire-head">'+
                   '<div class="questionnaire-name">'+item.title+(orignIndex+index)+'</div>'+
                   '<div class="questionnaire-more">'+
                        '<div class="iconfont icon-jiantou">&#xe677</div>'+
                    '</div>'+
               '</div>'+
               '<div class="questionnaire-foot">'+
                   '<div class="questionnaire-time">结束时间:'+item.time+'</div>'+
               '<div class="questionnaire-num">'+item.respondent_count+'人参加</div>'+
               '</div>'+
               '</div>');
               
           })
           var DOMString = DOMArr.join("");
           questionnaireList.append(DOMString);
       });
   }

    //getQuestion();

    var questionnaire = $(".questionnaire")[0];
    var qHeight = $(".questionnaire").height();
    var qScrollTop = document.querySelectorAll(".questionnaire")[0].scrollTop;
    var qScrollHeight = $(".questionnaire")[0].scrollHeight;
    questionnaire.addEventListener("scroll",function(){
        var qHeight = $(".questionnaire").height();
        var qScrollTop = document.querySelectorAll(".questionnaire")[0].scrollTop;
        var qScrollHeight = $(".questionnaire")[0].scrollHeight;
        console.log(["qHeight",qHeight]);
        console.log(["qScrollTop",qScrollTop]);
        console.log(["qScrollHeight",qScrollHeight]);
        if((qHeight+qScrollTop)>qScrollHeight-10){
             getQuestion();
        }

        
    })

});