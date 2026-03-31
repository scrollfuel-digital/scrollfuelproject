import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,

            // ✅ USE ENV (VERY IMPORTANT)
            callbackURL: `${process.env.BASE_URL}/api/admin/google/callback`,
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

export default passport;