//======브라우저======
//전역변수
var $win = $(window); //윈도우
var $winWidth; //브라우저 width
var $winHeight; //브라우저 Height
var $winScrollTop; //브라우저 최상단 좌표
var $winBottom; //브라우저 최하단 좌표

var $docHeight; //document의 총 높이


$(document).ready(function() {
    $winScrollTop = $win.scrollTop(); //로드시 브라우저 상단 좌표값 설정
    $winWidth = $win.outerWidth(); //로드시 브라우저 너비값 설정
    $winHeight = $win.outerHeight(); //로드시 브라우저 높이값 설정
    $winBottom = $winScrollTop + $winHeight; //로드시 브라우저 하단 좌표값 설정

    $(window).on('load', function(){
        $docHeight = $(document).outerHeight();
    });

    //애니메이션 설정
    var aniEventSize = 1024; //애니메이션 실행 브라우저 사이즈

    //======스크롤 애니메이션 설정======
    var $scroll = $('.scroll');//스크롤 이벤트 Selector
    var scrollDone = false;//스크롤 이벤트 완료 및 존재 여부

    //스크롤 요소 없을 시 완료
    if ($scroll.length < 1) {
        scrollDone = true;
    }

    //스크롤 클래스 이벤트
    function scrollAddClass(selector, scrollClass, elIndex){
        var $this = $(selector);//선택자
        var $delay = $this.attr('data-delay');//높이값 딜레이
        var selectorIndex = elIndex + 1;
        var $boxScrollTop = $this.offset().top;
        var $scrollClass = $(scrollClass);
        if ($delay == undefined) {
            $delay = 0;
        }

        if ($winBottom - $delay >  $boxScrollTop || $winBottom >= $docHeight) {
            $this.addClass('on');
            
            if ( selectorIndex == $scrollClass.length ) {
                scrollDone = true;
            }
        }
    }
    

    // Spot 이벤트 설정
    var spotBg = $('#spot .img-box'); //Spot 배경
    var imgMoveHeight = 150; //배경 이미지 움직일 거리
    var maxHeight = 600; //스크롤 최대 높이
    var nowPercent; //현재의 % 위치값
    var nowPosition;//현재의 PX 위치값

    function spotAni(){
        //스크롤 최대 높이 까지 작동
        if ($winScrollTop < maxHeight) {
            nowPercent = Math.floor($winScrollTop * 100 / maxHeight); //현재 위치값 퍼센트
            nowPosition = imgMoveHeight * nowPercent / 100; //배경 위치값 PX 변환
            spotBg.css('background-position', 'center -' + nowPosition + 'px'); //배경이미지 position 변경
        }
    }


    //반복 스크롤 이벤트
    var $scrollLoop = $('.scroll-loop');
    function scrollLoop(selector){
        var $this = $(selector);//선택자
        var $delay = $this.attr('data-delay');//높이값 딜레이
        var $boxScrollTop = $this.offset().top;//요소의 좌표
        if ($delay == undefined) {
            $delay = 0;
        }

        if ($winBottom - $delay > $boxScrollTop) {
            $this.addClass('on');
        } else {
            $this.removeClass('on');
        }
    }


    //스크롤 이벤트 설정
    function scrollEvent(){
        $win.on('scroll', function(){
            $winHeight = $win.outerHeight();
            $winScrollTop = $win.scrollTop();
            $winBottom = $winScrollTop + $winHeight;

            $scrollLoop.each(function(){
                scrollLoop(this);
            })

            if (scrollDone == false) {
                $scroll.each(function(index){
                    scrollAddClass(this, '.scroll', index)
                });
            }

            spotAni();
        });                
    }





    //=======로드시 실행======
    //딜레이 추가
    delayAdd();
    

    //link 탭
    linkTab('.btn-ltab');
    linkTab('.btn-ltab', {
        tabWrap : '.tab-wrap-2'
    });



    //PC사이즈
    if ($winWidth > aniEventSize) {
        

        //스크롤 반복 애니메이션
        $scrollLoop.each(function(){
            scrollLoop(this);
        })

        //스크롤 애니메이션 실행
        $scroll.each(function(index){
            scrollAddClass(this, '.scroll', index)
        });

        scrollEvent();
    }


    //======리사이즈 이벤트======
    $win.on("resize", function(){
        //사이즈 재설정
        $winScrollTop = $win.scrollTop();
        $winWidth = $win.outerWidth();
        $winHeight = $win.outerHeight();
        $winBottom = $winScrollTop + $winHeight;
        $docHeight = $(document).outerHeight();


        if ($scroll.length < 1) {
            scrollDone = true;
        }

        if ($winWidth > aniEventSize) {
            //리사이즈 기본 이벤트 실행
            $scrollLoop.each(function(){
                scrollLoop(this);
            })

            $scroll.each(function(index){
                scrollAddClass(this, '.scroll', index)
            });
            spotAni();

            //스크롤 이벤트 실행
            scrollEvent();
        } else {
            //PC 사이즈가 아닐경우 Scroll 이벤트 삭제
            $win.off('scroll');
            spotBg.css('background-position', 'center 0');
        }
    });
    

    // 공통 hover 이벤트
    $('.hover').on('mouseenter', function(){
        var $this = $(this);
        $this.addClass('on')
    })
    $('.hover').on('mouseleave', function(){
        var $this = $(this);
        $this.removeClass('on')
    })
});



