var dateResult;

$(document).ready(function(){
    $.datepicker.setDefaults({
        dateFormat: 'yy-mm-dd',
        prevText: '이전 달',
        nextText: '다음 달',
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        dayNames: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        showMonthAfterYear: true,
        yearSuffix: '년',

    });

    $( ".datepicker" ).datepicker({
        showOn: "button",
        buttonText: "Select Date",
        beforeShow: function(){
            if ($('#ui-datepicker-div').hasClass('hide-days')){
                $('#ui-datepicker-div').removeClass('hide-days');
            }
        }
    });

    $( "#datepicker-1" ).datepicker({
        onSelect: function (dateText, inst) {
            dateResult = dateText;

            $("#datepicker-2").datepicker( "option", "minDate", dateText );
        }
    });

    $( "#datepicker-2" ).datepicker({
        onSelect: function (dateText, inst) {
            dateResult = dateText;

            $("#datepicker-1").datepicker( "option", "maxDate", dateText );

        }
    });


    

    var datepicker_month = {
        showOn: "button",
        buttonText: "Select Date",
        currentText: "이번달",
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        yearRange: 'c-99:c+99',
        showOtherMonths: true,
        selectOtherMonths: true,
    }

    datepicker_month.closeText = "선택";
    datepicker_month.dateFormat = "yymm";
    datepicker_month.onClose = function (dateText, inst) {
        var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
        $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
        $(this).datepicker('setDate', new Date(year, month, 1));
        //console.log($( ".datepicker_month").val());
    }

    datepicker_month.beforeShow = function () {
        var selectDate = $(".datepicker_month").val().split("-");
        var year = Number(selectDate[0]);
        var month = Number(selectDate[1]) - 1;
        $(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
        console.log(44444);
        $('#ui-datepicker-div').addClass('hide-days');
        // $('.ui-datepicker-calendar').css('display', 'none');
    }
    

    $( ".datepicker_month").datepicker(datepicker_month);
});