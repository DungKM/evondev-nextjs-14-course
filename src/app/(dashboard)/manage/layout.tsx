import PageNotPound from "@/app/not-found";
import { EUserRole } from "@/components/types/enums";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const AdminLayout =  async  ({ children }: { children: React.ReactNode }) => {
  const { userId, redirectToSignIn } = await auth()
  
  if (!userId) return redirectToSignIn()
    const user = await getUserInfo({ userId: userId! })
  // if(user && user.role !== EUserRole.ADMIN) return <PageNotPound />
  return (
    <div>{children}</div>
  )
}

export default AdminLayout