//링크 탭
function linkTab(selector, option){
    var $selector;
    var $tabWrap;
    var $listWrap;
    var startWidth;

    function init(){
        if (option == undefined ) {
            $tabWrap = $('.tab-wrap');
            $listWrap = $('.list-wrap');
            startWidth = 600;
        } else {
            option.tabWrap == undefined ? $tabWrap = $('.tab-wrap') : $tabWrap = $(option.tabWrap);
            option.listWrap == undefined ? $listWrap = $('.list-wrap') : $listWrap = $(option.listWrap);
            option.startWidth == undefined ? startWidth = 600 : startWidth = option.startWidth;
        }
        $selector = $tabWrap.find(selector + '.on');
    }

    function action(){
        $selector.on('click', function(e){
            
            if($winWidth <= startWidth) {
                e.preventDefault();
                if($listWrap.hasClass('on')){
                    $listWrap.removeClass('on');
                } else {
                    $listWrap.addClass('on');
                }
            }

        })
    }

    function start(){
        init();
        action();
    }

    start();
}


//딜레이 추가 함수
function delayAdd(){
    var $selector = $('[trn-delay]');//선택 요소
    
    //딜레이 요소 없으면 실행 X
    if ($selector.length == 0 ) {
        return false;
    }

    $selector.each(function(index){
        var $sel = $(this);
        var $group; //그룹별 딜레이;
        var $selDelayMount;
        $sel.attr('trn-delay') == 'auto' ? $selDelayMount = 0.2 : $selDelayMount = $sel.attr('trn-delay');//딜레이 양 설정

        //그룹별 딜레이 설정
        $sel.attr('trn-group') == undefined ? $group = false : $group = true;

        if ($group == true) {
            var groupId = $sel.attr('trn-group');
            var groupSel = $('[trn-group="' + groupId + '"]').find(' [trn-child]');
            var $startDelay; //시작 딜레이
            var $nowDelay;//현재 딜레이
            $sel.attr('trn-start') == undefined ? $startDelay = 0 : $startDelay = $sel.attr('trn-start');//시작 딜레이 설정
            $nowDelay = parseFloat($startDelay); //시작 설정
            
            groupSel.each(function(index){
                var $child = $(this);
                var $parent = $child.closest('[trn-group]');//그룹 부모
                var $delayMount; //딜레이 양

                $child.attr('trn-child') == 'auto' ? $delayMount = $selDelayMount : $delayMount = $child.attr('trn-child');//딜레이 양 설정
                $delayMount = parseFloat($delayMount);//숫자로 변환
                //첫번째 요소일 때
                if (index > 0) {
                    $nowDelay = $nowDelay + $delayMount//딜레이 증가
                }
                
                $child.css('transition-delay', $nowDelay + 's')//딜레이 적용
            });

        } else {
            $sel.css('transition-delay', $selDelayMount + 's')//딜레이 적용
        }

    })
}