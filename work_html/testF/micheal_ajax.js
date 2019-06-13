var Mr = function(){

    // var li = document.createElement('li');  
    // li.className = 'mui-table-view-cell';  
    // li.innerHTML('<div></div>)
    // $('').append(li)
    // JSON.stringify JSON.parse

    // 打包数据(相同class列的数据 input)
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
    // 整数转汉字 0~9999
    var numberTochinese = function (value) { 
        var chnNumChar = ["零","一","二","三","四","五","六","七","八","九"]
        var chnUnitChar = ["","十","百","千"];
        var _str = parseInt(value).toString()
        var str = ''
        for(var j=_str.length;j>0;j--)
        {
            str +=_str[j-1]
        }
        sstr = ''
        for (var i=str.length;i>0;i--)
        {
            sstr +=chnNumChar[parseInt(str.charAt(i-1))]
            if (chnUnitChar[i-1])
                sstr+=chnUnitChar[i-1]
        }
        // alert(sstr)
        return sstr
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
            complete:function(res,status){
                _result=eval("("+res.responseText+")");
                if (_result['errcode']!=0)
                {
                    alert(_result['errmsg'])
                }
            },
            success:function(res){
                saveSesstionStorage('res',JSON.stringify(res))
                if (successCallback)
                    successCallback(res)
            }
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