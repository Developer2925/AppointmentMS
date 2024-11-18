import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relatedDoc, setRelatedDoc] = useState([]);
  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doctor) => doctor.speciality === speciality && doctor._id !== docId
      );
      setRelatedDoc(doctorsData);
    }
  }, [doctors, docId, speciality]);
  return (
    <>
      <div
        id=""
        className="flex flex-col items-center gap-4 py-16 text-gray-900"
      >
        <h1 className="text-3xl font-medium">Related Doctors</h1>
        <p className="text-center text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {relatedDoc.slice(0, 5).map((doctor, index) => (
            <div
              onClick={() => {
                navigate(`/appointment/${doctor._id}`);
                scrollTo(0, 0);
              }}
              key={index}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer 
              hover:translate-y-[-10px] transition-all duration-500"
            >
              <img src={doctor.image} alt="" className="bg-blue-50" />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${
                    doctor.available ? "text-green-500" : "text-gray-500"
                  } `}
                >
                  <div
                    className={`w-2 h-2 ${
                      doctor.available ? "bg-green-500" : "bg-gray-500"
                    } rounded-full`}
                  ></div>
                  <p>{doctor.available ? "Available" : "Not available"}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">
                  {doctor.name}
                </p>
                <p className=" text-gray-600 text-sm">{doctor.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedDoctors;
