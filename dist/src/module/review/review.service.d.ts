export declare const reviewService: {
    giveReviewOnTechnician: (userId: string, bookingId: string, rating: number, comment?: string) => Promise<{
        id: string;
        createdAt: Date;
        customerId: string;
        technicianId: string;
        bookingId: string;
        rating: number;
        comment: string | null;
    }>;
};
//# sourceMappingURL=review.service.d.ts.map