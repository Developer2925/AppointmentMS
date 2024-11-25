import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendURL, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fee", Number(fee));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      // Console log formData
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        backendURL + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } }
      ); // 'aToken' will be converted into 'atoken'

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setFee("");
        setAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={onSubmitHandler} action="" className="m-5 w-full">
        <p className="mb-3 text-lg font-medium">Add Doctor</p>
        <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label htmlFor="doc-img">
              <img
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
                alt=""
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
              />
            </label>
            <input
              onChange={(e) => setDocImg(e.target.files[0])}
              type="file"
              name=""
              id="doc-img"
              hidden
            />
            <p>
              Upload doctor <br /> picture
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex flex-1 flex-col gap-1">
                <p>Doctor Name</p>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  required
                  className="border rounded px-3 py-2"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p>Doctor Email</p>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  required
                  className="border rounded px-3 py-2"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p>Doctor Password</p>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  required
                  className="border rounded px-3 py-2"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p>Experience</p>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  name=""
                  id=""
                  required
                  className="border rounded px-3 py-2"
                >
                  <option value="1 Year">1 Year</option>
                  <option value="2 Years">2 Years</option>
                  <option value="3 Years">3 Years</option>
                  <option value="4 Years">4 Years</option>
                  <option value="5 Years">5 Years</option>
                  <option value="6 Years">6 Years</option>
                  <option value="7 Years">7 Years</option>
                  <option value="8 Years">8 Years</option>
                  <option value="9 Years">9 Years</option>
                  <option value="10 Years">10 Years</option>
                  <option value="10+ Years">10+ Years</option>
                </select>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p>Fees</p>
                <input
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  type="number"
                  placeholder="Fees"
                  required
                  className="border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex flex-1 flex-col gap-1">
                <p>Speciality</p>
                <select
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  name=""
                  id=""
                  required
                  className="border rounded px-3 py-2"
                >
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p>Education</p>
                <input
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  type="text"
                  name=""
                  id=""
                  placeholder="Education"
                  required
                  className="border rounded px-3 py-2"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p>Address</p>
                <input
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  type="text"
                  name=""
                  id=""
                  placeholder="Address 1"
                  required
                  className="border rounded px-3 py-2"
                />
                <input
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                  type="text"
                  name=""
                  id=""
                  placeholder="Address 2"
                  required
                  className="border rounded px-3 py-2"
                />
              </div>
            </div>
          </div>
          <div className=" mt-4 mb-2">
            <p>About Doctor</p>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              rows={5}
              placeholder="Write about Doctor"
              required
              className="border w-full px-4 pt-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
          >
            Add doctor
          </button>
        </div>
      </form>
    </>
  );
};

export default AddDoctor;
