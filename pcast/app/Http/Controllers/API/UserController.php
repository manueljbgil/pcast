<?php

namespace App\Http\Controllers\API;

use Illuminate\Support\Facades\Auth; 
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use Validator;
use App\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //OK STATUS
        //return response()->json($plantation,200);
        $user = Auth::user();
        
        $response = [
            'message' => "teste",
            'result' => 'ok',
            'code' => 200
        ];

        return $user;
    }

    public function login(){
        $username = request('username');
        $password = request('password');

        if(Auth::attempt(['name' => $username, 'password' => $password])){
            $user = Auth::user();
            //$success['token'] =  $user->createToken('MyApp')-> accessToken;
            
            $success = [
                'success' => true,
                'token' => $user->createToken('MyApp')-> accessToken,
            ];

            return $success;
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 401); 
        }
    }

    public function register(Request $request){

        $validator = Validator::make($request->all(), [ 
            'email' => 'required|email', 
            'name' => 'required', 
            'password' => 'required', 
            'cpassword' => 'required|same:password', 
        ]);

        if ($validator->fails()) { 
            return response()->json(['error'=>$validator->errors()], 401);            
        }

        $input = $request->all(); 
        $input['password'] = Hash::make($input['password']); 
        $user = User::create($input);
        
        $success = [
            'success' => true,
            'token' => $user->createToken('MyApp')-> accessToken,
        ];
        
        //$success['name'] =  $user->name;
        return $success;
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
        //
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
