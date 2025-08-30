import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useUpdateProfile } from "@/hooks/api/mutation/auth/useUpdateProfile.js";
import { useAuthStore } from "@/store/authStore.js";
import { toast } from "sonner";
import useGetProfile from "@/hooks/api/queries/useGetProfile.jsx";

const ProfileDetails = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const { currentUser } = useAuthStore();

    const {data: profile, isPending, refetch} = useGetProfile()
    const { mutate, isPending: updatePend } = useUpdateProfile();

    // only editable fields
    const [dob, setDob] = useState( profile?.data?.dob || "");
    const [phone, setPhone] = useState( profile?.data?.phoneNumber || "");

    const user = {
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        email: currentUser?.email,
        gender: currentUser?.gender,
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = { phone, dob };
        mutate(payload, {
            onSuccess: () => {
                toast.success("Profile updated successfully ✅");
                refetch();
                navigate("/user-account");
            },
            onError: (error) => {
                toast.error(error?.response?.data?.message || "Update failed ❌");
            },
        });
    };

    const handleDelete = () => {
        setShowModal(false);
        console.log("Account deleted");
    };

    return (
        <>
            <div className="p-4 md:px-8 w-[878px] max-w-full mx-auto font-custom">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Profile Details</h2>
                </div>

                {
                    isPending ? <div>Loading...</div> : null
                }
                <div
                    className="pt-5 pb-[164px]"
                    style={{
                        boxShadow: `
              0px 14px 30px 0px #7575751A,
              0px 55px 55px 0px #75757517,
              0px 124px 74px 0px #7575750D,
              0px 220px 88px 0px #75757503,
              0px 344px 96px 0px #75757500`,
                    }}
                >
                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 mx-10"
                    >
                        <div>
                            <label className="block text-base font-bold text-black mb-4">
                                First Name
                            </label>
                            <input
                                type="text"
                                value={user.firstName}
                                readOnly
                                className="w-full px-6 py-5 rounded-2xl bg-[#F2F2F7] text-gray-800"
                            />
                        </div>

                        <div>
                            <label className="block text-base font-bold text-black mb-4">
                                Last Name
                            </label>
                            <input
                                type="text"
                                value={user.lastName}
                                readOnly
                                className="w-full px-6 py-5 rounded-2xl bg-[#F2F2F7] text-gray-800"
                            />
                        </div>

                        <div className="md:col-span-2 grid grid-cols-1 gap-6">
                            <div>
                                <label className="block text-base font-bold text-black mb-4">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    className="w-full px-6 py-5 rounded-2xl bg-[#F2F2F7] text-gray-800"
                                />
                            </div>

                            <div>
                                <label className="block text-base font-bold text-black mb-4">
                                    Gender
                                </label>
                                <input
                                    type="text"
                                    value={user.gender}
                                    readOnly
                                    className="w-full px-6 py-5 rounded-2xl bg-[#F2F2F7] text-gray-800"
                                />
                            </div>

                            <div>
                                <label className="block text-base font-bold text-black mb-4">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="w-full px-6 py-5 rounded-2xl bg-white border text-gray-800"
                                />
                            </div>

                            <div>
                                <label className="block text-base font-bold text-black mb-4">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-6 py-5 rounded-2xl bg-white border text-gray-800"
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 flex justify-end mt-6">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="bg-[#E94E30] text-white px-10 py-4 rounded-xl hover:bg-[#c8371d]"
                            >
                                {updatePend ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>

                    {/* delete account button */}
                    <div className="mt-16 mx-10">
                        <Button
                            variant="destructive"
                            onClick={() => setShowModal(true)}
                            className="bg-transparent border rounded-xl border-[#E94E30]
                         text-[#E94E30] hover:text-white hover:bg-[#E94E30]
                         px-[95px] py-[28px]"
                        >
                            <FaTrash className="mr-2" />
                            Delete Account
                        </Button>
                    </div>
                </div>
            </div>

            {/* modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 ">
                    <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl animate-fadeIn">
                        <div className="text-center">
                            <h3 className="text-[20px] font-semibold text-gray-900 mb-3">
                                Delete Account
                            </h3>
                            <p className="text-[#1B121B] font-medium text-base mb-6">
                                Are you sure you want to delete your account ?
                            </p>
                        </div>

                        <div className="flex justify-center gap-4 ">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-16 py-2 rounded-md text-[#E94E30] border border-[#E94E30] hover:bg-gray-100 transition"
                            >
                                No
                            </button>
                            <Link to="/delete-confirmation">
                                <button
                                    onClick={handleDelete}
                                    className="px-16 py-2 rounded-md bg-[#E94E30] text-white hover:bg-[#c8371d] transition"
                                >
                                    Yes
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileDetails;
