"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("./module/auth/auth.routes");
const services_route_1 = require("./module/services/services.route");
const category_route_1 = require("./module/category/category.route");
const technician_route_1 = require("./module/technician/technician.route");
const admin_route_1 = require("./module/admin/admin.route");
const booking_route_1 = require("./module/booking/booking.route");
const payment_route_1 = require("./module/payment/payment.route");
const review_route_1 = require("./module/review/review.route");
const notFound_1 = require("./middleware/notFound");
const gooblaErrorHandler_1 = require("./middleware/gooblaErrorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.default.app_url,
    credentials: true,
}));
app.use("/api/payments/webhook", express_1.default.raw({ type: 'application/json' }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use("/api/auth", auth_routes_1.authRouter);
app.use("/api/categories", category_route_1.categoryRouter);
app.use("/api/technician", technician_route_1.technicianRouter);
app.use("/api/services", services_route_1.serviceRouter);
app.use("/api/admin", admin_route_1.adminRouter);
app.use("/api/bookings", booking_route_1.bookingRouter);
app.use("/api/payments", payment_route_1.paymentRouter);
app.use("/api/reviews", review_route_1.reviewRouter);
app.use(notFound_1.notFound);
app.use(gooblaErrorHandler_1.globalErrorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map