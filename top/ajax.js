document.addEventListener('DOMContentLoaded', function(){
    
    let date = new Date();
    let currentMonth = date.getMonth() + 1; // 今月...getMonth()の戻り値は0~11
    function daysCount(date){           // 今月の日数を返す関数
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        return date.getDate();
    }
    /*-------------------------------------------------------------*/
    
    // 日にちColumnの表示

    document.getElementById('current-month').textContent = currentMonth + "月";
    let daysTable = document.getElementById('table');
    let table = document.createElement('table');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    const nullCell = document.createTextNode(' ');
    th.appendChild(nullCell);
    tr.appendChild(th);
    for(let i = 1, len = daysCount(date) + 1; i < len; i++){
        let th = document.createElement('th');
        let day = document.createTextNode(i);
        th.appendChild(day);
        tr.appendChild(th);
    }
    table.appendChild(tr);
    daysTable.appendChild(table);
    
    /*-------------------------------------------------------------*/
    /**
     * Formからの情報をLaravelへリクエストする処理
     */
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
        //admin/{id}/edit/? で更新できる
        xhr.open('GET', '../admin/' + encodeURIComponent(selectedCar(id)) + '/edit/?customerName='
            + encodeURIComponent(customerName.value) + '&dateStart=' +
            encodeURIComponent(dateStart.value), true);
        xhr.send(null);
    }, false);

    /*-------------------------------------------------------------*/

    // テーブルを作成。Laravelへリクエスト。DBからの情報を整形

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                let data = JSON.parse(xhr.responseText);
                let cars = data[0];
                let form = document.getElementById('form');
                for(let i=0,len=cars.length;i<len;i++){
                    let carInfoSelect = document.createTextNode(cars[i].car_name + ' ' + cars[i].car_number); //Select用
                    let carInfoTable = document.createTextNode(cars[i].car_name + '\n' + cars[i].car_number); //Tableインデックス用
                    let tr = document.createElement('tr');
                    var th = document.createElement('th');
                    th.appendChild(carInfoTable);
                    tr.appendChild(th)

                     /**
                      * 車一台一台の毎日の予約を抜き出している
                      */
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
                    table.appendChild(tr);

                    /**
                     * Formの車種選択のoptionを作っている
                     */
                    let option = document.createElement('option');
                    option.value = cars[i].id; //　※更新※ editするときはidを使う　※重要※　データベースをeditするときselectはナンバーで行うためGET送信する情報はナンバーにする
                    option.appendChild(carInfoSelect);
                    selectCarInfo.appendChild(option);
                    form.replaceChild(selectCarInfo, form.firstChild);
                    entryForm.appendChild(form);

                }
                    
            } else {
                console.log('接続に失敗');
            }
        } else {
            console.log('接続中...');
        }
    }
    
    xhr.open('GET', '../admin', true);
    xhr.send(null);

    /*-------------------------------------------------------------*/

}, false);