

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            console.log('接続成功');
            let data = JSON.parse(xhr.responseText);

            new Vue({
                el: '#app',
                data: {
                    cars: data[0],
                    date: new Date(),
                    days: function(date) {
                        date.setMonth(date.getMonth() + 1);
                        date.setDate(0);
                        return date.getDate();
                    }
                },
                components: {
                    'car-table': {
                        props: ['id', 'days'],
                        template: `<div>
                        <tr><th></th><th v-for="i in days">{{ i }}</th></tr>
                        <tr v-for="car in this.cars"><th>{{ car.car_name }}</th><td v-for="i in makeCarTable(car)">{{ i }}</td></tr>
                        </div>`,
                        data: function() {
                            return {
                                cars: this.id,
                                makeCarTable: function(car) {
                                    let result = [];
                                    for(let i=1;i<this.days;i++){
                                        result.push(car['_' + i.toString()]);
                                    }
                                    return result;
                                }
                            };
                        }
                    }
                }
            });

            /*
            for(let i=0,len=cars.length;i<len;i++){
                let carInfoSelect = document.createTextNode(cars[i].car_name + ' ' + cars[i].car_number); //Select用
                let carInfoTable = document.createTextNode(cars[i].car_name + '\n' + cars[i].car_number); //Tableインデックス用
                let tr = document.createElement('tr');
                var th = document.createElement('th');
                th.appendChild(carInfoTable);
                tr.appendChild(th)
                */

                
                    /**
                     * 車一台一台の毎日の予約を抜き出している
                     
                for(let j=1,days=daysCount(date)+1;j<days;j++){ //　オーバーヘッドにならないよう最初に一度だけ関数を呼び出す
                    let reservation = cars[i]['_' + j.toString()];
                    if(reservation === null){
                        var reservationNode = document.createTextNode(' ');
                    } else {
                        var reservationNode = document.createTextNode(reservation);
                    }
                    let td = document.createElement('td');
                    td.appendChild(reservationNode);
                    tr.appendChild(td);
                } 
                }
                */
            
                
        } else {
            console.log('接続に失敗');
        }
    } else {
        console.log('接続中...');
}}

xhr.open('GET', '../admin', true);
xhr.send(null);




/*
    let date = new Date();
    function daysCount(date){
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return date.getDate();
    }
    
    
    // 日にちColumnの表示

    for(let i = 1, len = daysCount(date) + 1; i < len; i++){
        let th = document.createElement('th');
        let day = document.createTextNode(i);
        th.appendChild(day);
        tr.appendChild(th);
    }
    
    let entryForm = document.getElementById('entry-form');
    let selectCarInfo = document.createElement('select');
    selectCarInfo.id = 'id';
    
    selectCarInfo.name = 'id'; //optionのvalue値
    document.getElementById('submit').addEventListener('click', function(){

        // Select内のOptionで選択されている値を取得する方法。.optionsプロパティ。
        //forで回して.selectedプロパティがtrueになっているものが選択された値。
        let id = document.getElementById('id').options;
        function selectedCar(id){
            for(let i=0,len=id.length;i<len;i++){
                let m = id.item(i);
                if(m.selected){
                    return m.value;
                }
            }
        };
        
        let customerName = document.getElementById('customerName');
        let dateStart = document.getElementById('dateStart');
        let dateEnd = document.getElementById('dateEnd');
        //admin/{id}/edit/? で更新できる
        xhr.open('GET', '../admin/' + encodeURIComponent(selectedCar(id)) + '/edit/?customerName='
            + encodeURIComponent(customerName.value) + '&dateStart=' +
            encodeURIComponent(dateStart.value) + '&dateEnd=' + encodeURIComponent(dateEnd.value), true);
        xhr.send(null);
    }, false);
*/
