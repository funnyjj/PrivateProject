let offset = 0,limit=10,total=0;
let url = window.location.href;
let indexReg = /\/vote\/index/;
let registerReg = /\/vote\/signup/;

let voteFn = {
    formatUsers(data){
        return data.map((item,index)=>(
            `<li>
               		    <div class="head">
               		        <a href="#"><img src="${item.head_icon}" alt=""></a>
               		    </div>
               		    <div class="up">
               		    	<div class="vote">
               		    		<span>${item.vote}票</span>
               		    	</div>
               		    	<div class="btn">
               		    		投TA一票
               		    	</div>
               		    </div>
               		    <div class="descr">
               		        <div>
                               <span>${item.username}</span>
                               <span>|</span>
                               <span>编号#${item.id}</span>
                             </div>
               		        <p>${item.description}</p>
               		    </div>
               		</li>`
        )).join('');
    },
    //解构赋值
    request({url,method="GET",data={},dataType="json",callback}){
        $.ajax({
            url,method,data,dataType,success:callback
        })
    },
    initIndexData(){
        voteFn.request({
            url:`/vote/index/data?limit=${limit}&offset=${offset}`,
            callback:function (res) {
                total = res.data.total;
                if(res.errno==0){
                    let data = res.data.objects;
                    data = voteFn.formatUsers(data);
                    $('.coming').html(data);
                }
            }
        });
        // window.onscroll = ()=>{
        //     let scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //     let winH = document.documentElement.clientHeight || document.body.clientHeight;
        //     let conH = document.documentElement.offsetHeight|| document.body.offsetHeight;
        //     if(scrollTop+winH+10>=conH){
        //         offset+=limit;
        //         if(offset<=total){
        //             voteFn.request({
        //                 url:`/vote/index/data?limit=${limit}&offset=${offset}`,
        //                 callback:function (res) {
        //                     if(res.errno==0){
        //                         let data = res.data.objects;
        //                         data = voteFn.formatUsers(data);
        //                         $('.coming').append(data);
        //                     }
        //                 }
        //             });
        //
        //         }
        //
        //     }
        // }
        let loadObj = {
            callback:function (load) {
                offset+=limit;
                if(offset<=total){
                    voteFn.request({
                        url:'user.json',
                        callback:function (res) {
                            if(res.errno==0){
                                let data = res.data.objects;
                                data = voteFn.formatUsers(data);
                                setTimeout(function(){
                                    $('.coming').append(data);
                                    load.reset();
                                }, 1000);
                            }else{
                                load.complete();
                                setTimeout(function(){
                                    load.reset();
                                }, 1000);
                            }
                        }
                    })
                }
            }
        };
        loadMore(loadObj)
    },

};
$(function () {
    //初始化首页数据
    ininRegiter(){
        $('.rebtn').click(function(){
            let username =$(".username").val
        })
    }
    if(indexReg.test(url)){
        voteFn.initIndexData();
    }else if(registerReg.test(url)){

    }


});
