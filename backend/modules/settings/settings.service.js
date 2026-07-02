import prisma from "../../src/db.js"
import  createActivity from "../../utils/createActivity.js"

export const updateProfileName = async (userId, name) => {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: Number(userId)
    }
  });

  if (!currentUser) {
    throw new Error("User not found");
  }

  if (!name.trim()) {
    throw new Error("Name is required");
  }

  if (name.trim() === currentUser.name) {
    throw new Error("New name must be different");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: Number(userId)
    },
    data: {
      name: name.trim()
    }
  });

  return updatedUser;
};