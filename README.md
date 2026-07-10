# FixItNow 🔧
 
**"Your Trusted Home Service Platform"**
 
A backend REST API for a home services marketplace. Customers can browse services, book qualified technicians, make payments, and leave reviews. Technicians manage their profiles, availability, and bookings. Admins moderate users, categories, and oversee all bookings.
 
---
 
## Tech Stack
 
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Token)
- **Payment Gateway:** Stripe (Checkout Sessions + Webhooks)
- **Password Hashing:** bcrypt


## Roles & Permissions
 
| Role | Description | Key Permissions |
|------|-------------|------------------|
| **Customer** | Users who book home services | Browse services, book technicians, track bookings, make payments, leave reviews |
| **Technician** | Service professionals | Create profile & services, set availability, manage bookings, complete jobs |
| **Admin** | Platform moderators | Manage all users, oversee all bookings, manage service categories |
 
> Users select their role during registration.
 
---

---
 
## Booking Status Flow
 
```
REQUESTED → (technician accepts) → ACCEPTED → (payment via Stripe) → PAID
          → (technician declines) → DECLINED
 
PAID → (technician starts job) → IN_PROGRESS → (technician completes) → COMPLETED
```
 
> Customers can cancel a booking at any point before it reaches `IN_PROGRESS` status.
 
---

## Database Schema Overview
 
- **User** — account info, role (CUSTOMER/TECHNICIAN/ADMIN), status (ACTIVE/BANNED)
- **TechnicianProfile** — bio, experience, location, cached rating, linked 1-to-1 with User
- **Availability** — technician's weekly time slots (dayOfWeek, startTime, endTime)
- **Category** — service categories (Plumbing, Electrical, etc.)
- **Service** — a technician's specific offering under a category
- **Booking** — links customer, technician, and service with a status lifecycle
- **Payment** — Stripe transaction record linked 1-to-1 with a booking
- **Review** — customer's rating/comment on a completed booking
Full schema: see `prisma/schema.prisma`.
 
---
 
## Testing
 
A Postman collection can be built from the endpoints above. Suggested manual test order:
 
1. Register Admin, Technician, Customer
2. Admin creates Categories
3. Technician creates Services & sets Availability
4. Customer browses Services → creates a Booking
5. Technician Accepts the Booking
6. Customer pays via `/api/payments/checkout` → completes Stripe test checkout (`4242 4242 4242 4242`)
7. Webhook confirms payment → Booking becomes `PAID`
8. Technician marks `IN_PROGRESS` → `COMPLETED`
9. Customer submits a Review
---
 
## Notes
 
- Payment amount is derived directly from `Service.price` at checkout time.
- Stripe Checkout Sessions (hosted payment page) are used instead of raw Payment Intents.
- Only one review is allowed per booking.
- Technician rating is recalculated (average) on every new review submission.
