
import { motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OauthSignUp from "../components/OauthSignUp";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Loading from "./Loading";
import { OAuthProvider } from "appwrite";

function Login() {
    const { logIn, isLoading, currentUser, intended, currentUserDetails } =
        useAuth();
    const navigate = useNavigate();

    const [verifying, setVerifying] = useState(false);

    type Credentials = {
        email: string;
        password: string;
    };

    const [credentials, setCredentials] = useState<Credentials>({
        email: "",
        password: "",
    });

    async function handleOauthSignIn(provider: OAuthProvider) {
        setVerifying(true);
        api.handleOauth(provider);
        setVerifying(false);
    }

    function handleChange(name: string, value: string) {
        setCredentials((prev) => ({ ...prev, [name]: value }));
    }

    async function handleEmailSignIn(e: FormEvent) {
        e.preventDefault();
        setVerifying(true);
        logIn(credentials).finally(() => setVerifying(false));
    }

    useEffect(() => {
        if (currentUser && currentUserDetails) {
            navigate(intended || "/");
        }
    }, [currentUser, currentUserDetails]);

    if (isLoading) {
        return <Loading />;
    }
    return (
        <motion.div
            initial={{ opacity: 0, x: "-25%" }}
            animate={{ opacity: 1, x: "0%" }}
            transition={{ duration: 0.3 }}
        >
            <div className=" flex  items-center  transition-all [&>div]:w-full  ">
                <>
                    <div className="grid gap-4 rounded-xl border p-6 text-gray12 shadow dark:text-dark-slate12">
                        <div className="flex flex-col space-y-2 ">
                            <h1 className="text-2xl font-semibold leading-8 tracking-tight ">
                                Log in to OB
                            </h1>

                        </div>


                        <OauthSignUp loading={verifying} onClick={handleOauthSignIn} />

                        {/* <div className="flex justify-center gap-1 text-xs tracking-wide text-dark-gray4 dark:text-indigo2/50">
                            <div className="flex justify-center gap-1 ">
                                No account?
                                <Link
                                    to="/register"
                                    className="font-bold text-dark-blue4 underline dark:text-dark-blue10"
                                >
                                    Sign up
                                </Link>
                                instead
                            </div>
                        </div> */}
                    </div>{" "}
                </>
            </div>
        </motion.div>
    );
}

export default Login;
