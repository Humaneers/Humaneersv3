"use client";

import React from 'react';
import { BookingCalendar } from "@/components/zoho/BookingCalendar";

interface BookingsWidgetProps {
    onSubmit?: (data: any) => void;
    context?: any;
}

const BookingsWidget: React.FC<BookingsWidgetProps> = ({ onSubmit: _onSubmit, context: _context }) => {
    // The new BookingCalendar handles its own state and submission logic.
    // If we need to pass context or handle external submission, we might need to extend BookingCalendar props.
    // For now, simple rendering aligns the new UI across the site.

    // Note: If 'onSubmit' is strictly required for the TalkToSales flow (to redirect), 
    // we might need to eventually add a callback prop to BookingCalendar.
    // However, BookingCalendar currently handles its own success state.

    return (
        <div className="w-full max-w-4xl mx-auto">
            <BookingCalendar />
        </div>
    );
};

export default BookingsWidget;
