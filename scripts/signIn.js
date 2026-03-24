const validateCredential=()=>{
    const usernameField=document.getElementById("username-input");
    const usernameValue=usernameField.value;
    const passField=document.getElementById("password-input");
    const passValue=passField.value;
    if(usernameValue === "admin" && passValue === "admin123"){
        window.location.assign("mainPage.html");
    }else{
        return;
    }
}