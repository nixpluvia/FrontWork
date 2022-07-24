$(document).ready(function(){

    /* 슬라이드
    var visualSlide = new Swiper('#visual-wrap .visual-slide', {
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect : 'fade',
        loop : true,

        pagination : {
            el : '#visual-wrap .swiper-pagination',
            clickable : true,
        },
        navigation: {
            nextEl: '#visual-wrap .swiper-next',
            prevEl: '#visual-wrap .swiper-prev'
        },

        on: {
            slideChangeTransitionEnd: function(){
                var visualpageActive = $("#visual-wrap .swiper-pagination-bullet.swiper-pagination-bullet-active").index();

                if(visualpageActive == -1){
                    visualpageActive = 0;
                }
                $("#visual-wrap  .slide-count .page-in").text(visualpageActive+1);
            },
        },
    });
    */

   // 텝 메소드
   // tabEvent("#section-03 .tab-tit-box > li > a","#se03-tabcon","active");
});


function tabEvent(select,tabcontent,active) {
    $(select).on("click", function(e){
        e.preventDefault();

        var tabItem = $(this).attr("href");
        $(select).removeClass(active);
        $(tabcontent).find(".tab-con").removeClass(active);

        $(this).addClass(active);
        $(tabItem).addClass(active);

    });
}