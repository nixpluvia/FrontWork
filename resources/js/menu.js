$(document).ready(function(){


    fullMenu('.gnb .menu-01 > li','.gnb','#header',80,330);

    clickToggle('.btn-sitemap', '#header .sitemap','body');

    clickToggle('.btn-mobile', '#header .mo-menu','#header .mo-menu-bg','body');

    // siblingToggle(button,siblings class, menuBox class);
    siblingToggle('#header .mo-gnb .menu-01-tit','.mo-r-menu','.mo-gnb');
    accrodion('#header .mo-gnb .menu-02-tit','.menu-03','.mo-gnb');

    winResize()
});

function winResize(){
    $(window).resize(function(){
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
    });
}

function fullMenu(menuElem,menuWrap,menuBox,MinH,MaxH){
    var $menuElem = null;
    var $menuWrap = null;
    var $menuBox = null;
    var $minH = null;
    var $maxH = null;

    function initParam(){
        $menuElem = $(menuElem);
        $menuWrap = $(menuWrap);
        $menuBox = $(menuBox);
        $minH = MinH;
        $maxH = MaxH;
    }

    function mouEvent(){
        $menuElem.on('mouseenter', function(){
            var $this = $(this);
            toggle();
            $menuElem.removeClass('on');
            $this.addClass('on');
        });
        $menuElem.on('mouseleave', function(){
            toggle();
        });
    }

    function toggle(){
        if($menuBox.hasClass('on')){
            $menuBox.removeClass('on');
            $menuWrap.removeClass('on');
            $menuBox.css('height', $minH + 'px');
            $menuWrap.css('height', $minH + 'px');
        }else {
            $menuBox.addClass('on');
            $menuWrap.addClass('on');
            $menuBox.css('height', $maxH + 'px');
            $menuWrap.css('height', $maxH + 'px');
        }
    }

    function start(){
        initParam();
        mouEvent();
    }
    start();
}

function clickToggle(button,menuBox,box01,box02){
    var $btnToggle = null;
    var $menuBox = null;
    var $box01 = null;
    var $box02 = null;

    function initParam(){
        $btnToggle = $(button);
        $menuBox = $(menuBox);
        $box01 = $(box01);
        $box02 = $(box02);
    }

    function mouEvent(){
        $btnToggle.on('click', function(e){
            e.preventDefault();
            toggle();
        });
    }

    function toggle(){
        if($menuBox.hasClass('on')){
            $btnToggle.removeClass('on');
            $menuBox.removeClass('on');
            $box01.removeClass('on');
            $box02.removeClass('on');
        }else {
            $btnToggle.addClass('on');
            $menuBox.addClass('on');
            $box01.addClass('on');
            $box02.addClass('on');
        }
    }

    function start(){
        initParam();
        mouEvent();
    }

    start();
}

function siblingToggle(button,sibling,menuBox){
    var $btnToggle = null;
    var $sibling = null;
    var $menuBox = null;
    var $active = null;

    function initParam(){
        $btnToggle = $(button);
        $menuBox = $btnToggle.closest(menuBox);
    }

    function mouEvent(){
        $btnToggle.on('click', function(e){
            e.preventDefault();
            var $this = $(this);
            $sibling = $this.siblings(sibling);
            $active = $menuBox.find(sibling + '.on');

            toggle($this);
            
        });
    }

    function toggle(elem){
        if($sibling.hasClass('on')){
            elem.removeClass('on');
            $sibling.removeClass('on');
            
        }else {
            $btnToggle.removeClass('on');
            $active.removeClass('on');

            elem.addClass('on');
            $sibling.addClass('on');
        }
    }

    function start(){
        initParam();
        mouEvent();
    }

    start();
}

function accrodion(button,sibling,menuBox,child){
    var $btnToggle = null;
    var $acr = null;
    var $menuBox = null;
    var $active = null;

    function initParam(){
        $btnToggle = $(button);
        $menuBox = $btnToggle.closest(menuBox);
    }

    function mouEvent(){
        $btnToggle.on('click', function(e){
            e.preventDefault();
            var $this = $(this);

            if(child == undefined) {
                $acr = $this.siblings(sibling);
                $active = $menuBox.find(sibling + '.on');
            }else {
                $acr = $this.siblings(sibling).find(child);
                $active = $menuBox.find(sibling+' '+ child +'.on');
            }

            acrToggle($this);
            
        });
    }

    function acrToggle(elem){
        if(elem.hasClass('on')){
            elem.removeClass('on');
            $acr.removeClass('on');
            $acr.stop().slideUp(300);

        }else {
            $btnToggle.removeClass('on');
            $active.removeClass('on');
            $active.stop().slideUp(300);

            elem.addClass('on');
            $acr.addClass('on');
            $acr.stop().slideDown(300);
        }
    }

    function start(){
        initParam();
        mouEvent();
    }

    start();
}