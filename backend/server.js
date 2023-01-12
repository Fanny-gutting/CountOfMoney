const express = require("express");
const cors = require("cors");
const cryptos = require("./app/controllers/crypto.controller");
const users = require("./app/controllers/users.controller");
const app = express();
const session = require('express-session');
const passport = require('passport');
const db = require("./app/models");
var corsOptions = {
    origin: "http://localhost:8081"
};
var userProfile;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = '639415844417-313sq6lcq9iempnofor2l03bgq098u8f.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

app.set('view engine', 'ejs');
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());
app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);
    }
));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/error' }),
    function (req, res) {
        users.loginOauth(req, res)
    });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the count_of_money application." });
});

require("./app/routes/crypto.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/user_crypto.routes")(app);
require("./app/routes/crypto_value.routes")(app);
require("./app/routes/rss.routes")(app);
require("./app/routes/user_rss.routes")(app);
require("./app/routes/admin_settings.routes")(app);

setInterval(cryptos.Find5First, 300000)
setInterval(cryptos.UpdateShowCrypto, 60000)

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});