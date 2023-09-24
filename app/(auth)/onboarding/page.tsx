import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

async function Page() {
    const user= await currentUser()
    const userInfo={}
    const userData={
        id: user?.id,
        ObjectId:userInfo?._id,
        username:userInfo?.username || user?.username,
        name:userInfo?.name || user?.name,
        bio:userInfo?.bio || "" ,
        image: userInfo?.image || user?.imageUrl

    
    }
    return(
        <main className="mx-auto flex flex-col px-10 py-20 
        justify-start max-w-3xl ">
            <div className="flex flex-col ">
                <h1 className="head-text">OnBoarding</h1>
                <p className="pt-3 text-light-2 text-base-regular">Complete your profile now to use threads</p>
            </div>
            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile
                user={userData}
                btnTitle="continue"/>
            </section>
        </main>
    )
    
}
export default Page