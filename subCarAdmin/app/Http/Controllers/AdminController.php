<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\Calender;
use App\Models\Car;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cars = Car::all();
        $calender = Calender::all();
        //もし８月先のレコードが存在しなければ作成したい
        /*
        $today = date('j');
        $sevenMonthAgo = date('Y-m', strtotime("7 month"));
        $result = [];
        if ($today === "1"){
                for ($i = 0, $len = count($calender); $i <$len; $i ++){
                    if(empty($calender[$i]->y_m)){
                        $result[] = "true";
                    } else {
                        $result[] ="false";
                    }
            }
        }

        
        
         else {
                $newCalender = new Calender;
                $newCalender->car_id = $calender[$i]->car_id;
                $newCalender->y_m = $sevenMonthAgo;
                $newCalender->timestamps = false;
                $newCalender->save();
            }
        }
        */
        $items = [$cars, $calender];
        return $items;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->validate($request, Car::$rules);
        $car = new Car;
        $form = $request->all();
        unset($form['_token']);
        $car->timestamps = false;
        $car->fill($form)->save();

        for($i=0;$i<7;$i++){
            $calender = new Calender;
            $current = date('Y-m', strtotime("${i} month"));
            $calenderSet = [
                'car_id' => $car->id,
                'y_m' => $current
            ];
            $calender->timestamps = false;
            $calender->fill($calenderSet)->save();
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $car = Car::find($id)->delete();
        $calender = Calender::where('car_id',$id)->get()->each->delete();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, Request $request)
    {
        
        $start = $request->dateStart;
        if(isset($request->dateEnd)){
            $end = $request->dateEnd;
        } else {
            $end = $request->dateStart;
        }

        /**
         * @return array $result
         * '_' + 日
         */
        function findTarget($start, $end){
            $targetDays = ((int) $end - (int) $start) + 1;
            $result = [];
            if($targetDays === 1){
                return array('_' . $start);
            };
            for($i = 0; $i < $targetDays; $i ++){
                $day = (int) $start + $i;
                $resultDay = '_' . $day;
                $result[] = $resultDay;
            };
            return $result;
        }
        $period = findTarget($start, $end);
        
        // car_idとy_mが一致するテーブルを検索
        $target = Calender::where('car_id',$id)->where('y_m', $request->currentMonth)->first();

        //timestampsをfalseにしないとcreated_atのColumnがないよとエラーになる
        $target->timestamps = false;

        foreach((array) $period as $day){
            $target->$day = $request->customerName;
            echo $target->$day;
        }
        $target->save();
        return $target;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
