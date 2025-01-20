// import { IconButton, Tooltip, useColorMode } from "@chakra-ui/react";
// import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
// import { indigo, indigoDark } from "@radix-ui/colors";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
// import { MyProfile } from "./MyProfile";

const Navbar = () => {
    const { currentUser, currentUserDetails, logOut } = useAuth();
    const { pathname } = useLocation();
    if (!currentUser || !currentUserDetails) return null;

    return (
        <nav className="hidden h-full  min-w-[3.2rem]  grow-0 flex-col  items-center gap-10 bg-gray3  pt-2 dark:bg-dark-blue2 md:flex">
            {/* <MyProfile /> */}


            <div className="mb-8 mt-auto hidden flex-col gap-2 md:flex">
                {/* <ColorModeToggle /> */}


                <Button
                    onClick={() => {
                        logOut();
                    }}
                    variant={"ghost"}
                    size={"sm"}
                    aria-label="log out"
                >
                    logout
                </Button>


            </div>
        </nav>
    );
};

export default Navbar;
