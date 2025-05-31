import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(req) {

    const body = await req.json();
    const { penerima, htmlContent, subject } = body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "yossi.nordiansah07@gmail.com",
                pass: 'zgqrsncstfiqbfdq',
            },
        });

        for (const recipient of penerima) {
            await transporter.sendMail({
                from: "yossi.nordiansah07@gmail.com",
                to: recipient,
                subject: subject,
                html: `<p>${htmlContent}</p>`,
            });
        };
        return NextResponse.json( {message: "pengiriman email berhasil"},{ status: 200 })
    } catch (error) {
        return NextResponse.json(error)
    }


}