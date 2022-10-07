let layer= layui.layer
$(function () {
  // 目的：确保 dom 渲染完毕之后去请求数据
  getUserInfo()
})

// var const 区别
// 由var声明或者关键字function声明的变量会默认存在 window 全局变量上，但是 let / const 不会

function getUserInfo()  {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // headers: {
    //   Authorization: localStorage.getItem('big_news_token') || ''
    // },
    success(res) {
      if (res.code !== 0) return layer.msg(res.message)
      // 按需渲染
      renderAvatar(res)
    

    }
  })
}

const renderAvatar = (res) => {
  if (res.user_pic) {
    $('.text-avatar').hide()
    // $('.userinfo img').css('src',res.user_pic)
    $('.userinfo img').attr('src',res.data.user_pic).show()
  } else {
    $('.layui-nav-img').hide()
    // 显示文字头像，取username属性的第一个字母
    // 取nicknamw和username
    const name = res.data.nickname || res.data.username
    const char = name[0].toUpperCase()
    $('.text-avatar').css('display','flex').html(char).show()

  }
  $('#welcome').html(`欢迎&nbsp;&nbsp;${res.data.username}`)
}

// function renderAvatar(user){
//   // 获取用户的名称
//   let name = user.nickname || user.username
//   // 设置欢迎文本
//   $('#welcome').html('欢迎&nbsp;Z&nbsp;' + name)
//   // 3.按需渲染用户的头像
//   if(user.user_pic !== null){
//     // 3.1 渲染图片
//     $('.layui-nav-img').attr('src',user.user_pic).show()
//     $('.text-avatar').hide()
//   }else{
//     // 3.2 渲染文本头像
//     $('.layui-nav-img').hide()
//     let first = name[0].toUpperCase()
//     $('.text-avatar').html(first).show()
//   }
// }
// 获取用户信息，报错状态码401，就是token问题（要么没给，要么就是过期了）

// 退出
$('#btnLogout').on('click',function(){
  layer.confirm('您确定要退出吗？',{icon:3,title:'提示'},function(index){
    // 1.token要移除
    localStorage.removeItem('big_news_token')
    // 2.页面要跳转到登录页
    location.href = '../../login.html'
    // 3.close固定写法，关闭弹窗
    layer.close(index)
  })
})