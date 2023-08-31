const Message = ({ role, content }) => {
  const isUserMessage = role === "user";

  return (
    <div
      className={`message flex flex-col ${
        isUserMessage ? "items-end" : "items-start"
      } bg-slate-100 rounded-lg p-2 m-4 hover:shadow-lg`}
    >
      <p
        className={`${
          isUserMessage ? "text-blue-600" : "text-zinc-400"
        } text-sm mb-1`}
      >
        {role}
      </p>
      <p className="text-sm">{content}</p>
    </div>
  );
};

export default Message;
