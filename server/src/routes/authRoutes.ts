import { Router } from 'express';
import { signupEmail, verifyOtp, googleLogin } from '../controllers/authController';

const router = Router();

router.post('/signup', signupEmail);
router.post('/verify-otp', verifyOtp);
router.post('/google-login', googleLogin);

export default router;
