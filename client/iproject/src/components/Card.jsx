import axios from "axios";

export default function Card({ activity, id, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/activity/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      onDelete(id);
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-200 to-teal-300 border-4 border-black rounded-md shadow-md p-6 hover:scale-105 transition-transform flex flex-col items-center">
      <h2 className="text-xl font-bold text-black mb-2 text-center w-44">{activity}</h2>
      <button onClick={handleDelete} className="mt-4 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
        Delete
      </button>
    </div>
  );
}
