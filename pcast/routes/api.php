<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('teste', 'API\UserController@index');
    Route::get('categories', 'API\CategoryController@index');

    Route::get('episodes/{id}', 'API\EpisodeController@index');
    Route::get('subscriptions/{id}', 'API\SubscriptionController@delete');
        
    Route::resource('podcasts', 'API\PodcastController');
    Route::resource('episodes', 'API\EpisodeController');
    Route::resource('subscriptions', 'API\SubscriptionController');
});

Route::post('login','API\UserController@login');
Route::post('register','API\UserController@register');