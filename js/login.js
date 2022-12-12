window.onload=function(){
    var login=document.querySelector('#login3')
    login.onclick=function(){
        // console.log('this',this)
        var name=document.querySelector('.name').value
        var password=document.querySelector('.password').value
        if(password.trim()==''||name.trim()==''){
            return alert('Please enter a password or enter a phone number')
        }
        const user=JSON.parse(window.localStorage.getItem('user')) || {}
        if(user.phone &&  user.password && user.phone==name && user.password==password){
             alert('login successful')
         return    window.location.href='./main.html'
        }
        alert('login failed,please try again')
    }
}