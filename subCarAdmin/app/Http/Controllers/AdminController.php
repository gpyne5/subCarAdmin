<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Admin;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = [Admin::all()];
        return $items;

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $this->validate($request, Admin::$rules);
        $admin = new Admin;
        $form = $request->all();
        unset($form['_token']);
        $admin->timestamps = false;
        $admin->fill($form)->save();
        return redirect('../top/index.html');
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
        $admin = Admin::find($id);
        $admin->delete();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id, Request $request)
    {
        function createTimestamp($date){
            $timestamp = strtotime($date);
            return $timestamp;
        };
        /**
         * date 'j' は1桁もしくは2桁の日にしてくれる
         * 開始日と終了日をセット。もし終了日が入力されていなければ開始日と同じにする
         */ 
        $start = date('j', createTimestamp($request->dateStart));
        if(isset($request->dateEnd)){
            $end = date('j', createTimestamp($request->dateEnd));
        } else {
            $end = date('j', createTimestamp($request->dateStart));
        }

        /**
         * @return array $result
         * '_' + 日
         */
        function findTarget($start, $end){
            $targetDays = ((int) $end - (int) $start) + 1;
            $result = [];
            if($targetDays === 1){
                return '_' . $start;
            };
            for($i = 0; $i < $targetDays; $i ++){
                $day = (int) $start + $i;
                $resultDay = '_' . $day;
                $result[] = $resultDay;
            };
            return $result;
        }
        $period = findTarget($start, $end);
        
        $target = Admin::find($id);
        //timestampsをfalseにしないとcreated_atのColumnがないよとエラーになる
        $target->timestamps = false;

        foreach((array) $period as $day){
            $target->$day = $request->customerName;
            echo $target->$day;
        }
        $target->save();
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
