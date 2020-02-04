<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth;
use App\Episode;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EpisodeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(int $request)
    {
        Auth::user();
        
        $podcast = $request;
        $episodes = Episode::all();

        

        return $episodes;
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
        
        if($request->hasFile('file')){

            $file = $request->file("file")->store('podcastEpisode');
            $data['file'] = $file;
        }

        $episode = Episode::create($data);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Episode  $episode
     * @return \Illuminate\Http\Response
     */
    public function show(Episode $episode)
    {
        Auth::user();
        
        $response = [
            'data' => $episode,
            'message' => 'plantation',
            'result' => 'ok',
            'code' => 200
        ];

        return $response;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Episode  $episode
     * @return \Illuminate\Http\Response
     */
    public function edit(Episode $episode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Episode  $episode
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Episode $episode)
    {
        $data = $request->all();

        if($request->hasFile('file')){

            /* $request->file('file')->storeAs(
                'podcastEpisode',
                $request->file('file')->getClientOriginalName() . '.' . $request->file('file')->getClientOriginalExtension()
            ); */

            $file = $request->file("file")->store('podcastEpisode');
            $data['file'] = $file;
        }
        
        $episode->update($data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Episode  $episode
     * @return \Illuminate\Http\Response
     */
    public function destroy(Episode $episode)
    {
        //
    }
}
