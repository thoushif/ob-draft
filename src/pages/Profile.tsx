
import { MapPinIcon, PencilIcon } from "@heroicons/react/20/solid";

import { useAuth } from "../context/AuthContext";
import { updateUserAvatar } from "../services/userDetailsService";

import { motion } from "framer-motion";




import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import { Button } from "@/components/ui/button";


const Profile = () => {
    const { currentUserDetails, setCurrentUserDetails } = useAuth();
    if (!currentUserDetails) return null;



    return (
        <AuthenticatedLayout>

            <motion.div
                key="profile"
                initial="slide-from-left"
                animate="slide-in"
                exit="slide-from-right"
            >
                <div className="relative flex w-full flex-col items-center justify-between gap-2 py-4">
                    <div className="flex flex-col items-center gap-2">

                        <div className="flex flex-col items-center">
                            <span className="text-lg leading-6 tracking-wide">
                                {currentUserDetails.name}
                            </span>
                            <span className="text-sm italic text-gray11 dark:text-gray-400">
                                {currentUserDetails?.about || "Hi there! I'm using OB"}
                            </span>
                        </div>

                        <span className="inline-flex items-center gap-1 text-slate-900 dark:text-gray-400">
                            <MapPinIcon></MapPinIcon>
                            {currentUserDetails?.location}
                        </span>
                    </div>
                    <div className="mt-5 flex w-full flex-col items-center gap-4 transition">
                        {
                            // <Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
                            //     <ModalOverlay />
                            //     <motion.div>
                            //         <ModalContent className="border">
                            //             <ModalHeader> Edit your details</ModalHeader>
                            //             <ModalCloseButton />
                            //             {/* <EditUserDetails /> */}
                            //         </ModalContent>
                            //     </motion.div>
                            // </Modal>
                        }
                        {/* <Button
                            width={"48"}
                            rounded={"md"}
                            onClick={onOpen}
                            color={colorMode === "dark" ? gray.gray2 : gray.gray1}
                        >
                            Edit Info
                        </Button> */}
                    </div>
                </div>
            </motion.div>

        </AuthenticatedLayout>
    );
};
export default Profile;
