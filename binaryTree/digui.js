/**
 * Created by mahong on 17/4/14.
 */

function parseJson(json){
//        var l=json.length;
//        var arr = [];
//        for(var i = 0; i < l; i++){
//            (function(){
//                var jsonArray =arguments[0];
//                for(var k in jsonArray){
//                    if(k.indexOf('children') != -1 && jsonArray[k] != null){
//                        arguments.callee(jsonArray[k]);
//                    }
//                    else{
//                        if(k == 'name' || k == 'children'){
//                            arr.push(jsonArray[k]+'');
//                        }
//                    }
//                }
//            })(json[i]);
//        }
//        console.log(arr);

    var arr = [];

    function foo(jsonItem){
        for(var k in jsonItem){
            if(k.indexOf("children")>=0&&jsonItem[k]!=null){
                foo(jsonItem[k])
            }else{
                if(k=="name"){
                    arr.push(jsonItem[k]);
                }
            }
        }
    }

    for(var i = 0; i< json.length; i++){
        foo(json[i])
    }
    console.log(arr);

}
//等{"id":"001","name":"上海市浦东新区","children":{"id":"002","name":"上海市徐汇区","range":2},"range":1}的内层chidren {"id":"002","name":"上海市徐汇区","range":2} 跑完以后(递)   再执行剩下的 回到外层跑"range":1 (归),没有return就要再回来执行剩下的


var theJson = [{"id":"001","name":"上海市浦东新区","children":{"id":"002","name":"上海市徐汇区","range":2},"range":1},{"id":"004","name":"上海市静安区","children":{"id":"005","name":"上海市闸北区","range":4},"range":3}];

//parseJson(theJson);

var total = 0;
function factorial(n){
   if(n>1){
       total = n * factorial(n-1);
       console.log(["total",total,"n",n]);
       return total;
   }else{
       total =  n;
       console.log(["total",total,"n",n]);
       return total;
   }

}

//递  factorial(n-1)从n=10递到n=1    归  n * factorial(n-1) 从n=1 归到n=10
//["total", 1, "n", 1] 递到 n=1时
//["total", 2, "n", 2] 归到n=2  2*1
//["total", 6, "n", 3]  归到n=3  3*2*1
//["total", 24, "n", 4] 归到n=4  4*3*2*1
//["total", 120, "n", 5] 归到n=5  5*4*3*2*1
//["total", 720, "n", 6] 归到n=6  6*5*4*3*2*1
//["total", 5040, "n", 7]
//["total", 40320, "n", 8]
//["total", 362880, "n", 9]
//["total", 3628800, "n", 10]

 factorial(10);
console.log(["total",total]);