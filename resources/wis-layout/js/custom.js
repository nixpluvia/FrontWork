//======브라우저======
//전역변수
var $win = $(window); //윈도우
var $winWidth; //브라우저 width

jQuery(document).ready(function ($) {
    $winWidth = $win.outerWidth(); //로드시 브라우저 너비값 설정

    //애니메이션 설정
    // var aniEventSize = 1024; //애니메이션 실행 브라우저 사이즈



    //팝업 이벤트 함수
    customPopup()

    tabGroup();


    //======리사이즈 이벤트======
    // $win.on("resize", function(){
    //     //사이즈 재설정
    //     $winWidth = $win.outerWidth();

    //     if ($winWidth > aniEventSize) {
    //         //리사이즈 기본 이벤트 실행

    //     } else {
            
    //     }
    // });

});


//링크로 구성된 탭
function tabGroup(){
    var $selector;//탭버튼
    var startWidth;//탭버튼 시작 window 사이즈
    var tabBtnName;//탭버튼 이름
    var tabBoxName;//탭박스 이름
    var actClass;//active 시킬 클래스
    var linkClass;//link tab에 사용할 클래스


    //초기화
    function init(){
        //정의되지 않으면 기본값 셋팅
        tabBtnName = '.btn_tab';
        $selector = $(tabBtnName+'[data-tab-name]');
        tabBoxName = '.tab-con';
        actClass = "active";
        linkClass = "on";
        startWidth = 800;
    }

    //실행
    function action(){
        $selector.on('click', function(e){
            var $this = $(this);
            var tabName = $this.attr('data-tab-name');
            var tabType = $this.attr('data-tab-type');
            var tabId = $this.attr('data-tab-id');

            var selectors = $(tabBtnName+'[data-tab-name="'+ tabName +'"');
            var tabWrap = $this.closest('.tab-wrap[data-tab-name="'+ tabName +'"]');
            var listWrap = tabWrap.find('.list-wrap');
            var tabBoxs = $(tabBoxName +'[data-tab-name="'+ tabName +'"]');
            var nowTabBox = $(tabBoxName +'[data-tab-name="'+ tabName +'"][data-tab-con="'+ tabId +'"]');

            

            if (tabType != 'link'){
                //일반 탭박스
                e.preventDefault();//클릭방지
                if($this.hasClass(actClass)){
                    if (tabWrap.hasClass(actClass)){
                        tabWrap.removeClass(actClass);
                        listWrap.removeClass(actClass);
                    } else {
                        tabWrap.addClass(actClass);
                        listWrap.addClass(actClass);
                    }
                } else {
                    tabWrap.removeClass(actClass);
                    listWrap.removeClass(actClass);
                    selectors.removeClass(actClass);
                    tabBoxs.removeClass(actClass);
    
                    $this.addClass(actClass);
                    nowTabBox.addClass(actClass);
                }
            } else {
                //링크 탭박스
                if($winWidth <= startWidth && $this.hasClass(actClass)) {
                    e.preventDefault();//클릭방지
                    if ($this.hasClass(linkClass)){
                        $this.removeClass(linkClass);
                        tabWrap.removeClass(actClass);
                    } else {
                        $this.addClass(linkClass);
                        tabWrap.addClass(actClass);
                    }
                }
            }

        })
    }

    init();
    action();
}





//팝업 이벤트 함수
function customPopup(){
    var openBtnEl;//팝업 열기 버튼
    var closeBtnEl;//팝업 닫기 버튼

    //초기화
    function init(){
        openBtnEl = $('[data-popup-open]');
        closeBtnEl = $('[data-popup-close]');
    }

    //실행
    function action(){
        //popup open
        openBtnEl.on('click', function(e){
            e.preventDefault();
            var $this = $(this);
            var popupId = $this.attr('data-popup-open');
            var popupEl = $('[data-popup="' + popupId + '"]');

            if ($this.hasClass('on')) {
                $this.removeClass('on');
                popupEl.removeClass('on');
            } else {
                $this.addClass('on');
                popupEl.addClass('on');
            }
        });

        //popup close
        closeBtnEl.on('click', function(e){
            e.preventDefault();
            var $this = $(this);
            var popupId = $this.attr('data-popup-close');
            var openBtn = $('[data-popup-open="' + popupId + '"]')
            var popupEl = $('[data-popup="' + popupId + '"]');//팝업 컨텐츠

            if (popupEl.hasClass('on')) {
                openBtn.removeClass('on');
                popupEl.removeClass('on');
            } else {
                openBtn.addClass('on');
                popupEl.addClass('on');
            }
        });
    }
    
    init();
    action();
}