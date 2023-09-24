import UserCard from "@/components/cards/UserCard";
import PostThread from "@/components/forms/PostThread";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import {redirect} from "next/navigation"
import { any } from "zod";

async function Page() {
    const user = await currentUser();
    if(!user) return null;
    const userInfo=await fetchUser(user.id);
    if(!userInfo?.onboarded) redirect("/onboarding");
    const result=await fetchUsers({
      userId:user.id,
      searchString : "",
      pageNumber : 1,
      pageSize : 20,
    })

  return (
    <section>
      <div>
        {result.users.length===0?
        (<p>There is no users</p>):
        (
        <>
        {result.users.map((person)=>
        (
          <UserCard
          key={person.id}
          id={person.id}
          name={person.name}
          username={person.username}
          imgUrl={person.image}
          personType='User'
        />
        ))}
        </>
        )
        
        }
      </div>
    </section>
  )
}

export default Page;
