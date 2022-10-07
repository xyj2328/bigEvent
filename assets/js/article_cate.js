$(function(){
  const layer = layui.layer
  loadCateList()

  // 加载分类列表
  function loadCateList() {
    $.ajax({
      method:'GET',
      url:'/my/cate/list',
      success(res){
        if(res.code !== 0) return layer.msg('获取分类列表失败')
        const html = template('tpl-cate',res)
        $('tbody').append(html)
      }
    })
  }

  $('#btnAdd').on('click',function(){
    // 打开弹窗
    layer.open({
      type:1,
      title:'添加分类名称',
      area:['500px','260px'],
      content:$('#addDialog').html()
    })
  })
})