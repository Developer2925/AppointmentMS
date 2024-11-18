import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendURL } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fee: profileData.fee,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendURL + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);
  return (
    profileData && (
      <>
        <div>
          <div className="flex flex-col gap-4 m-5">
            <div>
              <img
                src={profileData.image}
                alt=""
                className="bg-primary/80 w-full sm:max-w-64 rounded-lg"
              />
            </div>
            <div className="flex-1 border border-stone-100 rounded-lg px-8 py-7 bg-white">
              {/* Doctor's Info: Name, Degree and Experience */}
              <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
                {profileData.name}
              </p>
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <p>
                  {profileData.degree} - {profileData.speciality}
                </p>
                <button className="py-0.5 px-2 border text-xs rounded-full">
                  {profileData.experience}
                </button>
              </div>

              {/* Doctor About */}
              <div>
                <h1 className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">
                  About:
                </h1>
                <p className="text-sm text-gray-600 max-w-[700px] mt-1">
                  {profileData.about}
                </p>
              </div>
              <p className="text-gray-600 font-medium mt-4">
                Appointment fee:{" "}
                <span className="text-gray-800">
                  {currency}
                  {isEdit ? (
                    <input
                      type="number"
                      value={profileData.fee}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          fee: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    profileData.fee
                  )}
                </span>
              </p>
              <div className="flex gap-2 py-2">
                <h1>Address:</h1>
                <p className="text-sm">
                  {isEdit ? (
                    <input
                      value={profileData.address.line1}
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                    />
                  ) : (
                    profileData.address.line1
                  )}{" "}
                  <br />
                  {isEdit ? (
                    <input
                      value={profileData.address.line2}
                      type="text"
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                    />
                  ) : (
                    profileData.address.line2
                  )}
                </p>
              </div>

              <div className="flex gap-1 mt-2">
                <input
                  onChange={() =>
                    isEdit &&
                    setProfileData((prev) => ({
                      ...prev,
                      available: !prev.available,
                    }))
                  }
                  type="checkbox"
                  checked={profileData.available}
                  name=""
                  id=""
                />
                <label htmlFor="">Available</label>
              </div>
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default DoctorProfile;
