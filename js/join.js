$(function(){
    //상태 객체
    var status ={
        email:false,
        password:false,
        passwordCheck:false,
        nickname:false,
        contact:false,
        birth:false,
        address:false,
        ok:function(){
            return this.email && this.password && this.passwordCheck 
                && this.nickname && this.contact && this.birth && this.address;
        }
    };

    $("[name=email]").blur(function(e){
        var regex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var isValid = regex.test($(e.target).val());

        if(isValid){//형식 유효할 시
            
            $.ajax({
                url:"http://localhost:8080/rest/member/emailCheck",
                method:"post",
                data:{
                    // email : e.target.value // JS
                    email : $(e.target).val() // JQuery
                },
                success : function(response){
                    if(response == "Y"){
                        $(e.target).removeClass("success fail fail2");
                        $(e.target).addClass("success");
                        status.email=true;
                    }
                    else{
                        $(e.target).removeClass("success fail fail2");
                        $(e.target).addClass("fail2");
                        status.email=false;
                    }
                },
                error: function(){
                    alert("서버와 통신이 원활하지 않습니다");
                }
            });
        }
        else{//유효하지 않을 시
            $(e.target).removeClass("success fail fail2");
            $(e.target).addClass("fail");
            status.email =false;
        }

    });
    $("[name=password]").blur(function(){
        var regex=/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$])[A-Za-z0-9!@#$]{8,16}$/;
        var isValid=regex.test($(this).val());
        $(this).removeClass("success fail");
        $(this).addClass(isValid ? "success" : "fail");
        status.password = isValid;
    });
    $("#password-check").blur(function(){
        var pw1=$("[name=password]").val();
        var pw2=$(this).val();

        $(this).removeClass("fail fail2 success");
        if(pw1.length == 0){
            $(this).addClass("fail2");
            status.passwordCheck=false;
        }
        else if(pw1 == pw2){
            $(this).addClass("success");
            status.passwordCheck=true;
        }
        else{
            $(this).addClass("fail");
            status.passwordCheck=false;
        }

    });
    $("[name=nickname]").blur(function(e){
        var regex=/^[ㄱ-ㅎㅏ-ㅣ가-힣0-9]{2,10}$/;
        var isValid=regex.test($(e.target).val());
        
        
        if(isValid){//형식 통과
            $.ajax({
                url:"http://localhost:8080/rest/member/nicknameCheck",
                method:"post",
                data:{
                    nickname : $(e.target).val(),
                },
                success:function(response){
                    if(response == "Y"){
                        $(e.target).removeClass("success fail fail2");
                        $(e.target).addClass("success");
                        status.nickname=true;
                    }
                    else{
                        $(e.target).removeClass("success fail fail2");
                        $(e.target).addClass("fail2");
                        status.nickname=false;
                    }
                },
                error:function(){
                   alert("서버와의 통신이 원활하지 않습니다");
                }
            });
        }
        else{//형식 오류
            $(e.target).removeClass("success fail fail2");
            $(e.target).addClass("fail");
            status.nickname=false;
        }
        status.nickname=isValid;
    });
    $("[name=contact]").blur(function(){
        var regex = /^010[1-9][0-9]{7}$/;
        var contact =$(this).val();
        var isValid=contact.length == 0 || regex.test(contact);
        $(this).removeClass("success fail");
        $(this).addClass(isValid ? "success" :"fail");
        status.contact=isValid;
    });
    $("[name=birth]").blur(function(){
        var regex=/^(19[0-9]{2}|20[0-9]{2})-(((0[13578]|1[02])-(0[1-9]|1[0-9]|2[0-9]|3[01]))|((0[469]|11)-(0[1-9]|1[0-9]|2[0-9]|30))|((02)-(0[1-9]|1[0-9]|2[0-9])))$/;
        var birth = $(this).val();
        var isValid = birth.length == 0 || regex.test(email);
        $(this).removeClass("success fail");
        $(this).addClass(isValid ? "success" :"fail");
        status.birth = isValid;

    });
    $("[name=post],[name=addr1],[name=addr2]").blur(function(){
        var post=$("[name=post]").val();
        var addr1=$("[name=addr1]").val();
        var addr2=$("[name=addr2]").val();

        var isBlank = post.length == 0 && addr1.length == 0 && addr2.length == 0;
        var isFill = post.length > 0 && addr1.length > 0 && addr2.length > 0;

        var isValid = isBlank || isFill;

        $("[name=post],[name=addr1],[name=addr2]").removeClass("success fail");
        $("[name=post],[name=addr1],[name=addr2]").addClass(isValid ? "success" : "fail");

        status.address = isValid;
    });


    //페이지 이탈 방지
    //-window에 beforeunload 이벤트 설정
    $(window).on("beforeunload",function(){
        return false;
    });


    //form 전송할 때는 beforeunload 이벤트를 제거

    $(".join-form").submit(function(e){
        $(".form-input").blur();
        if(!status.ok()){
            e.preventDefault();
            //return false;
        }
        else{
            $(window).off("beforeunload");
        }
    });
});