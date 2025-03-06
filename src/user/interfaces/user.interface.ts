export interface UserInterface {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  active: boolean;
  salt: string;
  createdAt: Date;
  updatedAt: Date;
}
