/**
 * Created by yj on 2016/12/20.
 */
////轮播图//////////
window.onload= function () {
    var main=document.getElementById("main");
    var mask=document.getElementById("mask");//遮罩
    var ul=mask.querySelector("ul");//装图的盒子
    var ulLis=ul.children;//图片
    var ol=main.querySelector("ol");//下面的按钮
    var larrow=document.getElementById("larrow");
    var img1=larrow.children[0];
    var rarrow=document.getElementById("rarrow");
    var img2=rarrow.children[0];
    var liWidth=main.offsetWidth;
    var timer=null;
    //console.log(liWidth);
    //1根据ullis个数动态生成第ollis
    for(var i=0;i<ulLis.length;i++){
        var li=document.createElement("li");
        ol.appendChild(li);
    }
    var olLis=ol.querySelectorAll("li");
    olLis[0].className="current";
    //2克隆假的第一个li
    var lastLi=ulLis[0].cloneNode(true);
    console.log(lastLi);
    ul.appendChild(lastLi);
    //3点击下面小圆点，远点变色，li移动
    for(var i=0;i<olLis.length;i++){
        olLis[i].index=i;
        olLis[i].onclick= function () {
           for(var j=0;j<olLis.length;j++){
               olLis[j].className=""
           }
            this.className="current";
            //移动图片
            var target=-this.index*liWidth;
            animate(ul,target);
            pic=square=this.index;

        }
    }
    mask.onmouseover = function () {
        clearInterval(timer);
    };

    mask.onmouseout = function () {
        //离开后要继续自动滚动
        //timer = setInterval(playNext, 4000);
    };
//4点击箭头，li移动
    var pic=0;
    var square=0;
    rarrow.onclick= function () {
        if(pic==ulLis.length-1){
            ul.style.left=0;
            pic=0;
        }
        pic++;
        var target=-pic*liWidth;
        animate(ul,target);
        if(square<olLis.length-1){
            square++;
        }else{
            square=0;
        }
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        //留下对应的
        olLis[square].className = "current";
    };
    larrow.onclick= function () {
        if(pic==0){
            ul.style.left=-(ulLis.length - 1) * liWidth + "px";
            pic=ulLis.length-1;
        }
        pic--;
        var target=-pic*liWidth;
        animate(ul,target);
        if(square>0){
            square--;
        }else{
            square=olLis.length-1;
        }
        for (var i = 0; i < olLis.length; i++) {
            olLis[i].className = "";
        }
        //留下对应的
        olLis[square].className = "current";
    };
    //timer = setInterval(playNext, 4000);//每隔一秒播放下一张
    //function playNext() {
    //    rarrow.onclick();
    //}


















    function animate(obj, target) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var leader = obj.offsetLeft;
            var step = 30;
            step = leader < target ? step : -step;
            if (Math.abs(target - leader) >= Math.abs(step)) {
                leader = leader + step;
                obj.style.left = leader + "px";
            } else {
                obj.style.left = target + "px";
                clearInterval(obj.timer);
            }
        }, 20);
    }

};