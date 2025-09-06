var signupForm = document.querySelector('#signupForm')
var signupName = document.querySelector('#signupName')
var signupEmail = document.querySelector('#signupEmail')
var signupPassword = document.querySelector('#signupPassword')
var exist = document.querySelector('#exist')
var success = document.querySelector('#success')
var login = document.querySelector('#login')
var signinEmail = document.querySelector('#signinEmail')
var signinPassword = document.querySelector('#signinPassword')
var invalid = document.querySelector("#invalid")
var userName = document.querySelector('#username')
var logOut = document.querySelector('#logOut')


var users ;

if(localStorage.getItem('allUsers')!==null){
    users = JSON.parse(localStorage.getItem('allUsers'));
}
else{
    users =[];
}

signupForm?.addEventListener('submit',function(e){
    e.preventDefault()
    console.log('hello')
    var user ={
     userName:signupName.value,
     userEmail:signupEmail.value,
     userPassword:signupPassword.value
    }
   if(checkValidation()&&!isExist(users,user)){
    console.log(user)
    users.push(user)
    console.log(users)
    localStorage.setItem('allUsers',JSON.stringify(users))
    success.classList.replace('d-none','d-block')
    setTimeout(function(){
     window.location.href = './index.html'
    },3000)
    clearInputs()
   }
   else{
    success.classList.replace('d-block','d-none')

   }
})


var selectedInputs = document.querySelectorAll('.selectedInput')

console.log(selectedInputs)

for(var i=0;i<selectedInputs.length;i++){
    selectedInputs[i].addEventListener('input',function(eventInfo){
    //  console.log(eventInfo.target.value)
    var inputId = eventInfo.target.id;
    var inputValue = eventInfo.target.value; 
    validateInput(inputId,inputValue)
    })
}

function validateInput(id,value){
var regex ={
    signupName:/^[a-z]{3,8}$/,
    signupEmail:/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/,
    signupPassword:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,

}
var ele = document.getElementById(id)
if(regex[id].test(value)==true){
    console.log('match')
ele.classList.add('is-valid')
ele.classList.remove('is-invalid')
ele.nextElementSibling.classList.replace('d-block','d-none')
return true;
}
else{
    console.log('no match')
    ele.classList.add('is-invalid')
    ele.classList.remove('is-valid')
    ele.nextElementSibling.classList.replace('d-none','d-block')
return false;
}
}
function checkValidation(){
    if(validateInput(signupName.id,signupName.value)
        &&validateInput(signupEmail.id,signupEmail.value)
    &&validateInput(signupPassword.id,signupPassword.value)
    )
    {
        return true
    }
    else{
        return false
    }
}

function clearInputs(){
    signupName.value = '',
    signupEmail.value='',
    signupPassword.value=''
    signupName.classList.remove('is-valid')
    signupEmail.classList.remove('is-valid')
    signupPassword.classList.remove('is-valid')
}


// var testArr =[
//     {    userName:'aya',
//         userEmail:'a@gmail.com',
//         userPassword:'aaaaaa'},
//         {    userName:'sara',
//             userEmail:'s@gmail.com',
//             userPassword:'sss'},
//             {    userName:'mai',
//                 userEmail:'m@gmail.com',
//                 userPassword:'mmmm'}
// ]

// var testObj={userName:'sara',
//     userEmail:'s@gmail.com',
//     userPassword:'sss'}

// signupBtn.onclick = function(){
//     isExist(testArr,testObj)
// }
var index;
function isExist(arr,newObj){
    for(var i=0;i<arr.length;i++){
        if(arr[i].userEmail==newObj.userEmail){
            index= i;
            console.log('email already exist')
            exist?.classList.replace('d-none','d-block')
            return true
        }
        
    }
    console.log('email not exist')
    exist?.classList.replace('d-block','d-none')
    return false
}

login?.addEventListener(('submit'),function(e){
    e.preventDefault()
    console.log('hello')
    var loginObj ={
        userEmail:signinEmail.value,
        userPassword:signinPassword.value
    }
    console.log(isExist(users,loginObj))
    console.log(index)
    if(isExist(users,loginObj)&&loginObj.userPassword==users[index].userPassword){
        console.log('login success')
        localStorage.setItem('userName',users[index].userName)
        invalid.classList.replace('d-block','d-none')
        setTimeout(function(){
            window.location.href = './home.html'
        },2000)

    }
    else{
        console.log('login failed')
        invalid.classList.replace('d-none','d-block')

    }
})
// if(userName){
//     userName.innerHTML += ' '+localStorage.getItem('userName')

// }

userName&&(userName.innerHTML += ' '+localStorage.getItem('userName'))


logOut?.addEventListener('click',function(){
    localStorage.removeItem('userName')
    window.location.href = './index.html'
})