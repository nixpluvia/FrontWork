$(document).ready(function(){

    var $header = $('#header');
    var $moMenu = $('.mo-menu .menu-box .menu > li > a');

    $('#header .gnb-wrap #gnb .menu > li').on('mouseover',function(){
        $header.addClass('on');
    });

    $header.on('mouseleave',function(){
        $header.removeClass('on');
    });


    $(".sitemap-btn").on("click", function(e){
        e.preventDefault();

        $header.addClass('on');

    });

    $('.top').on('click',function(e){
        e.preventDefault();

        $('html,body').animate({scrollTop:$(this.hash).offset().top},800);
    });


    var lastScroll = 0;

    $(window).on('scroll',function(){
        var scroll = $(this).scrollTop();

        if(scroll > 300){
            $('.top').addClass('active');
        }else{
            $('.top').removeClass('active');
        } 

        lastScroll = scroll;
    });


    $(window).on("resize", function(){
        $header.removeClass("on");
        $(".sitemap-wrap").removeClass("active");
        $('body').removeClass('action');
    });

    $(".mo-menu-btn").on("click", function(e){
        e.preventDefault();

        $("#header").addClass("on");
        $('body').addClass('action');

    });

    $(".mo-menu-close").on("click", function(e){
        e.preventDefault();

        $("#header").removeClass("on");
        $('body').removeClass('action');

    });




    $moMenu.on('click',function(e){
        e.preventDefault();
        if($(this).hasClass('active')){
            $moMenu.removeClass('active').siblings('.menu-02').stop().slideUp();
        }else{
            $moMenu.removeClass('active').siblings('.menu-02').stop().slideUp();
            $(this).addClass('active').siblings('.menu-02').stop().slideDown();
        }
    });



    var $footer = $('.footer-wrap .site-wrap');

    $footer.on('click',function(){
        if($footer.hasClass('on')){
            $footer.removeClass('on');
            $('.site-wrap .foot-link').slideUp();
        }else{
            $footer.addClass('on');
            $('.site-wrap .foot-link').slideDown();
        }
    });




});