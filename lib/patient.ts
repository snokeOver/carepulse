import { ID, Query } from "node-appwrite";
import { account, users } from "./appwrite.config";

interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

export const createUser = async ({ email, phone, name }: CreateUserParams) => {
  try {
    //  console.log(user);
    const newUser = await users.create(
      ID.unique(),
      email,
      phone,
      "zaqwsxza",
      name
    );
    return newUser;
  } catch (error: any) {
    console.log(error);
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", email)]);

      return documents?.users[0];
    }
  }
};
