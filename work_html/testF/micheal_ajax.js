var Mr = function(){

    // var li = document.createElement('li');  
    // li.className = 'mui-table-view-cell';  
    // li.innerHTML('<div></div>)
    // $('').append(li)
    // JSON.stringify JSON.parse

    // 打包数据(相同class列的数据 input)
    function test(){
        var vals = [];
       $.each($('input:checkbox:checked'),function(){
           vals.push($(this).val());
       });
   }

   //   obj 种类元素Set
    uppack_data = function(obj){
        var m_data = []
        for (var i=0;i<obj.length;i++)
        {
            m_data.push($(obj[i]).attr('value'))
        }
        return m_data
    }

    var getParamers = function(){
        // var _t = window.location.search.substring(1)
        var _t = window.location.search.substring(1).replace('#','');

        x = _t.split('&')
        _parm = Object()
        for(var i=0;i<x.length;i++)
        {   
            var _t = x[i].split('=')
            if (_t.length==1)
                _parm[_t[-1]] = ''
            else
                _parm[_t[0]]= _t[1]
        }
        return _parm
    }


    var sstorage=window.sessionStorage;
    var saveSesstionStorage = function(key,value){
        sstorage.removeItem(key)
        sstorage.setItem(key,value)
    }
    // 整数转汉字 0~99999
    var numberTochinese = function (value) { 

        var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"]
        var chnUnitChar = ["","十","百","千",'万'];

        function numtocn(value,flag){
            m_value = parseInt(value)
            m_flag = parseInt(flag)
            pre = chnNumChar[m_value]
            back = chnUnitChar[m_flag]
            if (m_value==0)
                back = ''
            return (pre+back)
        }
        var _str = parseInt(value).toString()
        var str = ''
        for (var i=_str.length-1,j=0;i>=0;i--,j++)
        {
            str =str + numtocn(_str[j],i)
        }
        if (str.length>1)
            str = str.replace(/(零+)$/,"")   // 0结尾
        
        function repeat(res){
            if (/(零)\1/.test(res))
                {
                    _res = res.replace(/(零)\1/,"零")
                    return repeat(_res)
                }
            else
                    return res
        }
        str = repeat(str)
        if (str.length<4&&str[0]=='一'&str[1]=='十')
            str = str.replace('一','')
        return str
     }
     // 限制长度
    //  $('.').attr('oninput','if(value.length>5)value=value.slice(0,5);if(value>100)value=100')
     var clearNoNum = function(obj){
            
            if (obj.getAttribute('_id'))
                n = 20
            else if (obj.getAttribute('xznum'))
                n = 3
            else
                n=5
            // alert(n)
        　　obj.value = obj.value.replace(/[^\d.]/g,""); //清除"数字"和"."以外的字符
        　　obj.value = obj.value.replace(/^\./g,""); //验证第一个字符是数字而不是
        　　obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
        　　obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
            reg =  new RegExp("^(\-)*(\\d+)\.(\\d){"+n+"}\.*$")
        　　obj.value = obj.value.replace(reg,'$1$2.$3'); //只能输入两个小数
    };
    var requestData = function(urlstr,parm,successCallback){
        parm['pk'] = 12
        parm['AccessToken']='eEYxcWZNZnIvS3grcDdWL2RpUm9hUEkrcStiOXpMc3UvUWIwRVZaazU2WT0gMTU2MDc1MTU4My43IDc0MTU1NiA4MjVjYmFlMGY3YWE5YmQ4NTQ0ZGY1ODk0MDBkNmNiYzk1MTVmNWIz'
        asyncs = true
        if (parm['async'])
            asyncs = false
        console.log(asyncs)
        $.ajax({
            type:"POST",
            url:urlstr,
            data:parm,
            dataType: "json",
            async:asyncs,    // 同步
            timeout : 120000, //超时时间设置，单位毫秒

            beforeSend: function () {
                // 禁用按钮 提高用户体验
                // $("#submit").attr({ disabled: "disabled" });
            },

            success:function(res){
                saveSesstionStorage('res',JSON.stringify(res))
                if (successCallback)
                    successCallback(res)
            },
            complete:function(res,status){
                _result=eval("("+res.responseText+")");
                if (_result['errcode']!=0)
                {
                    alert(_result['errmsg'])
                }
            },
            error: function (data) {
                console.info("error: " + data.responseText);
            },
         });
    }

    var Nbsp_Number = function(value){
        var _temp = ""
        for (var i=0;i<parseInt(value);i++){
            _temp +='&nbsp;'
        }
        return  _temp
    }
    return {
        requestData:function (urlstr,parm,successCallback) { requestData(urlstr,parm,successCallback) },
        saveSesstionStorage:function (key,value) { saveSesstionStorage(key,value) },
        numberTochinese:function(value){ return numberTochinese(value) },
        Nbsp_Number:function(value){  return Nbsp_Number(value) },
        clearNoNum:function(obj){ clearNoNum(obj)},
        getParamers:function () { return getParamers() },
        sstorage:sstorage,
        uppack_data:function(obj){
            return uppack_data(obj);
        }
    };
}();