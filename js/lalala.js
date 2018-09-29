(function($){
    $.fn.showImg = function(options){
        var defaults = {};
        var options = $.extend(defaults, options);
        var container=$(this);
        var imgUrls = options.imgUrls;
        var width = options.width,height = options.height,thumbHeight = options.thumbHeight;
        var autoPlay = options.autoplay;
 
        container.css("width",width+"px");
 
        var imgIndex = 1,length = imgUrls.length;
        var play;
 
        /**
         * Õº∆¨œÍ«È
         */
        var detailDiv = $("<div></div>").addClass("detail-div").appendTo(container);
 
        var ctrlDiv = $("<div></div>").appendTo(detailDiv).hide();
        var prevA = $("<a></a>").attr("id","prev").appendTo(ctrlDiv).hide(),
            nextA = $("<a></a>").attr("id","next").appendTo(ctrlDiv);
 
        $(".detail-div").live("mouseenter",function(){
            play = clearInterval(play);
            ctrlDiv.show();
        });
        $(".detail-div").live("mouseleave",function(){
            play = setInterval(playImg,3000);
            ctrlDiv.hide();
        });
 
        var detailImgA = $("<a></a>").appendTo(detailDiv);
        var detailImg = $("<img />").attr("id","detailImg")
            .attr("width",width)
            .attr("height",height)
            .attr("src","img/demopage/image-"+imgIndex+".jpg")
            .appendTo(detailImgA);
 
        /**
         * Àı”∞Õº∆¨
         */
        var thumbDiv = $("<div></div>").addClass("thumb-div")
            .appendTo(container)
            .css("width",width+"px");
        addThumbImgs();
 
        prevA.on("click",function(){
            imgCtrlFun("prev");
        });
        nextA.on("click",function(){
            imgCtrlFun("next");
        });
 
        if(autoPlay){
            play = setInterval(playImg,3000);
        }
        function playImg(){
            if(imgIndex===length){
                imgIndex=0;
            }
            nextA.click();
        }
        /**
         * Õº∆¨øÿ÷∆
         * @param type
         */
        function imgCtrlFun(type){
            if(type==="prev"){
                if(imgIndex>1){
                    imgIndex= imgIndex-1;
                }
            }
            else{
                if(imgIndex<length){
                    imgIndex= imgIndex+1;
                }
            }
            $("#detailImg").attr("src","img/demopage/image-"+imgIndex+".jpg");
            thumbDiv.html("");
            addThumbImgs();
            if(imgIndex===length){
                $("#next").hide();
            }
            else{
                $("#next").show();
            }
            if(imgIndex===1){
                $("#prev").hide();
            }
            else{
                $("#prev").show();
            }
        };
        /**
         * ÃÌº”Õº∆¨Àı”∞
         */
        function addThumbImgs(){
            var thumbWidth = width/3-10;
            for(var i=imgIndex-2;i<imgIndex+1;i++){
                var thumb = $("<div></div>").addClass("thumb").appendTo(thumbDiv);
                var thumbModalDiv = $("<div></div>").addClass("thumb-modal").appendTo(thumb);
                thumbModalDiv.css("height",thumbHeight+"px")
                    .css("width",thumbWidth+"px");
                var thumbImg = $("<img />").attr("id","thumb"+(i+1))
                    .attr("width",thumbWidth)
                    .attr("height",thumbHeight)
                    .addClass("thumb-img")
                    .appendTo(thumb);
                if(!(i<0)){
                    thumbImg.attr("src",imgUrls[i]);
                }
                if(i===imgIndex-1){
                    thumb.addClass("thumb-active");
                    thumbModalDiv.addClass("thumb-modal-hide");
                }
            }
        };
    }
})(jQuery);