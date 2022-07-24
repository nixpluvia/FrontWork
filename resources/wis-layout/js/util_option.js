
/* === global option version 1.0 === */

//전역변수
window.globalVal = {
    win: $(window), //window
    doc: $(document), //document
    winScrollTop:'',
    winWidth:'',
    winHeight:'',
    winBottom:'',
    winAniSize: 1024,
    docHeight: '',
};

window.utilGroup = {
    useResponsive : true,//반응형 resize 사용여부
    //scroll
    useScroll: false, //스크롤 여부
    scrollClass : '.scroll',
    scrollEl : $(this.scrollClass),
    scrollEndFlag : false,//스크롤 종료여부
    useScLoop: false,
    scloopClass: '.sc-loop',
    scloopEl: $(this.loopClass),
    useSpot: false,
    spotClass : '#spot .img-box',
    spotEl : $(this.spotClass),
    spotHeight : 600,
    spotMove : 150,
    custom : function(custom){
        //custom method 함수
        var customMethod = custom;
        if (typeof customMethod == 'function'){
            //자체가 함수일 경우
            customMethod();
        } else if (typeof customMethod == 'object') {
            //객체일 경우
            $.each(customMethod, function(index, item){
                //index - key, item - value
                if (typeof item == 'function'){
                    item();
                }
            })
        }
    },
    init: function(obj){
        //window action 초기설정
        var $this = this;
        var param = obj;
        //parameter 초기화
        param == undefined ? param = {} : param = param;
        this.setResponsive(param.useResponsive);//반응형 사용여부
        this.setWinAniSize(param.aniSize);//Anisize set
        this.setScroll(param.useScroll);//scroll 사용여부
        this.setScLoop(param.useScLoop);//scrollLoop 사용여부
        this.setSpot(param.useSpot);//spot 사용여부
        
        //document ready
        globalVal.doc.ready(function(){
            $this.initAction(param);
        });
    },
    initAction: function(param){
        var $this = this;
        this.winSizeOption();//window size, scroll 옵션
        globalVal.win.on('load', function(){
            globalVal.docHeight = globalVal.doc.outerHeight(); //document의 총 높이
        })
        //scroll사용여부 판단
        if (this.useScroll == true || this.useSpot == true || this.useScLoop == true) {
            this.setScrollInit(param);//스크롤 설정 초기화
            this.setScLoopInit(param);//루프 스크롤 설정 초기화
            this.setSpotInit(param);//spot 설정 초기화
        }

        function scrollHandler(){
            $this.scrollEvent($this);
        }
        // method 최초 실행
        if (globalVal.winAniSize <= globalVal.winWidth) {
            //animation size 이상일 경우 - PC 사이즈
            if (this.useScroll == true || this.useSpot == true) {
                scrollHandler();
                //스크롤 이벤트 등록
                globalVal.win.on('scroll', scrollHandler);
            }
        }
        
        //추가적인 커스텀 함수 실행
        this.custom();

        //responsive
        if (this.useResponsive != true) return false;
        globalVal.win.on('resize', function(){
            $this.winSizeOption();//window size option 초기화
            
            if (globalVal.winAniSize <= globalVal.winWidth) {
                
                
                if ($this.useScroll == true || $this.useSpot == true) {
                    //스크롤 이벤트 등록
                    globalVal.win.off('scroll', scrollHandler).on('scroll', scrollHandler);
                }
            } else {

                if ($this.useScroll == true || $this.useSpot == true) {
                    //스크롤 이벤트 제거
                    globalVal.win.off('scroll', scrollHandler);
                }
            }
            
        })
    },
    winSizeOption : function(){
        //window size option 초기화
        globalVal.winScrollTop = globalVal.win.scrollTop();
        globalVal.winWidth = globalVal.win.outerWidth(); //브라우저 width
        globalVal.winHeight = globalVal.win.outerHeight(); //브라우저 Height
        globalVal.winBottom = globalVal.winScrollTop + globalVal.winHeight; //브라우저 최하단 좌표
        globalVal.docHeight = globalVal.doc.outerHeight(); //document의 총 높이
    },
    //---set---
    setResponsive : function(responsive){
        //Scroll 기능 사용여부 판단
        if (responsive === true || responsive === false) {
            //데이터가 boolean 값일 경우
            this.useResponsive = responsive;
        }
    },
    setWinAniSize : function(size){
        //winAniSize 초기화
        var size = parseInt(size);//데이터타입 숫자로 변경
        if (!isNaN(size)) {
            //변경된 데이터가 숫자일경우만 변경
            globalVal.winAniSize = size;
        }
    },
    scrollEvent : function($this){
        globalVal.winScrollTop = globalVal.win.scrollTop();
        globalVal.winBottom = globalVal.winScrollTop + globalVal.winHeight;
        // 스크롤 실행 이벤트
        if ($this.useScroll == true) {
            //scroll 사용여부 판단
            $this.scrollActive();
        }
        if ($this.useScLoop == true) {
            //scroll 사용여부 판단
            $this.scLoopActive();
        }
        if ($this.useSpot == true) {
            //spot 사용여부 판단
            $this.spotAni();
        }
    },
    setScroll : function(scroll){
        //Scroll 기능 사용여부 판단
        if (scroll === true || scroll === false) {
            //데이터가 boolean 값일 경우
            this.useScroll = scroll;
        }
    },
    setScLoop : function(scLoop){
        //Scroll 기능 사용여부 판단
        if (scLoop === true || scLoop === false) {
            //데이터가 boolean 값일 경우
            this.useScLoop = scLoop;
        }
    },
    setSpot : function(spot){
        //spot 기능 사용여부 판단
        if (spot === true || spot === false) {
            //데이터가 boolean 값일 경우
            this.useSpot = spot;
        }
    },
    setScrollInit : function(obj){
        obj.scrollClass != '' ? this.scrollClass = this.scrollClass : this.scrollClass = obj.scrollClass;
        this.scrollEl = $(this.scrollClass);
    },
    setScLoopInit : function(obj){
        obj.scloopClass != '' ? this.scloopClass = this.scloopClass : this.scloopClass = obj.scloopClass;
        this.scloopEl = $(this.scloopClass);
    },
    setSpotInit : function(param){
        // console.log(this);
        param.spotClass == '' ? this.spotClass = this.spotClass : this.spotClass = param.spotClass;//spot 클래스명
        param.spotHeight == '' ? this.spotHeight = this.spotHeight : this.spotHeight = param.spotHeight;//spot 높이
        param.spotMove == '' ? this.spotMove = this.spotMove : this.spotMove = param.spotMove;//spot 이동거리
        this.scrollEl = $(this.scrollClass);//spot 요소
    },
    //---animation---
    scrollActive : function(){
        var $this = this;
        if (this.scrollEl.length > 0 && this.scrollEndFlag == false) {
            this.scrollEl.each(function(index, item){
                var el = item;
                $this.scrollAddClass($this, el, index);
            });
        }
    },
    scrollAddClass : function($this, selector, elIndex){
        var $selector = $(selector); //선택자
        var selectorIndex = elIndex + 1;
        var boxScrollTop = $selector.offset().top;//요소의 위치
        var scrollAllEl = $this.scrollEl;//스크롤 전체 요소
        var elDelay; //시작 높이 딜레이
        if ($selector.attr('data-type') !== 'scroll' || $selector.attr('data-delay') == undefined) {
            elDelay = 0;
        } else {
            elDelay = $selector.attr('data-delay');
        }

        //조건 - 현재 요소에 Scroll이 도착했을 경우, 문서의 끝까지 다 보이고 있는 경우
        if (globalVal.winBottom - elDelay >  boxScrollTop || globalVal.winBottom >= globalVal.docHeight) {
            $selector.addClass('on');
            if (selectorIndex == scrollAllEl.length) {
                $this.scrollEndFlag = true;//마지막 요소의 경우 체크
            }
        }
    },
    scLoopActive : function(){
        var $this = this;
        if (this.scloopEl.length > 0) {
            this.scloopEl.each(function(index, item){
                var el = item;
                $this.scLoopAddClass(el);
            });
        }
    },
    scLoopAddClass : function(selector){
        var $selector = $(selector);//선택자
        var elDelay = $selector.attr('data-delay');//높이값 딜레이
        var boxScrollTop = $selector.offset().top;//요소의 좌표
        if ($selector.attr('data-type') !== 'scroll' || $selector.attr('data-delay') == undefined) {
            elDelay = 0;
        } else {
            elDelay = $selector.attr('data-delay');
        }

        if (globalVal.winBottom - elDelay > boxScrollTop) {
            $selector.addClass('act');
        } else {
            $selector.removeClass('act');
        }
    },
    spotAni : function(){
        var nowPercent = Math.floor(Do.winOption.winScrollTop * 100 / this.spotMaxHeight); //현재 위치값 퍼센트
        var nowPosition = this.spotMoveHeight * nowPercent / 100; //배경 위치값 PX 변환
        this.spotEl.css('background-position', 'center -' + nowPosition + 'px');
        // console.log(nowPosition);
    },
}



/*
utilGroup.init({
    //useResponsive: 기본값 true(boolean) -  window resize이벤트를 실행시키거나 끌 수 있다.
    //useScroll: 기본값 false(boolean) - 스크롤 이벤트 사용여부를 판단한다.
    //scrollClass: 기본값 '.scroll'(text) - 스크롤 이벤트 해당 클래스명을 변경할 수 있다.
    //useSpot: 기본값 false(boolean) - Spot 스크롤 이벤트 사용여부를 판단한다.
    //spotClass: 기본값 '#spot .img-box'(text) - Spot 스크롤 이벤트 해당 클래스명을 변경할 수 있다.
    //spotHeight: 기본값 600 - 
    //spotMove: 기본값 150 - 
});
*/
