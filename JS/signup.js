let fname = document.querySelector(".fname");
let lname = document.querySelector(".lname");
let Email = document.querySelector(".email");
let Password = document.querySelector(".password");
let Register = document.querySelector(".Register");

Register.onclick = function(e) {
    e.preventDefault();

    // جلب القيم من localstorage
    let firstName = fname.value.trim();
    let lastName = lname.value.trim();
    let userEmail = Email.value.trim();
    let userPassword = Password.value.trim();

    // التحقق من الحقول الفارغة
    if (firstName === "" || lastName === "") {
        alert("Please Fill Data");
    } else if (userEmail === "" || userPassword === "") {
        alert("This Field is important");
    }
    // التحقق من الإيميل
    else if (!/[#@&~:.]/.test(userPassword)) {
    alert("This password not suitable");
}

    // التحقق من password
    else if (!userEmail.includes("@")) {
        alert("This email not suitable");
    }
    else {
         alert("Account Created Successfuly");
        // حفظ البيانات
        localStorage.setItem("firstname", firstName);
        localStorage.setItem("lastname", lastName);
        localStorage.setItem("email", userEmail);
        localStorage.setItem("password", userPassword);

        // إعادة التوجيه بعد 1.5 ثانية
        setTimeout(() => {
            window.location = "login.html";
        }, 1500);
    }
}

// localStorage.clear()