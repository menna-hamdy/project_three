
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let Login = document.querySelector(".Login");

Login.onclick = function(f) {
    f.preventDefault();

    // جلب القيم من localstorage
    let userEmail = localStorage.getItem("email").trim();
    let userPassword = localStorage.getItem("password").trim();
    console.log(userEmail)

    // التحقق من الحقول الفارغة
   if (userEmail && userPassword){
     if (email.value.trim() === userEmail && password.value.trim() === userPassword) {
        alert("sucessful Data");
       setTimeout(() => {
        window.location="index.html"
       }, 1500);
    }
    else{
            if(email.value.trim() != userEmail && password.value.trim() != userPassword){
                   alert("wrong in username && password")}
            else if(email.value.trim() != userEmail ){
                   alert("wrong in Email")}
            else{
                alert("wrong in password")
            }
        }
   }else{
    alert("Not found Data ,please sign up")
   }
}