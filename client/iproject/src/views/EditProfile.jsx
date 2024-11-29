import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAsync } from "../features/profile/profile-slicer";
import Toastify from "toastify-js";

export default function EditProfile({ base_url }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profile, loading, error } = useSelector((state) => state.profile);

  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState(null);

  // Load profile data on mount or when profile state changes
  useEffect(() => {
    if (!loading && !profile) {
      dispatch(fetchAsync({ base_url, method: "GET" }));
    } else if (profile) {
      setUsername(profile?.username || "");
      setGender(profile?.gender || "");
    }
  }, [profile, loading, dispatch, base_url]);

  // Handle file selection and validation
  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    if (selectedFile && ["image/png", "image/jpeg"].includes(selectedFile.type)) {
      setFile(selectedFile);
    } else {
      Toastify({
        text: "Please upload a valid image file (PNG or JPEG).",
        duration: 3000,
        style: { background: "#F87171", color: "black" },
      }).showToast();
    }
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !gender) {
      Toastify({
        text: "Please fill in all required fields.",
        duration: 3000,
        style: { background: "#F87171", color: "black" },
      }).showToast();
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("gender", gender);
      if (file) formData.append("file", file);

      const response = await dispatch(fetchAsync({ base_url, method: "PUT", body: formData }));

      console.log("API Response: ", response); // Debugging API response

      if (response.type.endsWith("fulfilled")) {
        Toastify({
          text: "Profile updated successfully!",
          duration: 3000,
          style: { background: "#008000" },
        }).showToast();
        navigate("/profile-read");
      } else {
        throw new Error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Toastify({
        text: error.message || "Failed to update profile.",
        duration: 3000,
        style: { background: "#F87171", color: "black" },
      }).showToast();
    }
  }

  // Render UI
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen flex items-center justify-center">
      <main className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-yellow-200 to-orange-300 border-4 border-black rounded-md p-6 shadow-brutal">
          <div className="mb-4">
            <label htmlFor="username" className="block text-black font-bold mb-2">
              Username
            </label>
            <input type="text" id="username" name="username" className="w-full px-4 py-2 border-2 border-black rounded-md shadow-inner focus:outline-none" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block text-black font-bold mb-2">
              Gender
            </label>
            <select id="gender" name="gender" className="w-full px-4 py-2 border-2 border-black rounded-md shadow-inner focus:outline-none" value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="" disabled>
                Select your gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block text-black font-bold mb-2">
              Upload New Image
            </label>
            <input type="file" id="file" name="file" className="w-full px-4 py-2 border-2 border-black rounded-md shadow-inner focus:outline-none" onChange={handleFileChange} />
          </div>
          <button type="submit" className="w-full px-4 py-2 bg-blue-300 border-2 border-black rounded-md font-bold text-black shadow-brutal hover:bg-blue-400">
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
}
