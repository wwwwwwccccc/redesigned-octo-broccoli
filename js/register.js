$(function(){
    $('.button').on('click',function(){
        console.log('this',this)
        var name1=$('.name1').val()
        var name2=$('.name2').val()
        var password1=$('.password1').val()
        var password2=$('.password2').val()
        if(password1.trim()==''||name1.trim()=='' || name2.trim()=='' || password2.trim()==''){
            return alert('Please enter a password or enter a phone number or enter a username')
        }
        if(password1 !=password2){
            return alert('PLease checkout password,the two passwords are inconsistent')
        }
        var user={
         name:   name1,
          phone : name2,
            password:password1
        }
        window.localStorage.setItem('user',JSON.stringify(user))
        $('.name1').val('')
        $('.name2').val('')
        $('.password1').val('') 
        $('.password2').val('')
        alert('Register successful')
    })
})
