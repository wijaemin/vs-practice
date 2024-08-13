function checkTitle(){
    var input = document.querySelector("[name=title]");
    // var regex= /^.{1,100}$/;

    var isValid = input.value.length > 0 && input.value.length <= 100;
    input.classList.remove("fail");
    if(isValid ==false){
        input.classList.add("fail");
        return false;
    }
    return true;
}

function checkContent(){
    var textarea = document.querySelector("[name=content]");

    var isValid = textarea.value.length > 0 && textarea.value.length <= 1000;

    var len = document.querySelector(".len");

    len.classList.remove("red");
    len.textContent=textarea.value.length;
    textarea.classList.remove("fail");
    if(!isValid){
        textarea.classList.add("fail");
        len.classList.add("red");
        return false;
    }
    return true;
}

function checkForm(){
    var r1=checkTitle();
    var r2=checkContent();

    return r1 && r2;
}