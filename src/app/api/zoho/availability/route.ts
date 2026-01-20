import { NextRequest, NextResponse } from "next/server";
import { getAvailability } from "../_lib/bookings";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const date = searchParams.get("date");
        const serviceId = searchParams.get("serviceId") || "mock-service-id"; // Default for now
        const staffId = searchParams.get("staffId") || "mock-staff-id"; // Default for now

        if (!date) {
            return NextResponse.json(
                { error: "Missing required parameter: date (YYYY-MM-DD)" },
                { status: 400 }
            );
        }

        const slots = await getAvailability(serviceId, staffId, date);

        return NextResponse.json({ success: true, slots });
    } catch (error) {
        console.error("Availability API Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch availability" },
            { status: 500 }
        );
    }
}
