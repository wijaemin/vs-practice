$(function(){
    refreshProgressbar();
    //이전이나 다음버튼을 누르면 진행상황을 파악하여 게이지 계산
    $(".btn-prev, .btn-next").click(function(){
        //page 중에 보여지는 태그를 찾아서 계산
        //-전체 페이지 수 + 보여지는 페이지 번호
        refreshProgressbar();
    });
    
    function refreshProgressbar(){
        var count=0;
        var index=0;
        $(".page").each(function(idx, el){
            //현재 태그가 표시중이라면
            if($(this).is(":visible")){
                index=idx+1;
            }
            count++;
        });

        var percent=index*100/count;
        $(".progressbar > .gauge").css("width",percent+"%");
    }
});