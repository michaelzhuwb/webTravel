//@description 生产流程进度-前表单-后表单（材料明细表）
// upd:可修改 view:查看
var GNR_Form =function(){
    // 生产表单前部分（包含进度条）
    
    var template=null   // 使用单例

    template_G = function(obj,step_num,head_title){
        _temp = '\
        <div class="panel panel-info">  \
        <div class="panel-heading">'+head_title+'</div> \
        <div class="panel-body container-fluid"><div class="container-fluid">\
        <div id="NeedID"></div></div>             \
        </div></div>'
        obj.append(_temp)
        flow_step_create($('#NeedID'),step_num)
        progress_create($('#NeedID'),100)
        // return false
    }

    // @param    
    // description: 生成流程步骤
    //      obj=$('id|className'),step = [{'desc':'申请单'},{'desc':'other'}]
    flow_step_create = function (obj,step) { 
        _temp = ''
        var ul = document.createElement('ul')
        ul.id="flow-step"
        ul.className ='row'
        for (var i=0;i<step.length;i++)
        {   var li = document.createElement('li')
                li.className = 'step step'+i+' col-xs-6 col-md-6 '
            li.innerHTML = '<a href=""><span class="stepNum ">'+(i+1)+'</span><span class="desc">'+step[i]['desc']+'</span></a>'
            ul.append(li)
        }
        obj.append(ul)
        $('.step0 .stepNum').addClass('sel') //默认显示第一个单
    }

    // @param
    // description: 生成进度条
    //      obj=$('id|className')  percentValue=百分比值   
    progress_create = function(obj,percentValue=50){
        _temp = '<div class="progress"><div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: '+percentValue+'%"></div><div>'
        obj.append(_temp)
    }

    // @param
    // description: 生成前表单【upd-可修改】
    //      obj=$('id|className')  percentValue=百分比值  
    preForm_create = function(obj_T,obj_H_ID){
        dataSet = get_preForm_data()
        console.log(dataSet)
        obj_T.tmpl(dataSet).appendTo(obj_H_ID)
    }

    get_preForm_data= function(){
        var left_name = ['标书号','议标录入人','议标日期','投标单位名称','集采战略合同价格期限(起始)','报价有效期截止日期','材料发票类型','报价含开发票费用','是否接受银行承兑汇票','银行承兑汇票费用','投标其他说明','二次议标总体下浮','议价备注']
        res = getRes()['data']
        m_element_type = [[1,0],[1,0],[1,0],[0,0],[5,0],[5,0],[2,0],[1,0],[2,0],[1,0],[0,0],[1,1],[4,1]]
        
        // 调整对应值
        for (var key in res)
            if (res[key]==null)
                res[key]=''
        if (res['yhcdhp']==0)
            m_element_type[left_name.indexOf('银行承兑汇票费用')].push(0)   // 进行隐藏
        res['yhcdhp']=(res['yhcdhp']==1)?'是':'否'
        
        // 调整结束
        m_tempValue = [res['biaoshu'],res['yb_people'],res['yb_date'],res['sup_name'],res['start_date'],res['end_date'],res['fp_type'],res['fp_cost'],res['yhcdhp'],res['yhcdhp_cost'],res['memo1'],res['float_per'],res['float_memo']]
        var right_value = []
        // 数据格式 = {m_Data:[{name1:'value1'},{name2:'value2'}],name:[{}]} （对于 tmpl each)
        var dataSet = {};
        var m_data_value= []
        for (var i=0;i<m_tempValue.length;i++)
        {   
            // 过滤空值
            // if(!m_tempValue[i])
            //     continue
            value = Common.sel_control("",m_tempValue[i],m_element_type[i][0], m_element_type[i][1],m_element_type[i][2])
            m_data_value.push({'m_name':left_name[i],'m_value':value})
        }
        dataSet['m_Data']=m_data_value
        return dataSet
    }
// url:// https://lw.szby.cn/data/bid/getQuoteInfo/
// sup_id = 24535
// brand = '品牌1'
    // 获取res
    getRes = function(){
        var param = {
            'sup_id':24535,
            'brand':'品牌1',
            'pk':9,
            'async':'false'
        }
        Mr.requestData('https://lw.szby.cn/data/bid/getQuoteInfo/',param,null,)
        res = JSON.parse(Mr.sstorage['res'])
        console.log(res)
        return res

    }

return{
    init:function(){
        obj_T = $('#t_prev')
        obj_H = $('#NeedID')
        return preForm_create(obj_T,obj_H)
    },
    template_G:function(obj,step_num,head_title){
        if (!template)
            template = template_G(obj,step_num,head_title)
        return template
    },
    getRes:function(){return getRes()}
}

}();