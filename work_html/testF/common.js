var Common = function(){
    // 流程点击后对应选择选择事件 
    step_click = function(){
        $('.step').click(function(){
            var _temp = parseInt($(this).find('.stepNum').text())-1
            $('#flow-step .step .stepNum').removeClass('sel')
            $('#flow-step .step'+_temp+' .stepNum').addClass('sel')
            return false    // 阻止页面再次刷新
        })
    }

    // 激活日期控件
    active_datetimer = function (obj=$('.form_datetime')) { 
        obj.datetimepicker({
            todayHighlight:true,
            todayBtn: 'linked',
            keyboardNavigation:true,
            autoclose:true,
            language:'zh-CN',
            format:'yyyy-mm-dd',
            daysOfWeekHighlighted:'0,6',
            minView:2
        }); 
     }

    // 组件
    // m_element_type 分别对应 0~n  是否禁用【0：true 1：flase】
    span = function (class_name="",value="") { 
        return '<span class="'+class_name+'">'+value+'</span>'
     }
    input_text = function(class_name="",value=""){
        return "<input type='text' class='"+class_name+"' value='"+value+"' />"
    }
    input_radio = function(class_name="",value=""){
        return "<input type='radio' class='"+class_name+"' /> "+value+""
    }
    input_checkbox = function(class_name="",value=""){
        return "<input type='checkbox' class='"+class_name+"' /> "+value+""
    }
    textarea = function(class_name="",placeholder="",row=3,col=20){
        return "<textarea class='"+class_name+"' rows='"+row+"' cols='"+col+"' placeholder='"+placeholder+"'></textarea>" 
    }
    datetimer = function(class_name="",value=""){
        "<div class='input-append date end form_datetime'>\
                                    <input class='"+class_name+"' size='16' type='text' value='"+value+"'readonly disable>"+   
                                    "<span class='add-on'><i class='icon-th glyphicon glyphicon-calendar'></i></span>\
                                    </div>"

    }

    // 选择对应控件
    sel_control = function(class_name="",value="",c_type,is_disable="")
    {
        if (c_type==0)
            return span(class_name,value)
        if (c_type==1)
            return input_text(class_name,value)
        if (c_type==2)
            return input_radio(class_name,value)
        if (c_type==3)
            return input_checkbox(class_name,value,c_type,is_disable)
        if (c_type==4)
            return textarea(class_name,value)
        if (c_type==5)
            return textarea(class_name,value)      
    }
    return{
        init : function(){
            step_click(); // 流程点击后对应选择选择事件 
        }
    };
}();
