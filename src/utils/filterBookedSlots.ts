// lib/utils/filterBookedSlots.ts

interface ISlot {
  startTime: string;
  endTime: string;
}

interface IExistingBooking {
  startTime: string;
  endTime: string;
  status: string;
}

const BLOCKING_STATUSES = ["REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS"];

/**
 * Removes candidate slots that overlap with an existing (non-cancelled/declined) booking.
 */
export function filterAvailableSlots(
  candidateSlots: ISlot[],
  existingBookings: IExistingBooking[]
): ISlot[] {
  const activeBookings = existingBookings.filter((b) =>
    BLOCKING_STATUSES.includes(b.status)
  );

  return candidateSlots.filter((slot) => {
    const overlaps = activeBookings.some(
      (b) => slot.startTime < b.endTime && slot.endTime > b.startTime
    );
    return !overlaps;
  });
}