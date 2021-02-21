document.addEventListener('DOMContentLoaded', function(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                console.log('接続成功')
                let data = JSON.parse(xhr.responseText);
                let cars = data[0];
                let select = document.getElementById('select');
                for(let i=0,len=cars.length; i<len; i++){
                    let car = cars[i];
                    let selectCarInfo = document.createTextNode(car.car_name + ' ' + car.car_number);
                    let option = document.createElement('option');
                    option.value = car.id;
                    option.appendChild(selectCarInfo);
                    select.appendChild(option);
                }
            } else {
                console.log('接続失敗');
            }
        } else {
            console.log('接続中...')
        }
    }

    document.getElementById('delete').addEventListener('click', function(){
        let opts = document.getElementById('select').options;
        console.log(selectedCar(opts));
        xhr.open('GET', '../admin/' + encodeURIComponent(selectedCar(opts)), true);
        xhr.send(null);
    },false);
    
    document.getElementById('submit').addEventListener('click', function(){
        let carName = document.getElementById('car_name');
        let carNumber = document.getElementById('car_number');
        xhr.open('GET', '../admin/create/?car_name=' + encodeURIComponent(carName.value)
            + '&car_number=' + encodeURIComponent(carNumber.value), true);
        xhr.send(null);
        document.location.href = 'http://localhost/top';      
    }, false);

    function selectedCar(opts){
        for(let i=0,len=opts.length;i<len;i++){
            if(opts.item(i).selected){
                return opts.item(i).value;
            }
        }
    };


    xhr.open('GET', '../admin', true);
    xhr.send(null);
}, false);