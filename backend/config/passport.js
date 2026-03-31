import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const isProduction = process.env.NODE_ENV === "production";

const BASE_URL = isProduction
    ? "https://scrollfuelproject.onrender.com"
    : "http://localhost:8000";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${BASE_URL}/api/admin/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = {
                    displayName: profile.displayName,
                    email: profile.emails?.[0]?.value,
                    photo: profile.photos?.[0]?.value,
                };

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

console.log("Using BASE_URL:", BASE_URL);

// ✅ Debug logs
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("BASE_URL:", BASE_URL);
console.log("CALLBACK:", `${BASE_URL}/api/admin/google/callback`);

export default passport;