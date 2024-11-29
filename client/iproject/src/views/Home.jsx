import axios from "axios";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsync } from "../features/activity/activity-slicer";
import { useEffect, useState } from "react";

export default function Home() {
  const { activities: initialActivities, loading } = useSelector((state) => state.activity);
  const [activities, setActivities] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsync());
  }, [dispatch]);

  useEffect(() => {
    setActivities(initialActivities);
  }, [initialActivities]);

  const handleDeleteActivity = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/activity/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setActivities((prevActivities) => prevActivities.filter((activity) => activity.id !== id));
      dispatch(fetchAsync());
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-yellow-100 to-pink-100 min-h-screen flex flex-col items-center">
      <main className="px-6 py-8">
        <h1 className="text-4xl font-bold text-black mb-20 text-center">Favorite Activity</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {activities && activities.length > 0 ? (
            activities.map((item) => <Card key={item.id} id={item.id} activity={item.name} onDelete={handleDeleteActivity} />)
          ) : (
            <div className="md:col-start-2 flex justify-center">
              <p className="text-2xl text-center bg-gradient-to-br from-yellow-200 to-pink-200 p-6 rounded-lg shadow-lg border-4 border-black text-black">You don't have any activity</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
