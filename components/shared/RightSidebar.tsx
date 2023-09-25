import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import {redirect} from "next/navigation"
import UserCard from "../cards/UserCard";
async function  RightSidebar(){
    const user = await currentUser();
    if(!user) return null;
    const similarMinds = await fetchUsers({
        userId: user.id,
        pageSize: 4,
      });
    const result=await fetchCommunities({
         pageSize: 4 
    })
    return (
        <section className="custom-scrollbar rightsidebar">
            <div className="flex flex-1 flex-col justify-start ">
                <h1 className='text-heading4-medium text-light-1'>Suggested Communities</h1>
                {result.communities.length===0 ? (
                    <h1 className="text-light-1">No Communities yet</h1>

                ):(
                <>
                <div className="w-[100] flex flex-col mt-7 ">
                {result.communities.map((community)=>(
                    <UserCard
                    key={community.id}
                    id={community.id}
                    name={community.name}
                    username={community.username}
                    imgUrl={community.image}
                    personType='Community'
                  />

                ))}
                </div>
                </>
                )}
                

            </div>
            <div className="mt-12 h-0.5 w-full bg-gradient-to-r from-green-400 to-blue-500"/>
            <div className="flex flex-1 flex-col justify-start">
                {similarMinds.users.length ?(
                    <>
                    <div className="w-[100] flex flex-col mt-0 ">
                    {similarMinds.users.map((user)=>(
                        <UserCard
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        username={user.username}
                        imgUrl={user.image}
                        personType='User'
                      />
    
                    ))}
                    </div>
                    </>

                ):(
                    <h1 className="text-light-1">No Users yet</h1>
                )
                }

            
            </div>

        </section>
    )
}
export default RightSidebar;