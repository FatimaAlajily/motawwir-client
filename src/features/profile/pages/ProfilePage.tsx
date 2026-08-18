import { useParams } from "react-router-dom";
import ProfileView from "../components/common/ProfileView";

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();

  return <ProfileView userId={id} />;
};

export default ProfilePage;