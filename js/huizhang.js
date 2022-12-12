window.onload = function () {
    var aData = [{
        "imgUrl": "image/xiaohui.jpg",
        "proName": " 交大校徽 ",
        "proPrice": "10",
        "proComm": "2000+"
    },
    {
        "imgUrl": "image/xinxi.jpg",
        "proName": " 信院院徽 ",
        "proPrice": "3",
        "proComm": "587"
    },
    ];
    // 存放商品数据
    var carData =JSON.parse(localStorage.getItem('car'))|| [];
    var oBox = document.getElementById("box");
    var oCar = document.getElementById("car");
    var oUl = document.getElementsByTagName("ul")[0];
// 渲染商品
carData && setCar(carData,oCar)
    for (var i = 0; i < aData.length; i++) {
        var oLi = document.createElement("li");
        var data = aData[i];

        oLi.innerHTML += '<div class="pro_img"><img src="' + data["imgUrl"] + '" width="150" height="150"></div>';
        oLi.innerHTML += '<h3 class="pro_name"><a href="#">' + data["proName"] + '</a></h3>';
        oLi.innerHTML += '<p class="pro_price">' + data["proPrice"] + '元</p>';
        oLi.innerHTML += '<p class="pro_rank">' + data["proComm"] + '人购买</p>';
        oLi.innerHTML += '<div class="add_btn">加入购物车</div>';
        oUl.appendChild(oLi);

    }
    var aBtn = getClass(oBox, "add_btn");//获取box下的所有添加购物车按钮
    var number = 0;//初始化商品数量
    for (var i = 0; i < aBtn.length; i++) {
        number++;
        aBtn[i].index = i;
        aBtn[i].onclick = function () {
            // 商品对象
            const obj={...aData[this.index],num:1,checked:false}
            // 查找购物车含有相同商品
          const index= carData.findIndex((item)=>item.proName==obj.proName)

          index<0? carData.push(obj):carData[index].num++;
          localStorage.setItem('car',JSON.stringify(carData))

            setCar(carData,oCar)
            }
    }


// 生成商品
function setCar(data,dom){
    const container=dom.querySelector('.car_container')
    container.innerHTML=''
    data.forEach((item)=>{
        var oDiv = document.createElement("div");
            var data = item
            oDiv.className = "row hid";
            oDiv.innerHTML += `<div class='check left'> <i class='i_check ${data['checked']?'i_acity':''}' id='i_check' οnclick='i_check()' >√</i></div>`;
            oDiv.innerHTML += '<div class="img left"><img src="' + data["imgUrl"] + '" width="80" height="80"></div>';
            oDiv.innerHTML += '<div class="name left"><span>' + data["proName"] + '</span></div>';
            oDiv.innerHTML += '<div class="price left"><span>' + data["proPrice"] + '元</span></div>';
            oDiv.innerHTML += '<div class="item_count_i"><div class="num_count"><div class="count_d">-</div><div class="c_num">'+data.num+'</div><div class="count_i">+</div></div> </div>'
            oDiv.innerHTML += '<div class="subtotal left"><span>' +data['num']* data["proPrice"] + '元</span></div>'
            oDiv.innerHTML += '<div class="ctrl left"><a href="javascript:;">×</a></div>';
            container.appendChild(oDiv);
            var flag = true;
            var check = oDiv.firstChild.getElementsByTagName("i")[0];
            check.onclick = function () {
                // console.log(check.className);
                if (check.className == "i_check i_acity") {
                    check.classList.remove("i_acity");
                    data.checked=false

                } else {
                    check.classList.add("i_acity");
                    data.checked=true
                }
                if(check_all()){
                    checkAll.classList.add('i_acity2')
                }
                 else{
                    checkAll.classList.remove('i_acity2')
                }
                getAmount();

            }
            var delBtn = oDiv.lastChild.getElementsByTagName("a")[0];
            delBtn.onclick = function () {
                var result = confirm("确定删除吗?");
                if (result) {
                    oCar.removeChild(oDiv);
                    number--;
                    getAmount();
                }
            }
            var i_btn = document.getElementsByClassName("count_i");
            for (var k = 0; k < i_btn.length; k++) {
                i_btn[k].onclick = function () {
                    bt = this;
                    //获取小计节点
                    at = this.parentElement.parentElement.nextElementSibling;
                    //获取单价节点
                    pt = this.parentElement.parentElement.previousElementSibling;
                    //获取数量值
                    node = bt.parentNode.childNodes[1];
                    console.log(node);
                    num = node.innerText;
                    num = parseInt(num);
                    num++;
                    data.num=num
                    node.innerText = num;
                    //获取单价
                    price = pt.innerText;
                    price = price.substring(0, price.length - 1);
                    //计算小计值
                    at.innerText = price * num + "元";
                    //计算总计值
                    getAmount();
                }
            }
            //获取所有的数量减号按钮
            var d_btn = document.getElementsByClassName("count_d");
            for (k = 0; k < i_btn.length; k++) {
                d_btn[k].onclick = function () {
                    bt = this;
                    //获取小计节点
                    at = this.parentElement.parentElement.nextElementSibling;
                    //获取单价节点
                    pt = this.parentElement.parentElement.previousElementSibling;
                    //获取c_num节点
                    node = bt.parentNode.childNodes[1];
                    num = node.innerText;
                    num = parseInt(num);
                    if (num > 1) {
                        num--;
                    data.num=num
                    node.innerText = num;
                    //获取单价
                    price = pt.innerText;
                    price = price.substring(0, price.length - 1);
                    //计算小计值		
                    at.innerText = price * num + "元";
                    //计算总计值
                    getAmount();
                    }
                    else{
                        container.removeChild(this.parentElement.parentElement.parentElement)
                    }
                }
            }

            delBtn.onclick = function () {
                var result = confirm("确定删除吗?");
                if (result) {
                    oCar.removeChild(oDiv);
                    number--;
                    getAmount();
                }
            }

        
    })
}
    function getClass (oBox, tagname) {
        var aTag = oBox.getElementsByTagName("*");
        var aBox = [];
        for (var i = 0; i < aTag.length; i++) {
            if (aTag[i].className == tagname) {
                aBox.push(aTag[i]);
            }
        }
        return aBox;
    }


    var index = false;
    var checkAll=document.querySelector('.checkAll')
    checkAll.onclick=function() {
        var flag=check_all()
        var choose=document.querySelectorAll('.car_container i.i_check')
        // carData.forEach(function(item){item.checked=!flag})
        if( this.className!='checkAll i_acity2'){
            choose.forEach(function(item,i){
                item.classList.add('i_acity')
                carData[i].checked=true
            })
            this.classList.add('i_acity2')
        }
        else if(flag && this.className=='checkAll i_acity2'){
            choose.forEach(function(item,i){
                item.classList.remove('i_acity')
                carData[i].checked=false
        })
            this.classList.remove('i_acity2')
        }
        else{
            choose.forEach(function(item){item.classList.remove('i_acity')})
            this.classList.remove('i_acity2')
        }
        getAmount();
    }
    function check_all(){
        return carData.every(function(item,i){return  item.checked})
    }    var index = false;


//进行价格合计
function getAmount () {
    // console.log(ys);
    ns = document.getElementsByClassName("i_acity");
    console.log(ns);
    sum = 0;
    //选中框
    document.getElementById("price_num").innerText = sum;
    for (y = 0; y < ns.length; y++) {
        //小计
        amount_info = ns[y].parentElement.parentElement.lastElementChild.previousElementSibling;
        num = parseInt(amount_info.innerText);
        sum += num;
        document.getElementById("price_num").innerText = sum;
    }
}
}