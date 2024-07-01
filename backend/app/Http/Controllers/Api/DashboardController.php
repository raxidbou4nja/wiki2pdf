<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pdf;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function statistics(Request $request)
    {
        $groupBy = $request->input('group_by', 'day');
        $type = $request->input('type', 'all');
        $dateFormat = $this->getDateFormat($groupBy);

        $userStatistics = User::select(
            DB::raw("DATE_FORMAT(created_at, '$dateFormat') as name"),
            DB::raw('COUNT(*) as uv')
        )
            ->groupBy(DB::raw("DATE_FORMAT(created_at, '$dateFormat')"))
            ->orderBy(DB::raw("DATE_FORMAT(created_at, '$dateFormat')"))
            ->get();

        $pdfStatistics = Pdf::select(
            DB::raw("DATE_FORMAT(created_at, '$dateFormat') as name"),
            DB::raw('COUNT(*) as uv')
        )
            ->groupBy(DB::raw("DATE_FORMAT(created_at, '$dateFormat')"))
            ->orderBy(DB::raw("DATE_FORMAT(created_at, '$dateFormat')"))
            ->get();

        $users = $userStatistics->map(function ($item) {
            return [
                'name' => $item->name,
                'uv' => $item->uv,
            ];
        });

        $pdfs = $pdfStatistics->map(function ($item) {
            return [
                'name' => $item->name,
                'uv' => $item->uv,
            ];
        });

        return response()->json([
            'pdfs' => $pdfs,
            'users' => $users,
            'type' => $type,
        ]);
    }

    private function getDateFormat($groupBy)
    {
        switch ($groupBy) {
            case 'week':
                return '%Y-%u';
            case 'month':
                return '%Y-%m';
            case 'day':
            default:
                return '%Y-%m-%d';
        }
    }
}
