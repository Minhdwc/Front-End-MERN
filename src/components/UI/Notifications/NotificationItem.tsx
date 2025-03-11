const NotificationItem = ({
  text,
  isRead,
}: {
  text: string;
  isRead: boolean;
}) => {
  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: isRead ? "#f0f0f0" : "#d9f7be",
        borderLeft: isRead ? "4px solid gray" : "4px solid green",
        marginBottom: "8px",
        borderRadius: "5px",
      }}
    >
      <span>{text}</span>
    </div>
  );
};

export default NotificationItem;
