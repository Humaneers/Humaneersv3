import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "../_lib/bookings";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Basic validation
        if (!body.fromTime || !body.customerDetails) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Enhance booking data with context if available
        const bookingPayload = {
            ...body,
            description: body.context ? `Source Context: ${JSON.stringify(body.context)}` : undefined
        };

        const result = await createBooking(bookingPayload);

        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error("Booking API Error:", error);
        return NextResponse.json(
            { error: "Failed to create booking" },
            { status: 500 }
        );
    }
}
