$(document).ready(function(){
    var visual = new Swiper ('.visual-slide', {
        loop: true,
        navigation: {
            nextEl : '#visual .btn-v-next',
            prevEl : '#visual .btn-v-prev',
        },
        pagination: {
            el: '#visual .v-pagination',
            type: 'bullets',
            bulletClass: 'v-bullet',
            bulletActiveClass : 'on',
        },
        on: {
            slideChangeTransitionEnd : function(){
                nowIndex();
            },
        }
    });

    slideIndex()    
});


function slideIndex(){
    var $pagingBox = $('#visual .v-pagination');
    var $dots = $pagingBox.find(' > .v-bullet');
    var $actDot = $pagingBox.find(' > .v-bullet.on');
    var $indexBox = $('#visual .v-index');
    var $indexNow = $indexBox.find(' > .v-now-num');
    var $indexMax = $indexBox.find(' > .v-max-num');
    
    var $nowNum = $actDot.index()+1;
    var $maxNum = $dots.length;

    $indexNow.text($nowNum);
    $indexMax.text($maxNum);
};

function nowIndex(){
    var $actDot = $('#visual .v-pagination .v-bullet.on');
    var $indexNow = $('#visual .v-index .v-now-num');
    var $nowNum = $actDot.index()+1;

    $indexNow.text($nowNum);
};