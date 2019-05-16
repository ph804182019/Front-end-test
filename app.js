var vm = new Vue({
    el:'#app',
    data:{
        time:71,
        numOfItem:10,
        sec60:false,
        sec0:false,
        btn:'購買',
        boxNum:0,
        boxCheck:false,
        wantTo:'我要購買',
        preOrder:0,
        //0=normal,1=preOrder,2=over
        mode:0
    },
    mounted: function () {
        this.timeCount()
    },
    methods:{
        timeCount: function(){
            if(this.time>0){
                this_=this;
                this_.time = this_.time - 1;
                if(this_.time==59){
                    this_.sec60 = true;
                }
                count = setTimeout(function(){this_.timeCount()},1000)
            }else if(this.time==0){
                this.sec0 = true;
                this.btn = '停售';
                this.boxCheck = false;
                this.mode = 2;
            }
        },
        numPlus: function(){
            if(this.mode==0){
                if(this.boxNum<this.numOfItem){
                    this.boxNum = this.boxNum + 1;
                }
            }else if(this.mode==1){
                if(this.boxNum<99){
                    this.boxNum = this.boxNum + 1;
                }
            }
        },
        numLess: function(){
            if(this.mode==0){
                if(this.boxNum>0){
                    this.boxNum = this.boxNum - 1;
                }
            }
        },
        enterFn: function(){
            if(this.mode==0){
                this.numOfItem = this.numOfItem - this.boxNum;
            }else if(this.mode==1){
                this.preOrder = this.preOrder + this.boxNum;
            }
            this.boxNum = 0;
            if(this.numOfItem == 0){
                this.btn = '預購';
                this.wantTo = '我要預購';
                this.mode = 1;
            }
        },
        boxChecks: function(){
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