<?php

namespace App\Policies;

use App\Models\User;

class PdfPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {

    }

    public function destroy(User $user, Pdf $pdf)
    {
        if ($user->role === 'admin') {
            return true;
        }
        return $user->id === $pdf->userid;
    }
}
