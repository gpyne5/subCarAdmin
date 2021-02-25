
let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            console.log('接続成功');
            let data = JSON.parse(xhr.responseText);
            console.log(data);
            new Vue({
                el: '#app',
                data: {
                    cars: data[0],
                    cale: data[1],
                    date: new Date(),
                    current: new Date().getMonth() + 1,
                    days: function(date) {
                        date.setMonth(date.getMonth() + 1);
                        date.setDate(0);
                        return date.getDate();
                    }
                },
                components: {
                    'car-table': {
                        props: ['id', 'days', 'cale'],
                        template: `<div>
                            <div>
                                <tr><th></th><th v-for="i in days">{{ i }}</th></tr>
                                <tr v-for="car in this.cars" v-bind:id="car.id"><th>{{ car.car_name }}</th>
                                <td v-for="(reservation, key) in makeCalender(car)" v-on:mousedown="mousedown" v-bind:style="{ backgroundColor: 'white' }" v-bind:id="key" v-bind:key="key">{{ reservation }}</td></tr>
                                {{ onClick }}<br>{{ keys }}
                            </div>
                            <div class="post-form" v-show="show"　v-bind:style="[pos]">
                                <form method="GET">
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
                                date: new Date().toISOString().slice(0,7).replace('-','_'), // 2021_02 のような文字列
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
                                    //いずれif(2021-02 === current)みたいな処理を追加
                                    for(let j=0,len=this.calender.length;j<len;j++){
                                        console.log(car.id);
                                        if(this.calender[j].car_id === car.id){
                                            for(let i=1,len=this.days+1;i<len;i++){
                                                result[i] = this.calender[j]['_' + i.toString()];
                                            }
                                            return result;
                                        }
                                    }
                                }
                                    
                            };
                        },
                        methods: {
                            mousedown: function(e) {
                                this.selectedCarId = e.path[1].id;
                                this.onClick[Number(e.target.id)] = e.target.outerText;
                                this.keys = Object.keys(this.onClick);
                                if(this.keys.length === 2){
                                    this.keys.sort();
                                    this.show = true;
                                    this.pos = {
                                        top: e.pageY + 'px',
                                        left: e.pageX + 'px',
                                        position: 'absolute'
                                    };
                                }
                            },
                            click: function() {
                                //admin/{id}/edit/? で更新できる
                                xhr.open('GET', '../admin/' + encodeURIComponent(this.selectedCarId) + '/edit/?customerName='
                                    + encodeURIComponent(this.customerName) + '&currentMonth=' + encodeURIComponent(this.date) + '&dateStart=' +
                                    encodeURIComponent(this.keys[0]) + '&dateEnd=' + encodeURIComponent(this.keys[1]), true);
                                xhr.send(null);
                            }
                        }
                        
                    },
                    'reservation-zone': {
                        props: ['cars'],
                        template: `<div id="reservation-zone">
                            <form id="form" method="GET">
                                <select v-model="selectCar">
                                    <option v-for="(car, key) in carInfo(this.cars)" v-bind:value="key">{{ car }}</option>
                                </select>
                                <br>
                                <label for="customerName">お客様名：<input type="text" name="customerName" v-model="customerName"></label>
                                
                                <br>
                                <input type="date" v-model="dateStart" id="dateStart">~<input type="date" v-model="dateEnd" id="dateEnd">
                                <input type="submit" id="submit" v-on:click="onclick">
                            </form>
                            </div>`,
                        data: function() {
                            return {
                                carInfo: function(cars) {
                                    let result = {};
                                    for(let i=0,len=cars.length;i<len;i++){
                                        result[cars[i].id] = (cars[i].car_name + ' ' + cars[i].car_number);
                                    }
                                    return result;
                                },
                                selectCar: '',
                                customerName: '',
                                dateStart: 0,
                                dateEnd: 0,
                            };
                        },
                        methods: {
                            onclick: function() {
                                //admin/{id}/edit/? で更新できる
                                xhr.open('GET', '../admin/' + encodeURIComponent(this.selectCar) + '/edit/?customerName='
                                    + encodeURIComponent(this.customerName) + '&dateStart=' +
                                    encodeURIComponent(this.dateStart) + '&dateEnd=' + encodeURIComponent(this.dateEnd), true);
                                xhr.send(null);
                            }
                        }
                    
                    },
                    'cars-create': {
                        template: `<div class="cars-create">
                        <button type="button" v-on:click="onoff">車両追加</button>
                        <div v-show="flag" class="create">
                        <form method="GET">
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
                                flag: false,
                            };
                        },
                        methods: {
                            onclick: function() {
                                xhr.open('GET', '../admin/create/?car_name=' + encodeURIComponent(this.carName)
                                    + '&car_number=' + encodeURIComponent(this.carNumber), true);
                                xhr.send(null);
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
                            <button type="button" v-on:click="onoff">車両削除</button>
                            <div v-show="flag" class="delete">
                            <form method="GET">
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
                                xhr.open('GET', '../admin/' + encodeURIComponent(this.deleteCar), true);
                                xhr.send(null);
                            },
                            onoff: function() {
                                if(this.flag){
                                    this.flag = false;
                                } else {
                                    this.flag =true;
                                }
                            }
                        }
                    }
                }
            });    
                
        } else {
            console.log('接続に失敗');
        }
    } else {
        console.log('接続中...');
}}

xhr.open('GET', '../admin', true);
xhr.send(null);

