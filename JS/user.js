let login=document.querySelector(".login")
let signup=document.querySelector(".signup")
// console.log(login,signup)
let user_info=document.querySelector(".user_info")
let user=document.querySelector("#user")
if (localStorage.getItem("firstname")){
    login.style.display="none"
    signup.style.display="none"
    // login.remove()
    // signup.remove()
    user_info.style.display="flex"
    user.innerHTML="Hello,"+localStorage.getItem("firstname")
} else {
    login.style.display = "inline-block";   
    signup.style.display = "inline-block"; 
    user_info.style.display = "none";
}
let logOutBtn = document.querySelector(".logout")
logOutBtn.addEventListener("click", function (){
    localStorage.clear();
    setTimeout(() => {
        window.location = "signup.html";
    } , 1500)
})

// ===============================================================================================================

