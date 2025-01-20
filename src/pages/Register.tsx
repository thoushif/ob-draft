import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { OAuthProvider } from "appwrite";

function Register() {
    const { register, currentUser, currentUserDetails } = useAuth();
    const [registering, setRegistering] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (currentUser && currentUserDetails) {
            navigate("/");
        }
    }, [currentUser, currentUserDetails]);

    // type Credentials = {
    //     email: string;
    //     password: string;
    //     name: string;
    // };

    // const [credentials, setCredentials] = useState<Credentials>({
    //     email: "",
    //     password: "",
    //     name: "",
    // });

    function handleOauthSignUp(provider: OAuthProvider) {
        setRegistering(true);
        api.handleOauth(provider);
        setRegistering(false);
    }

    // function handleEmailSignUp(e: FormEvent) {
    //     setRegistering(true);
    //     e.preventDefault();
    //     register(credentials).finally(() => {
    //         setRegistering(false);
    //     });
    // }
    // function handleChange(name: string, value: string) {
    //     setCredentials((prev) => ({ ...prev, [name]: value }));
    // }

    return (
        <motion.div
            initial={{ opacity: 0, x: "-25%" }}
            animate={{ opacity: 1, x: "0%" }}
            transition={{ duration: 0.3 }}
        >
            <>
                <div className="flex h-full items-center transition-all ">
                    <div className="grid gap-6 overflow-hidden rounded-xl border p-6 text-gray12 shadow dark:text-dark-slate12">
                        <div className="flex flex-col space-y-2 ">
                            <h1 className="text-2xl font-semibold leading-8 tracking-tight ">
                                Create a VChat account
                            </h1>
                            <h2 className="below text-sm tracking-wide text-gray11 dark:text-indigo2/60">
                                Enter your credentials below
                            </h2>
                        </div>



                        <OauthSignUp loading={registering} onClick={handleOauthSignUp} />

                        <div className="flex justify-center gap-1 text-xs tracking-wide text-dark-gray4 dark:text-indigo2/50">
                            <div className="flex justify-center gap-1 ">
                                Have an account?
                                <Link
                                    to="/login"
                                    className="font-bold text-dark-blue4 underline dark:text-dark-blue10"
                                >
                                    Log in
                                </Link>
                                instead
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </motion.div>
    );
}

export default Register;
export const Component = Register;


