// 只读
// style='width:55%;background:#CCC;border:none'
// $('input[type="text"].only_read').css({"width":"55%","background":"#CCC";"border":"none"})

var Common = function(){

    // 隐藏
    hidding = function(){
        $('.is_hide').parent().parent().addClass('hidden')
    }

    // 只读
    only_read = function(){
        $('.only_read').attr('readonly',true)
        $('.only_read,.disable').attr('onClick','javascript:return false')
        $('.checked').attr('checked',true)
    }

    // 流程点击后对应选择选择事件 颜色更改
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

    // 输入框监听事件
    input_monitor = function(obj,monitor_fun){
        obj.bind('input propertychange', monitor_fun)
    }



    // 组件
    // m_element_type 分别对应 0~n  是否禁用【0(选中checked)：true 1：flase】
    //      [classname,value,only_read,is_hide] = [类名，值，0:只读|1:可修改,0:隐藏|1:显示]
    span = function (class_name,value,only_read,is_hide) { 
        if (is_hide==0)
            class_name +='is_hide'
        return '<span class="'+class_name+'">'+value+'</span>'
     }
    input_text = function(class_name="",value="",only_read,is_hide){
        if (is_hide==0)
            class_name +='is_hide'
        if (only_read=='0')
            class_name +=" only_read"
        return "<input  style='width:8%' type='text'  class='"+class_name+"' value='"+value+"' />"
    }
    input_radio = function(class_name="",value="",only_read,is_hide){
        if (is_hide==0)
            class_name +='is_hide'
        if (only_read==0)
            class_name +='  disabled disable checked'
        return "<input  type='radio' class='"+class_name+"' /> "+value+""
    }
    input_checkbox = function(class_name="",value="",only_read,is_hide){
        if (is_hide==0)
            class_name +='is_hide'
        if (only_read==0)
            class_name +='  disabled disable checked'
        return "<input type='checkbox' class='"+class_name+"' /> "+value+""
    }
    textarea = function(class_name="",placeholder="",only_read,is_hide,row=3,col=20){
        if (is_hide==0)
            class_name +='is_hide'
        return "<textarea class='"+class_name+"' rows='"+row+"' cols='"+col+"' placeholder='"+placeholder+"'></textarea>" 
    }
    datetimer = function(class_name="",value="",only_read,is_hide){
        // if (is_hide==0)
        //     class_name +='is_hide'
        return "<div class='input-append date end form_datetime'>\
                                    <input class='"+class_name+"' size='16' type='text' value='"+value+"'readonly disable>"+   
                                    "<span class='add-on'><i class='icon-th glyphicon glyphicon-calendar'></i></span>\
                                    </div>"

    }

    // 新模式控件 .6.17
    input = function (class_name,property="",type='text') {
        _temp = "<input type='"+type+"' class='"+class_name+"' "+property+" />"
        return _temp
      }


    // 组合控件 
    group_control = function(){
        
      } 

    // 选择对应控件
    sel_control = function(class_name="",value="",c_type,is_disable,is_hide)
    {
        if (c_type==0)
            return span(class_name,value,is_disable,is_hide)
        if (c_type==1)
            return input_text(class_name,value,is_disable,is_hide)
        if (c_type==2)
            return input_radio(class_name,value,is_disable,is_hide)
        if (c_type==3)
            return input_checkbox(class_name,value,is_disable,is_hide)
        if (c_type==4)
            return textarea(class_name,value,is_disable,is_hide)
        if (c_type==5)
            return datetimer(class_name,value,is_disable,is_hide)      
    }
    return{
        init : function(){
            step_click(); // 流程点击后对应选择选择事件 
            // active_datetimer();  // 激活日期控件
            only_read();    // 只读
            hidding();  // 隐藏
            
        },
        sel_control:function(class_name,value,c_type,is_disable,is_hide){
            return sel_control(class_name,value,c_type,is_disable,is_hide)
        },
        input_monitor:function(obj,monitor_fun){
            input_monitor(obj,monitor_fun);
        }
    };
}();
