document.addEventListener('DOMContentLoaded', function(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        console.log('test');
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                console.log('接続成功')
                let data = JSON.parse(xhr.responseText);
                let cars = data[0];
                console.log(cars);
            } else {
                console.log('接続失敗');
            }
        } else {
            console.log('接続中...')
        }
    }
    
    document.getElementById('submit').addEventListener('click', function(){
        let carName = document.getElementById('car_name');
        let carNumber = document.getElementById('car_number');
        xhr.open('GET', '../admin/create/?car_name=' + encodeURIComponent(carName.value)
            + '&car_number=' + encodeURIComponent(carNumber.value), true);
        xhr.send(null);
        document.location.href = 'http://localhost/top';      
    }, false);


    xhr.open('GET', '../admin', true);
    xhr.send(null);
}, false);