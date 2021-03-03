
new Vue({
    el: '#app',
    data: {
        cars: [],
        cale: [],
        date: new Date(),
        workingMonth: new Date().toISOString().slice(0,7),
        days: function(date) {
            date.setMonth(date.getMonth() + 1);
            date.setDate(0);
            return date.getDate();
        }
    },
    mounted: function() {
        axios.get('../admin').then(res => {
            this.cars = res.data[0];
            this.cale = res.data[1];
        });
    },
    methods: {
        changeMonth: function(e) {
            this.workingMonth = e;
        }
    },
    components: {
        'car-table': {
            props: ['id', 'days', 'cale', 'workingmonth'],
            template: `<div>
                <div>
                {{this.id}}
                <table class="table">
                    <tr><th></th><th v-for="i in days">{{ i }}</th></tr>
                    <tr v-for="car in cars" v-bind:id="car.id"><th>{{ car.car_name }}</th>
                    <td v-for="(reservation, key) in makeCalender(car)" v-on:mousedown="mousedown" v-bind:id="key" v-bind:key="key" class="td01">{{ reservation }}</td></tr>
                </table>
                    {{ onClick }}<br>{{ keys }}<br>{{ workingMonth }}:{{this.workingmonth}}
                </div>
                <div class="post-form" v-show="show"　v-bind:style="[pos]">
                    <form method="PUT">
                    <div  class="form-position">
                        <span class="selected-day">{{keys[0]}}日 〜 {{keys[1]}}日</span>
                        <input type="text" v-model="customerName">
                        <input type="submit" v-on:click="click" value="予約">
                    </div>
                    </form>
                </div>
            </div>`,
            data: function() {
                return {
                    cars: this.id,
                    calender: this.cale,
                    reservation: '',
                    customerName: '',
                    selectedCarId: null,
                    date: new Date().toISOString().slice(0,7), // 2021-02 のような文字列
                    currentDate: new Date().toISOString().slice(0,7),
                    workingMonth: this.workingmonth, 
                    keys: [],
                    onClick: {},
                    show: false,
                    selectCell: false,
                    pos: {
                        left: 0,
                        top: 0
                        },
                    makeCalender: function(car) {
                        let result = {};
                        for(let j=0,len=this.calender.length;j<len;j++){
                            if(this.calender[j].y_m === this.workingMonth){
                                if(this.calender[j].car_id === car.id){
                                    for(let i=1,len=this.days+1;i<len;i++){
                                        result[i] = this.calender[j]['_' + i.toString()];
                                    }
                                    return result;
                                }
                            }
                        }
                    }
                };
            },
            methods: {
                mousedown: function(e) {
                    e.target.style.backgroundColor = 'rgba(0,123,255,0.2)';
                    console.log(e)
                    this.selectedCarId = e.path[1].id;
                    this.onClick[Number(e.target.id)] = e.target.outerText;
                    this.keys = Object.keys(this.onClick);
                    if(this.keys.length === 2){
                        let second = e.target;
                        console.log(second);
                        this.keys.sort();
                        this.show = true;
                        this.pos = {
                            top: e.pageY + 'px',
                            left: e.pageX + 'px',
                            position: 'absolute'
                        };
                    }
                    if(this.keys.length === 3){
                        this.keys.splice(1, 1);
                    };
                },
                click: function() {
                    let date = {
                        customerName: this.customerName,
                        currentMonth: this.workingMonth,
                        dateStart: this.keys[0],
                        dateEnd: this.keys[1]
                    };
                    axios.put('../admin/' + this.selectedCarId, date).then(res => console.log(res.data));
                    
                },
            },
            watch: {
                workingmonth: function() {
                    this.workingMonth = this.workingmonth; //親から渡されたpropsは変化しているのでwatchで観測したら更新するようにしている
                },
                id: function() {
                    this.cars = this.id;
                },
                cale: function() {
                    this.calender = this.cale;
                }
            }
        },
        'cars-create': {
            template: `<div class="cars-create">
            <button type="button" v-on:click="onoff" class="btn btn-outline-primary">車両追加</button>
            <div v-show="flag" class="create">
            <form method="POST">
                車種名：<input name="car_name" v-model="carName" type="text"><br>
                ナンバー（4桁）：<input name="car_number" v-model="carNumber" type="number"><br>
                <input type="submit" id="submit" v-on:click="onclick" class="submit">
            </form>
            </div>
            </div>`,
            data: function() {
                return {
                    carName: '',
                    carNumber: null,
                    postData: {
                        car_number: this.carNumber,
                        car_name: this.carName
                    },
                    flag: false,
                };
            },
            methods: {
                onclick: function() {
                    
                    let data = {
                        car_number: this.carNumber,
                        car_name: this.carName
                    }
                    axios.post('../admin', data).then(res => console.log(res.data));
                },
                onoff: function() {
                    if(this.flag) {
                        this.flag = false;
                    } else {
                        this.flag = true;
                    }
                }
            }
        },
        'car-delete': {
            props: ['cars'],
            template: `<div class="car-delete">
                <button type="button" v-on:click="onoff" class="btn btn-outline-primary">車両削除</button>
                <div v-show="flag" class="delete">
                <form method="DELETE">
                    <select v-model="deleteCar">
                        <option v-for="car in cars" v-bind:value="car.id">{{ car.car_name + ' ' + car.car_number }}</option>
                    </select>
                    <input type="submit" value="削除" v-on:click="onclick" class="submit">
                </form>
                </div>
            </div>`,
            data: function() {
                return {
                    deleteCar: '',
                    flag: false,
                }
            },
            methods: {
                onclick: function() {
                    axios.delete('../admin/' + this.deleteCar).then(res => console.log(res.data + '削除'));
                },
                onoff: function() {
                    if(this.flag){
                        this.flag = false;
                    } else {
                        this.flag =true;
                    }
                }
            }
        },
        'current-month': {
            template: `<div class="current-month"><a href="javascript:void(0)" v-if="exist" v-on:click="beforeMonth"><<</a><h2>{{ workingMonth }}月</h2> <a href="javascript:void(0)" v-on:click="nextMonth">>></a></div>`,
            data: function() {
                return {
                    date: new Date(),
                    currentDate: new Date().toISOString().slice(0,7),
                    workingMonth: new Date().toISOString().slice(0,7),
                    calDate: new Date(),
                    exist: false,
                }
            },
            methods: {
                nextMonth: function() {
                    //親にデータを返す処理 workingMonthを変える処理　
                    this.calDate.setMonth(this.calDate.getMonth() + 1);
                    this.workingMonth = this.calDate.toISOString().slice(0,7);
                    this.$emit('change-month', this.workingMonth);
                },
                beforeMonth: function() {
                    //親にデータを返す処理 workingMonthを変える処理
                    this.calDate.setMonth(this.calDate.getMonth() - 1);
                    this.workingMonth = this.calDate.toISOString().slice(0,7);
                    this.$emit('change-month', this.workingMonth);
                }
            },
            watch: {
                workingMonth: function(){
                    if(this.workingMonth > this.currentDate){
                        this.exist = true;
                    } else {
                        this.exist = false;
                    }
                }
            }
        }
    }
});    


