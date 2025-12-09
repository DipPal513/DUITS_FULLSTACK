import rateLimit from 'express-rate-limit';

// 1. General Limiter: For public routes (Gallery, Blogs, Events)
// Allows 100 requests every 15 minutes. Good for normal browsing.
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 120, // Limit each IP to 120 requests per `windowMs`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: 429,
        message: "Too many requests, please try again later."
    }
});

// 2. Auth Limiter: STRICT for Login/Registration
// Allows only 5 requests every 10 minutes. 
// Prevents hackers from guessing passwords endlessly.
export const authLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: {
        status: 429,
        message: "Too many login attempts. Please try again after 3 minutes."
    }
});