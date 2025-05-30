import CreateRoom from "./components/CreateRoom";
import LiveMap from "./components/LiveMap";

const App = () => {
  const users = [
    {
      _id: "1",
      name: "Yuvraj",
      image: "https://randomuser.me/api/portraits/men/10.jpg",
      location: { lat: 14.4426, lng: 79.9865 }, // Nellore center
      message: "This is Yuvraj.",
    },
    {
      _id: "2",
      name: "Riya",
      image: "https://randomuser.me/api/portraits/women/11.jpg",
      location: { lat: 14.446, lng: 79.99 },
      message: "This is Riya.",
    },
    {
      _id: "3",
      name: "Amit",
      image: "https://randomuser.me/api/portraits/men/20.jpg",
      location: { lat: 14.44, lng: 79.98 },
      message: "This is Amit.",
    },
    {
      _id: "4",
      name: "Sneha",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      location: { lat: 14.443, lng: 79.983 },
      message: "This is Sneha.",
    },
    {
      _id: "5",
      name: "Rahul",
      image: "https://randomuser.me/api/portraits/men/30.jpg",
      location: { lat: 14.445, lng: 79.987 },
      message: "This is Rahul.",
    },
    {
      _id: "6",
      name: "Anjali",
      image: "https://randomuser.me/api/portraits/women/31.jpg",
      location: { lat: 14.439, lng: 79.989 },
      message: "This is Anjali.",
    },
    {
      _id: "7",
      name: "Karan",
      image: "https://randomuser.me/api/portraits/men/40.jpg",
      location: { lat: 14.441, lng: 79.982 },
      message: "This is Karan.",
    },
    {
      _id: "8",
      name: "Priya",
      image: "https://randomuser.me/api/portraits/women/41.jpg",
      location: { lat: 14.4435, lng: 79.9855 },
      message: "This is Priya.",
    },
    {
      _id: "9",
      name: "Vikram",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      location: { lat: 14.444, lng: 79.9905 },
      message: "This is Vikram.",
    },
    {
      _id: "10",
      name: "Neha",
      image: "https://randomuser.me/api/portraits/women/51.jpg",
      location: { lat: 14.4465, lng: 79.988 },
      message: "This is Neha.",
    },
  ];

  return (
    <div>
      {/* <LiveMap users={users} /> */}
      <CreateRoom />
    </div>
  );
};
export default App;
