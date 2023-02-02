import { Request, Response, Router } from "express";
import passport from "passport";
import AuthController from "./controllers/auth.controller";

const router = Router();

router.get('/', (req:Request, res:Response) => {
    res.send('Hello World 123!');
});
/**
 * Authentication
 */
router.get('/auth-user', AuthController.authUser);
router.post('/signup', AuthController.signUp);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/forgot-password', AuthController.forgotPassword);
// router.post('/reset-password', AuthController.resetPassword);
// router.post('/email-verify', AuthController.emailVerify);
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', AuthController.githubCallback);
router.get('/google', passport.authenticate('google', { scope: 'profile email' }));
router.get('/google/callback', AuthController.googleCallback);
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', AuthController.facebookCallback);
export default router;