const Message = ({ role, content }) => {
  const isUserMessage = role === "user";

  return (
    <div
      className={`message flex flex-col ${
        isUserMessage ? "items-end ml-80" : "items-start mr-80"
      } bg-slate-100 rounded-lg p-2 m-4 hover:shadow-lg transition`}
    >
      <p
        className={`${
          isUserMessage ? "text-blue-600" : "text-zinc-400"
        } text-sm mb-1 first-letter:uppercase`}
      >
        {role}
      </p>
      <p className="text-sm">{content}</p>
    </div>
  );
};

export default Message;
