import { signup, login,continueWithGoogle } from './auth.service.js';
import type { Request,Response } from 'express';
import { googleOAuthClient } from './google.oauth.js';


const signupController =async(req:Request,res:Response)=>{
    try{
      const result = await signup(req.body)
       res.json(result)
    }catch(error){
      if(error instanceof Error){
        res.status(400).json({ message: error.message })
      }
    }
  }


const loginController = async (req:Request, res:Response) => {
  try {
   const result = await login(req.body)
   res.json(result)

  } catch (error) {
    if(error instanceof Error){
      res.status(400).json({ message: error.message })
    }
  }
}




const googleLoginController = ( req: Request,res: Response) => {

  const authUrl = googleOAuthClient.generateAuthUrl({
    access_type: "online",
    scope: [
      "openid",
      "email",
      "profile"
    ],
    prompt: "select_account",
  });

  res.redirect(authUrl);
};



const googleCallbackController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const code = req.query.code;

    if (typeof code !== "string" || code.length === 0) {
      return res.status(400).json({
        message: "Google authorization code is missing",
      });
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;

    if (typeof clientId !== "string" || clientId.length === 0) {
      console.error("GOOGLE_CLIENT_ID is missing");

      return res.status(500).json({
        message: "Google OAuth configuration is missing",
      });
    }

    const { tokens } = await googleOAuthClient.getToken(code);

    const idToken = tokens.id_token;

    if (typeof idToken !== "string" || idToken.length === 0) {
      return res.status(400).json({
        message: "Google ID token is missing",
      });
    }

    const ticket = await googleOAuthClient.verifyIdToken({
      idToken,
      audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({
        message: "Unable to verify Google user",
      });
    }

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;
    const emailVerified = payload.email_verified;

    if (typeof googleId !== "string" || googleId.length === 0) {
      return res.status(400).json({
        message: "Google user ID is missing",
      });
    }

    if (typeof email !== "string" || email.length === 0) {
      return res.status(400).json({
        message: "Google email is missing",
      });
    }

    if (emailVerified !== true) {
      return res.status(400).json({
        message: "Google email is not verified",
      });
    }

    const user = await continueWithGoogle({
  googleId,
  email,
  name: typeof name === "string" ? name : null,
});

    console.log("Google user:", {
      googleId,
      email,
      name,
      emailVerified,
    });

    return res.status(200).json({
      message: "Google user verified successfully",
      user: {
        googleId,
        email,
        name: typeof name === "string" ? name : null,
        emailVerified,
      },
    });
  } catch (error: unknown) {
    console.error("Google OAuth error:", error);

    return res.status(500).json({
      message: "Google authentication failed",
    });
  }
};


export {signupController,loginController,googleLoginController,googleCallbackController}
