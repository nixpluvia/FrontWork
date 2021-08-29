$(document).ready(function(){

    // 탭박스 스타일2
    winWidthClass('.btn-tab',{
        wrap : '.tab-head-02',
        actItem : '.list-wrap',
        checkEl: '.tab-list.on',
        winStart : 800
    });
    tabBox('.btn-tab',{
        wrap: '#tab02',
        tabBox: '.tab-con'
    });

});



//Window Width 조건 Class 이벤트
function winWidthClass(selector,option){
    //선택자
    var $selector = null;
    var $checkEl = null;
    //최상위 부모
    var $wrap = null;
    //active 관련
    var $actItem = null;
    var $actClass = null;
    
    /* 이벤트 시작 윈도우 사이즈 */
    var $startWidth = null;

    function init(){
        $wrap = $(option.wrap);
        if (option.checkEl == undefined) {
            $checkEl = $wrap.find(option.checkEl);
            $selector = $checkEl.find(selector);
        } else {
            $selector = $wrap.find(selector);
        }
        $actItem = $wrap.find(option.actItem);

        
        /* 추가 옵션 기본 설정 */
        option.actClass == undefined ? $actClass = 'on' : $actClass = option.actClass;
        option.winStart == undefined ? $startWidth = 800 : $startWidth = option.winStart;
    }

    function mouEvent(){
        $selector.on('click', function(e){
            //윈도우 사이즈 조건
            if($winWidth <= $startWidth) {
                e.preventDefault();
                classAction();
            }
        });
    }
    
    function classAction(){
        //클래스 추가 및 제거
        if($actItem.hasClass($actClass)){
            $actItem.removeClass($actClass);
        }else{
            $actItem.addClass($actClass);
        }
    }

    function start(){
        init();
        mouEvent();
    }

    start();
}