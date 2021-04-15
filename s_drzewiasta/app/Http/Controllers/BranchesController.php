<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Branch;
class BranchesController extends Controller
{
    public function getBranches()
    {
        $branches = Branch::all(['id', 'text', 'parent_id']);
        return view('struct', ['data' => json_encode($branches)]);
    }
}
