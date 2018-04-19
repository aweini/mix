$(function(){
    function Pointer(x,y){//定义鼠标位置；
    this.x = x;
    this.y = y;
        //console.log(this);//-->Pointer
    }
    function Position(left,top){//定义拖拽位置；
    this.left = left;
    this.top = top;
       // console.log(this);//-->Position
    }
    $('.item_content .item').each(function(i){
        this.init = function(){
            this.box = $(this).parent();
            $(this).attr('index',i).css({
                position:'absolute',
                top:this.box.offset().top,
                left:this.box.offset().left
            }).appendTo('.item_content')
                this.drag()
        }
        this.move = function(callback){
            $(this).animate({
                left:this.box.offset().left,
                top:this.box.offset().top
            },500,function(){
                if(callback){
                    callback.call(this)//如果存在回调函数，则调用move方法
                }
            })
        }
        this.collisionCheck = function(){
            var currentItem = this;

            var direction = null;//用来存方向值
            $(this).siblings('.item').each(function(){
                if(currentItem.pointer.x>this.box.offset().left&&
                    currentItem.pointer.y>this.box.offset().top&&
                        (currentItem.pointer.x<this.box.offset().left+this.box.width() )&&
                        (currentItem.pointer.y<this.box.offset().top+this.box.height())
                ){
                    if(currentItem.box.offset().top<this.box.offset().top){
                        direction  = 'down';
                        console.log(direction)
                    }else if(currentItem.box.offset().top>this.box.offset().top){
                        direction = 'up';
                        console.log(direction)
                    }else{
                        direction = 'normal';
                        console.log(direction)
                    }
                    this.swap(currentItem,direction);
                }
            })
        }
        this.swap = function(currentItem,direction){//传入拖拽div和方向值 做变换

            var directions = {
                normal :function(){
                    var saveBox = this.box;//接收框 =  当前框-->this-->碰撞到的兄弟div

                    this.box = currentItem.box;//定义中间变量，交换div
                    currentItem.box = saveBox;
                    this.move();

                    $(this).attr('index',this.box.index());
                    $(currentItem).attr('index',currentItem.box.index())
                },
                up: function(){
                    var saveBox = this.box;//接收框 =  当前框-->this-->碰撞到的兄弟div

                    this.box = currentItem.box;//定义中间变量，交换div
                    currentItem.box = saveBox;
                    this.move();

                    $(this).attr('index',this.box.index());
                    $(currentItem).attr('index',currentItem.box.index())
                },
                down: function() {
                    var saveBox = this.box;//接收框 =  当前框-->this-->碰撞到的兄弟div

                    this.box = currentItem.box;//定义中间变量，交换div
                    currentItem.box = saveBox;
                    this.move();

                    $(this).attr('index',this.box.index());
                    $(currentItem).attr('index',currentItem.box.index())
                }
            }
           directions[direction].call(this);//调用当前对象对应的方法
        }
        this.drag  = function(){
            var oldPosition = new Position();
            var oldPointer  = new Pointer();
            var isDrag = false;
            var currentItem = null;
            $(this).mousedown(function(e){
                e.preventDefault();
                oldPosition.left = $(this).position().left;
                oldPosition.top = $(this).position().top;
                oldPointer.x = e.clientX;
                oldPointer.y = e.clientY;
                isDrag = true;
                currentItem = this;
            })
            $(document).mousemove(function(e){
                var currentPointer = new Pointer(e.clientX, e.clientY);
                if(!isDrag) return false;
                $(currentItem).css({
                    'opacity':'0.8',
                    'z-index':'999'
                })
                var left = currentPointer.x - oldPointer.x + oldPosition.left;
                var top  = currentPointer.y - oldPointer.y + oldPosition.top;
                $(currentItem).css({
                    left:left,
                     top:top
                })
                currentItem.pointer = currentPointer ;//定义鼠标位置
                //碰撞检测
                currentItem.collisionCheck();//调用碰撞检测方法

            })
            $(document).mouseup(function(){
                if(!isDrag) return false;
                isDrag = false;
                currentItem.move(function(){//这是传入的回调函数
                    $(this).css({
                        'opacity':'1',
                        'z-index':0
                    })
                })
            })
        }
        this.init();


    })


})