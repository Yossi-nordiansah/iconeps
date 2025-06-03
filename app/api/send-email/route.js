// import nodemailer from 'nodemailer';
// import { NextResponse } from 'next/server';

// export async function POST(req) {

//     const body = await req.json();
//     const { penerima, htmlContent, subject } = body;

//     try {
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: "yossi.nordiansah07@gmail.com",
//                 pass: 'zgqrsncstfiqbfdq',
//             },
//         });
//         for (const recipient of penerima) {
//             await transporter.sendMail({
//                 from: "yossi.nordiansah07@gmail.com",
//                 to: recipient,
//                 subject: subject,
//                 html: `<p>${htmlContent}</p>`,
//             });
//         };
//         return NextResponse.json({ message: "pengiriman email berhasil" }, { status: 200 })
//     } catch (error) {
//         return NextResponse.json(error)
//     }
// }

import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {
    const body = await req.json();
    const { penerima, htmlContent, subject } = body;

    const hasil = {
        sukses: [],
        gagal: [],
    };

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "yossi.nordiansah07@gmail.com",
                pass: 'zgqrsncstfiqbfdq',
            },
        });

        for (const recipient of penerima) {
            try {
                await transporter.sendMail({
                    from: "yossi.nordiansah07@gmail.com",
                    to: recipient,
                    subject,
                    html: `<p>${htmlContent}</p>`,
                });
                hasil.sukses.push(recipient);
            } catch (err) {
                hasil.gagal.push({ email: recipient, error: err.message });
            }
        }

        console.log(hasil);

        return NextResponse.json(
            {
                message: "Proses pengiriman selesai",
                hasil,
            },
            { status: hasil.gagal.length > 0 ? 207 : 200 } // 207 jika sebagian gagal
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Kesalahan server", detail: error.message },
            { status: 500 }
        );
    }
}
