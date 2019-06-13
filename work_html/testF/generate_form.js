//@description 生产流程进度-前表单-后表单（材料明细表）
// upd:可修改 view:查看
var GNR_Form =function(){
    // 生产表单前部分（包含进度条）
    
    var template=null   // 使用单例

    template_G = function(obj,step_num,head_title,use_flow_step=true){
        _temp = '\
        <div class="panel panel-info">  \
        <div class="panel-heading">'+head_title+'</div> \
        <div class="panel-body container-fluid"><div class="container-fluid">\
        <div id="NeedID"></div></div>             \
        <div class="panel panel-default"><div class="panel-heading">材料明细表单</div><div class="panel-body"><div id="matT"></div></div>\
        </div></div>'
        obj.append(_temp)
        if (use_flow_step){
            flow_step_create($('#NeedID'),step_num)
            progress_create($('#NeedID'),100)
        }

        return false
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
    // description: 生成表单【upd-可修改】
    //      obj_T=$('id|className') tmpl-ID  obj_H_ID-targetID
    Form_create = function(dataSet,obj_T,obj_H_ID){
        obj_T.tmpl(dataSet).appendTo(obj_H_ID)
    }

    // 获取前表单数据
    get_preForm_data= function(){
        var left_name = ['标书号','议标录入人','议标日期','投标单位名称','集采战略合同价格期限(起始)','报价有效期截止日期','材料发票类型','报价含开发票费用','是否接受银行承兑汇票','银行承兑汇票费用','投标其他说明','二次议标总体下浮','议价备注']
        res = getRes()['data']
        m_element_type = [[1,0],[1,0],[1,0],[0,0],[5,0],[5,0],[2,0],[1,0],[2,0],[1,0],[0,0],[1,1],[4,1]]
        m_element_type[left_name.indexOf('银行承兑汇票费用')] = [[[3,0],[1,0],[3,0],[1,0],[3,0],[1,0]]]
        // 调整对应值 ---
        for (var key in res)
            if (res[key]==null)
                res[key]=''
        if (res['yhcdhp']==0)
            for (var i=0;i<m_element_type[left_name.indexOf('银行承兑汇票费用')][0].length;i++)
                m_element_type[left_name.indexOf('银行承兑汇票费用')][0][i].push(0);   // 进行隐藏
        else
            {
                // res['yhcdhp_cost'] = [{''}]
                var __
            }
        res['yhcdhp']=(res['yhcdhp']==1)?'是':'否'
        
        // 调整结束
        m_tempValue = [res['biaoshu'],res['yb_people'],res['yb_date'],res['sup_name'],res['start_date'],res['end_date'],res['fp_type'],res['fp_cost'],res['yhcdhp'],res['yhcdhp_cost'],res['memo1'],res['float_per'],res['float_memo']]
        var right_value = []
        // 数据格式 = {m_Data:[{name1:'value1'},{name2:'value2'}],name:[{}]} （对于 tmpl each)
        var dataSet = {};
        var m_data_value= []

        // 银行承兑汇票
        m_yhcdhp_v = ['三个月','半年','一年']
        for (var i=0;i<m_tempValue.length;i++)
        {   
            // 过滤空值
            // if(!m_tempValue[i])
            //     continue
            var value = ''
            // 针对包含多个组件情况 type [,]变为 [[[],[],[],..]]
            if (m_element_type[i].length==1)
            {
                m_temp_type = m_element_type[i][0]  // m_temp_type长度决定了有多少个控件
                for (var _i=0;_i<m_temp_type.length;_i++)
                {   
                    if ((left_name[i].indexOf('银行承兑汇票费用'))!=-1)
                    {
                        if (((_i+1)%2)!=0)
                            {
                                if (res[('is_sel'+(_i+1)+'')])
                                    value += Common.sel_control("",m_yhcdhp_v[parseInt(_i/2)],m_temp_type[_i][0], m_temp_type[_i][1],m_temp_type[_i][2])
                            }   
                        else
                            {   
                                value += Common.sel_control("",res[('cdhp_per'+_i+'')],m_temp_type[_i][0], m_temp_type[_i][1],m_temp_type[_i][2])
                            }  
                    }     
                }
                console.log('value')
                console.log(value)
            }
            else
                value = Common.sel_control("F"+i+"",m_tempValue[i],m_element_type[i][0], m_element_type[i][1],m_element_type[i][2])
            m_data_value.push({'m_name':left_name[i],'m_value':value})
        }
        dataSet['m_Data']=m_data_value
        return dataSet
    }

    // @param
    // description: 获取后表单【材料明细表】数据
    //      obj_T=$('id|className') tmpl-ID  obj_H_ID-targetID
    get_matForm_data = function(){
        res = JSON.parse(Mr.sstorage['res'])
        header = res['mat_header']
        m_header_name = []
        m_uppack_head = ['id','zb_mxid','','']
        for (var i=0;i<header.length;i++)
        {   
            if(header[i]['type']==1)
                continue
            m_name = header[i]['name']
            m_id = header[i]['id']
            if (m_name=='议标后综合单价')
                m_uppack_head[2] = m_id
            if (m_name=='议标后金额')
                m_uppack_head[3] = m_id
            m_header_name.push(m_name)
        }
        Mr.saveSesstionStorage('m_uppack_head',JSON.stringify(m_uppack_head))

        m_data_value =  {}
        m_data_value['m_Head']=m_header_name

        m_rows = res['mat_rows']  
        var temp_value = []
        var m_temp = 0
        var m_id_zb_mixid = [] //记录每行数据id 招标明细id
        for (var i=0;i<m_rows.length;i++){
            _m_rows = m_rows[i]
            zone = [_m_rows['zone']]
            temp_value.push({'m_data':zone})
            for (var j=0;j<_m_rows['data'].length;j++)
            {   
                m_temp++
                _temp_value = _m_rows['data'][j]
                // 记录每行数据id 招标明细id
                m_id_zb_mixid.push([_temp_value[0],_temp_value[1]])

                _temp_value.shift()
                _temp_value.shift()
                // 材料数量
                mat_num = _temp_value[4]

                // src_price 
                src_price = _temp_value[7]

                _temp_value[9] = Common.sel_control("full_width yb_total_price ' temp='"+(m_temp)+"' mat_num='"+mat_num+"' src_price='"+src_price+"",'',1,1)
                _temp_value[10] = Common.sel_control("only_read full_width yb_amount ' temp='"+(m_temp)+"'\"",'',1,0)
                
                temp_value.push({'m_data':_temp_value})
            }
        }

        Mr.saveSesstionStorage('m_id_zb_mixid',JSON.stringify(m_id_zb_mixid))
        m_data_value['m_matRows'] = temp_value
        // {m_matRows:[{m_data:['zone']},{m_data:[,value1,value2]},{m_data:[,value3,]}]}
        return m_data_value
    }


    // 创建按钮组
    buttons_create = function () { 
        _temp = '<div class="well btngroup" style="width:100%;text-align:center" >\
        <button id="zancun" type="button" class="btn btn-primary">暂存</button>\
        <button id="next_step" type="button" class="btn btn-success">下一步</button>\
        <button class="back_list" type="button" class="btn btn-default">返回列表</button>\
    </div>'
        return _temp
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
        dataSet = get_preForm_data()
        Form_create(dataSet,obj_T,obj_H)

        // 材料明细表
        obj_T = $('#t_mat')
        obj_H = $('#matT')
        dataSet = get_matForm_data()
        Form_create(dataSet,obj_T,obj_H)

        $('#content').append(buttons_create())
    },
    template_G:function(obj,step_num,head_title,use_flow_step){
        if (!template)
            template = template_G(obj,step_num,head_title,use_flow_step)
        return template
    },
    getRes:function(){return getRes()}
}

}();