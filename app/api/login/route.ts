import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Verifikasi kredensial
        if (username === 'admin1406' && password === 'admin1406') {
            // Buat session cookie
            const cookieStore = cookies();
            cookieStore.set('session', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 // 24 jam
            });

            return NextResponse.json(
                { message: 'Login berhasil' },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { message: 'Username atau password salah' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    try {
        const cookieStore = cookies();
        // Hapus cookie session
        cookieStore.delete('session');

        return NextResponse.json(
            { message: 'Logout berhasil' },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: 'Terjadi kesalahan server' },
            { status: 500 }
        );
    }
}