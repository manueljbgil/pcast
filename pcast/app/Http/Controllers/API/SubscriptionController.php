<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Subscription;
use App\Podcast;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();
        
        // todas as subscriçoes de um user
        $subscriptions = Subscription::all()->where('user_id',$user['id']);//->pluck('podcast_id');

        //// listar os podcasts subscritos de um user
        $podcasts = array();
        foreach ($subscriptions as $sub) {
            
            $podcast = Podcast::all();//->where('id',$sub['podcast_id']);
            foreach ($podcast as $pod) {
                if($pod['id']==$sub['podcast_id']){
                    array_push($podcasts, $pod);
                }
            }
        }

        return $podcasts;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        //verificar se subscrição ja foi feita

        Subscription::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function show(Subscription $subscription)
    {
        Auth::user();
        $podcast = Podcast::all()->where('id',$subscription['podcast_id']);

        /* $response = [
            'data' => $podcast,
            'message' => 'plantation',
            'result' => 'ok',
            'code' => 200
        ]; */

        return $podcast;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function edit(Subscription $subscription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subscription $subscription)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Subscription  $subscription
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $request)
    {
        //remover subscrição a podcast
        $subscription = Subscription::all();//->where('podcast_id',$request);

        foreach ($subscription as $sub) {
            if($sub['podcast_id']==$request){
                $sub->delete();
                return $sub;
            }
        }
        
        //$sub[0]->delete();
    }
}
