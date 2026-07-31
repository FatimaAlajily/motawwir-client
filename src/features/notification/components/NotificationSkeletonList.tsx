import NotificationSkeletonItem from "./NotificationSkeletonItem";

type NotificationSkeletonListProps = {
  count?: number;
};

const NotificationSkeletonList = ({
  count = 4,
}: NotificationSkeletonListProps) => {
  return (
    <div>
      {Array.from({ length: count }, (_, i) => (
        <NotificationSkeletonItem key={i} />
      ))}
    </div>
  );
};

export default NotificationSkeletonList;
