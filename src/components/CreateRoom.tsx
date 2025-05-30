import { useEffect, useState } from "react";
import LiveMap from "./LiveMap"; // Adjust the import path if needed

type Location = {
  lat: number;
  lng: number;
};

type User = {
  _id: string;
  name: string;
  image: string;
  location: Location;
  message: string;
};

type Room = {
  id: string;
  code: string;
  users: User[]; // Multiple users
};

const CreateRoom = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [room, setRoom] = useState<Room | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = pos.coords;
        setLocation({ lat: coords.latitude, lng: coords.longitude });
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Unable to access your location.");
      }
    );
  }, []);

  const generateUser = (): User => ({
    _id: "user-" + Date.now(),
    name: userName,
    image: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`,
    location: location!,
    message,
  });

  const handleCreateRoom = () => {
    if (!userName || !location) return alert("Name and location required");
    setIsCreating(true);

    setTimeout(() => {
      const user = generateUser();
      const roomId = Math.random().toString(36).substring(2, 8);
      const newRoom: Room = {
        id: roomId,
        code: roomId.toUpperCase(),
        users: [user],
      };
      setRoom(newRoom);
      setIsCreating(false);
      setShowCreateModal(false);
    }, 1000);
  };

  const handleJoinRoom = () => {
    if (!userName || !roomCodeInput || !location) {
      return alert("All fields are required");
    }

    const user = generateUser();

    setRoom((prevRoom) => {
      if (prevRoom && prevRoom.code === roomCodeInput.toUpperCase()) {
        return {
          ...prevRoom,
          users: [...prevRoom.users, user],
        };
      }
      // Else create a new room as fallback
      return {
        id: roomCodeInput.toLowerCase(),
        code: roomCodeInput.toUpperCase(),
        users: [user],
      };
    });

    setShowJoinModal(false);
  };

  console.log("room.users", room?.users)

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">MapMate</h1>

      <div className="space-x-4">
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
        >
          Create Room
        </button>

        <button
          onClick={() => setShowJoinModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
        >
          Join Room
        </button>
      </div>

      {room && !showJoinModal && (
        <>
          <div className="mt-6 bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Room Info</h2>
            <p><strong>Room Code:</strong> {room.code}</p>
            <p><strong>Participants:</strong> {room.users.length}</p>
          </div>

          <LiveMap users={room.users} />
        </>
      )}

      {/* Modals */}
      {(showCreateModal || showJoinModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <h2 className="text-xl font-bold mb-4">
              {showCreateModal ? "Create a Room" : "Join a Room"}
            </h2>

            <input
              type="text"
              className="w-full border rounded p-2 mb-3"
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />

            {showJoinModal && (
              <input
                type="text"
                className="w-full border rounded p-2 mb-3"
                placeholder="Enter Room Code"
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value)}
              />
            )}

            <input
              type="text"
              className="w-full border rounded p-2 mb-4"
              placeholder="Add a message (e.g. Hello!)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setShowJoinModal(false);
                }}
                className="text-sm px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={showCreateModal ? handleCreateRoom : handleJoinRoom}
                className={`${
                  showCreateModal ? "bg-green-600" : "bg-blue-600"
                } text-white px-4 py-2 rounded hover:opacity-90`}
              >
                {showCreateModal
                  ? isCreating
                    ? "Creating..."
                    : "Create"
                  : "Join"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
