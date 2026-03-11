import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: "http://127.0.0.1:8000/api/admin/google/callback",

//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 // TODO: Save user in DB later
//                 return done(null, profile);
//             } catch (err) {
//                 return done(err, null);
//             }
//         }
//     )
// );

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/admin/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {

            const user = {
                displayName: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos[0].value
            };

            return done(null, user);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
