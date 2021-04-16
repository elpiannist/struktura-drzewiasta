<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Branch;
use Illuminate\Support\Facades\Auth;

class BranchesController extends Controller
{
    public function getBranches()
    {
        $branches = Branch::all(['id', 'text', 'parent_id']);
        $is_admin = false;
        if (Auth::user() !== null) {
            $is_admin = Auth::user()->is_admin;
        }
        return view('struct', ['data' => json_encode($branches), 'is_admin' => $is_admin]);
    }

    public function updateBranches(Request $request)
    {
        if (Auth::user() !== null) {
            $is_admin = Auth::user()->is_admin;
        }
        if ($is_admin == true) {
            $data = json_decode($request->get('data'), true);
            Branch::truncate();
            foreach ($data as $arr) Branch::create($arr);
        }
    }
}
