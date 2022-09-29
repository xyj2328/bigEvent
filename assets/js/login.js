$(function(){
  // 点击去注册
  $('#link_reg').on('click',function(){
    $('.login-wrap').hide()
    $('.reg-wrap').show()
  })
  // 点击去登录
  $('#link_login').on('click',function(){
    $('.reg-wrap').hide()
    $('.login-wrap').show()
  })

  // 从layui中获取
  let form = layui.form
  let layer = layui.layer
  form.verify({
    // 添加自定义规则
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    repwd:function(value){
      // 拿到密码框和再次确认密码
      if($('#password').val() !==value ) {
        return '两次密码不一致，请重新输入'
      }
    } 
  })
  
  // 给注册表单添加提交事件(会刷新浏览器)
  $('#form_reg').on('submit',function(e){
    // 阻止默认提交动作
    e.preventDefault()
    // 发请求
    $.ajax({
      method:'POST',
      url:'/api/reg',
      // data: JSON.stringify({   //可以将格式转成字符串
      //   username:$('#form_reg [name=username]').val(),
      //   password:$('#form_reg [name=password]').val(),
      //   repassword:$('#form_reg [name=repassword]').val(),
      // }),
      data:$(this).serialize(),
      success(res){
        if(res.code !== 0) return layer.msg(res.message)
        console.log('注册成功')
        // 模拟人的点击行为
        $('#link_login').click()
      }
    })
  })
  // http://big-event-vue-api-t.itheima.net

  // Content-Type:'application/x-www-form-urlencoded' ——> key1=value1&key2

  $('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
      method:'POST',
      url:'/api/login',
      data:$(this).serialize(),
      success(res){
        if(res.code !== 0) return layer.msg(res.message)
        // token令牌的意思
        localStorage.setItem('big_news_token', res.token)
        // 固定写法：bearer token字符串 ，bearer 译为持票人拿着token去请求
        location.href = '/index.html'
      }
    })
  })

})