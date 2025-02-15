export interface AvatarCardProps {
  user: {
    name?: string;
    photoUrl?: string;
    dateOfBirth?: string;
    bloodGroup?: string;
  };
}

export const selectedUser = {
  name: "John Doe",
  photoUrl: "/user.png",
  dateOfBirth: "30 Years",
  bloodGroup: "O+",
};
