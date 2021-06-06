$(document).ready(function(){
    // var $header = $('#header');
    // var $gnb = $('.gnb');
    // var $gnbMenu = $('.gnb .menu-01 > li');

    // function gnbToggle(){
    //     if($header.hasClass('on')){
    //         $header.removeClass('on');
    //         $gnb.removeClass('on');
    //         $gnb.css('height', 80 + 'px');
    //     }
    //     else {
    //         $header.addClass('on');
    //         $gnb.addClass('on');
    //         $gnb.css('height', 380 + 'px');
    //     }
    // }

    // $gnbMenu.on('mouseenter', function(){
    //     var $this = $(this);
    //     gnbToggle();
    //     $gnbMenu.removeClass('on');
    //     $this.addClass('on');
    // });

    // $gnbMenu.on('mouseleave', function(){
    //     gnbToggle();
    // });
    fullMenu('.gnb .menu-01 > li','.gnb','#header',80,330);

    modalPop('.btn-sitemap', '#header .sitemap');
});


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

function modalPop(button,menuBox){
    var $btnToggle = null;
    var $menuBox = null;
    var $body = null;

    function initParam(){
        $btnToggle = $(button);
        $menuBox = $(menuBox);
        $body = $('body');
    }

    function mouEvent(){
        $btnToggle.on('click', function(){
            toggle();
        });
    }

    function toggle(){
        if($menuBox.hasClass('modal-on')){
            $menuBox.removeClass('modal-on');
            $body.removeClass('on');
        }else {
            $menuBox.addClass('modal-on');
            $body.addClass('on');
        }
    }

    function start(){
        initParam();
        mouEvent();
    }

    start();
}