
import { Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useGetAddressBook from "@/hooks/api/queries/addressBook/useGetAddressBook.js";

export default function AddressBook() {
    const { data, isPending} = useGetAddressBook();

    const navigate = useNavigate();


    return (
        <div
            className=" w-[388px] lg:w-[878px] lg:ml-10 mt-6 mb-20 p-4 rounded-lg"
            style={{
                boxShadow:
                    '0px 14px 30px 0px #7575751A, 0px 55px 55px 0px #75757517, 0px 124px 74px 0px #7575750D, 0px 220px 88px 0px #75757503, 0px 344px 96px 0px #75757500',
            }}
        >
            <div className="lg:flex justify-between lg:mx-5">
                <h2 className="text-2xl font-semibold mb-6">Address Book</h2>
                <Link to="/add-new-address">
                    <button className="mb-6 px-4 py-2 bg-[#F2542D] text-white rounded-[10px] hover:bg-[#F2542D]">
                        Add new address
                    </button>
                </Link>
            </div>

            <div className="space-y-6 w-[350px] lg:w-[400px] lg:ml-10 pb-[293px]">
                { isPending ? <p>Loading...</p> : data?.data?.map((item) => (
                    <div
                        key={item._id}
                        className="border p-4 lg:rounded shadow-sm bg-[#FFF4F0]"
                    >
                        <h3 className="text-lg font-semibold mb-6">
                            {item.firstName} {item.lastName}
                        </h3>
                        <p className="text-base text-[#5B5B5B] mb-4 w-[300px]">
                            {item.delivery}, {item.city}, {item.region}
                        </p>
                        <p className="text-base text-[#5B5B5B] mb-6">
                            +234 {item.phoneNumber}
                        </p>

                        {item.isDefault && (
                            <div
                                className="inline-block mt-2 px-3 py-1 text-sm font-medium text-[#C66B4E] rounded-2xl"
                                style={{ backgroundColor: '#F6E3DD' }}
                            >
                                Default Address
                            </div>
                        )}

                        <div className="flex justify-between items-center mt-4 px-3 py-2 bg-[#F2F2F7]">
                            <button
                                className="text-sm hover:underline font-bold"
                                style={{ color: item.isDefault ? '#C7C7CC' : '#00A878' }}
                            >
                                Set as default
                            </button>
                            <button
                                className="text-[#E94E30] hover:text-[#E94E30] flex items-center gap-1 text-base"
                                onClick={() =>
                                    navigate('/add-new-address?edit=true', { state: item })
                                }
                            >
                                <Pencil size={16} /> Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
