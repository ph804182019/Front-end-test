var vm = new Vue({
    el:'#app',
    data:{
        time:71,//倒數時間
        numOfItem:10,//商品數量
        sec60:false,//時間閥
        sec0:false,
        btn:'購買',//按鈕名稱
        boxNum:0,//購買數量
        boxCheck:false,//彈窗開合
        wantTo:'我要購買',//彈窗標題
        preOrder:0,//預購數量
        //模式變動0=normal(購買),1=preOrder(預購),2=over(停售)
        mode:0
    },
    mounted: function () {
        this.timeCount()
    },
    methods:{
        timeCount: function(){//時間倒數
            if(this.time>0){//歸零前
                this_=this;
                this.time = this.time - 1;
                if(this.time===59){//59秒外框切換
                    this.sec60 = true;
                }
                count = setTimeout(function(){this_.timeCount()},1000)
            }else if(this.time===0){//歸零
                this.sec0 = true;
                this.btn = '停售';
                this.boxCheck = false;
                this.mode = 2;//切換模式2(停售)
            }
        },
        numPlus: function(){//button'+'
            if(this.mode===0){//模式0(出售)狀態
                if(this.boxNum<this.numOfItem){
                    this.boxNum = this.boxNum + 1;
                }
            }else if(this.mode===1){//模式1(預售)狀態
                if(this.boxNum<99){
                    this.boxNum = this.boxNum + 1;
                }
            }
        },
        numLess: function(){//button'-'
                if(this.boxNum>0){
                    this.boxNum = this.boxNum - 1;
                }
        },
        enterFn: function(){//確認按鈕
            if(this.mode===0){//模式0(出售)狀態
                this.numOfItem = this.numOfItem - this.boxNum;
            }else if(this.mode===1){//模式1(預售)狀態
                this.preOrder = this.preOrder + this.boxNum;
            }
            this.boxNum = 0;//確認後欲購買數量歸零
            if(this.numOfItem == 0){//若確認後商品數量為零，更換模式
                this.btn = '預購';
                this.wantTo = '我要預購';
                this.mode = 1;
            }
        },
        boxChecks: function(){//選單開合，判斷是否為模式2(停售)
            if(this.mode!=2){
                if(this.boxCheck == true){
                    this.boxCheck = false;
                    this.boxNum = 0;
                }else{
                    this.boxCheck = true;
                }
            }
        }
    }
});