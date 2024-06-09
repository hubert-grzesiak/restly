import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { FormSchema } from "@/app/become-a-host/components/HostForm.schema";

const createObject = async (data: typeof FormSchema) => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return null;
    }

    await db.user.create({
        data: {
            ...data,
            email: session.user.email as string,
        },
    });



  } catch (error: any) {
    return null;
  }
};

export default createObject;
