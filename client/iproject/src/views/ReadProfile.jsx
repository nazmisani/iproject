import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchAsync } from "../features/profile/profile-slicer";

export default function ReadProfile() {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);
  console.log(profile);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchAsync());
    }
  }, [dispatch, profile]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <main className="w-full max-w-md bg-gradient-to-br from-yellow-200 to-orange-300 border-4 border-black rounded-md shadow-brutal p-6">
        <h1 className="text-3xl font-bold text-black mb-6 text-center">User Profile</h1>
        {loading ? (
          <p className="text-lg font-bold text-black text-center">Loading...</p>
        ) : error ? (
          <p className="text-lg font-bold text-red-500 text-center">{error}</p>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <div>
              <img
                src={profile?.profile?.imageUrl || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-48 h-48 rounded-full border-4 border-black shadow-md"
              />
            </div>
            <div className="w-full text-center">
              <p className="text-xl font-bold text-black">Username:</p>
              <p className="text-lg text-black">{profile?.profile?.username}</p>
            </div>
            <div className="w-full text-center">
              <p className="text-xl font-bold text-black">Gender:</p>
              <p className="text-lg text-black">{profile?.profile?.gender}</p>
            </div>
            <div className="mt-6">
              <Link
                to="/profile-edit"
                className="px-6 py-2 bg-blue-300 border-2 border-black rounded-md font-bold text-black shadow-brutal hover:bg-blue-400"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
