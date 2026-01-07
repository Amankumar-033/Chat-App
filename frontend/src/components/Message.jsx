import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const { authUser, selectedUser } = useSelector((store) => store.user);

  const date = new Date(message?.createdAt);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  return (
    <div
      className={`chat ${
        authUser?._id === message.senderId ? "chat-end" : "chat-start"
      }`}
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              message.senderId === authUser?._id
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50 text-white">{formattedTime}</time>
      </div>
      <div
        className={`chat-bubble ${
          authUser?._id === message.senderId
            ? "bg-sky-500 text-white"
            : "bg-gray-700 text-white"
        }`}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;
