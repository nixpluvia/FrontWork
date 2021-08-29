// 전역변수
var $winWidth = null;


$(document).ready(function(){



    //load, resize 이벤트
    $(window).on('load resize',function(){
        //메뉴 클래스 제거
        var $header = $('#header');
        var $moGnb = $('.mo-menu');
        var $moGnbBg = $('.mo-menu-bg');
        var $siteMap = $('.sitemap');
        var $body = $('body');

        $header.removeClass('on');
        $moGnb.removeClass('on');
        $moGnbBg.removeClass('on');
        $siteMap.removeClass('on');
        $body.removeClass('on');


        /* 브라우저 width값 */
        $winWidth = window.innerWidth;
    });

});


/* 기본 탭박스 */
function tabBox(button,option){
    var $tabBtn = null;
    var $wrap = null;

    //선택한 요소의 탭박스
    var $btnAttr = null;
    var $tabId = null;
    var $nowTabBox = null;

    var $actvdBtn = null;
    var $actvdBox = null;
    var $actClass = null;

    function init(){
        $wrap = $(option.wrap);
        $tabBtn = $wrap.find(button);
        
        option.actClass == undefined ? $actClass = 'on' : $actClass = option.actClass;
        option.btnAttr == undefined ? $btnAttr = 'data-tab' : $btnAttr = option.btnAttr;
    }

    function mouEvent(){
        $tabBtn.on('click', function(e){
            e.preventDefault();
            var $this = $(this);
            
            //선택한 요소 중복 클릭 방지
            if(!$this.hasClass($actClass)){
                action($this);
            }
        });
    }

    function action(elem){
        // 선택한 요소의 탭 id값 찾기
        $tabId = elem.attr($btnAttr);
        $nowTabBox = $('#' + $tabId);
        // 다른 active 요소 찾기
        $actvdBtn = $wrap.find(button +'.'+ $actClass);
        $actvdBox = $wrap.find(option.tabBox +'.'+ $actClass);
        // 이전 active의 클래스 제거
        $actvdBtn.removeClass($actClass);
        $actvdBox.removeClass($actClass);
        // 선택한 요소 및 탭박스 클래스 추가
        elem.addClass($actClass);
        $nowTabBox.addClass($actClass);
    }

    function start(){
        init();
        mouEvent();
    }

    start();
}