import { getZohoAccessToken } from "@/lib/zoho/client";

// Toggle this to false to attempt real API calls once Zoho is fixed
export const MOCK_ZO_BOOKINGS = true;

export interface TimeSlot {
    startTime: string; // "10:00 AM"
    endTime: string;   // "10:30 AM"
    available: boolean;
}

export interface BookingRequest {
    serviceId?: string;
    staffId?: string;
    resourceId?: string;
    fromTime: string; // ISO or "2023-10-27 10:00:00"
    customerDetails: {
        name: string;
        email: string;
        phone: string;
        country_code?: string;
    };
}

/**
 * Fetch available slots for a given date.
 * If MOCK_ZO_BOOKINGS is true, returns dummy data.
 */
export async function getAvailability(
    serviceId: string,
    staffId: string,
    date: string // YYYY-MM-DD
): Promise<TimeSlot[]> {
    if (MOCK_ZO_BOOKINGS) {
        // console.log(`[MOCK] Fetching availability for ${date} (Service: ${serviceId}, Staff: ${staffId})`);
        return generateMockSlots(date);
    }

    try {
        const accessToken = await getZohoAccessToken();
        const apiDomain = process.env.ZOHO_API_DOMAIN || "www.zohoapis.com";

        // Note: The actual endpoint might vary based on DTO requirements.
        // Usually it's /bookings/v1/json/getappointment slots
        const url = `https://${apiDomain}/bookings/v1/json/getappointmentslots?service_id=${serviceId}&staff_id=${staffId}&selected_date=${date}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Zoho-oauthtoken ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Zoho API Error: ${response.statusText}`);
        }

        const data = await response.json();
        // TODO: Parse actual Zoho response format here
        return data.response.returnvalue.timeSlots || [];

    } catch (error) {
        console.error("Failed to fetch Zoho availability", error);
        // Fallback to empty or throw depending on desired UX
        throw error;
    }
}

/**
 * Create a booking.
 * If MOCK_ZO_BOOKINGS is true, logs to console and returns success.
 */
export async function createBooking(bookingData: BookingRequest) {
    if (MOCK_ZO_BOOKINGS) {
        // console.log(`[MOCK] Creating booking:`, JSON.stringify(bookingData, null, 2));
        await new Promise(r => setTimeout(r, 1000)); // Simulate latency
        return { status: "success", bookingId: "mock-booking-id-123" };
    }

    const accessToken = await getZohoAccessToken();
    const apiDomain = process.env.ZOHO_API_DOMAIN || "www.zohoapis.com";

    // This is a simplified payload example.
    const payload = {
        service_id: bookingData.serviceId,
        staff_id: bookingData.staffId,
        from_time: bookingData.fromTime,
        customer_details: bookingData.customerDetails
    };

    const response = await fetch(`https://${apiDomain}/bookings/v1/json/appointment`, {
        method: "POST",
        headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`,
            "Content-Type": "application/json" // Verify if Zoho needs form-data or JSON
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();
    return data;
}


// --- Helper: Generate Mock Slots ---

function generateMockSlots(dateStr: string): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const date = new Date(dateStr);

    // Simple logic: 9 AM to 5 PM, every 30 mins
    // Skip weekends for realism?
    const day = date.getDay();
    if (day === 0 || day === 6) return []; // No slots on weekends

    for (let hour = 9; hour < 17; hour++) {
        // :00 slot
        slots.push({
            startTime: formatTime(hour, 0),
            endTime: formatTime(hour, 30),
            available: Math.random() > 0.3 // 70% chance available
        });
        // :30 slot
        slots.push({
            startTime: formatTime(hour, 30),
            endTime: formatTime(hour + 1, 0),
            available: Math.random() > 0.3
        });
    }
    return slots;
}

function formatTime(hour: number, minute: number): string {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h = hour % 12 || 12;
    const m = minute < 10 ? `0${minute}` : minute;
    return `${h}:${m} ${ampm}`;
}
