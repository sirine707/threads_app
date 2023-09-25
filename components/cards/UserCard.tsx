"use client"
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
    id: string;
    name: string;
    username: string;
    imgUrl: string;
    personType: string;
  }
  
function UserCard({ id, name, username, imgUrl, personType }: Props) {
  const router =useRouter()
    return (
    <article className="user-card">
        <div className="user-card_avatar">
            <Image
            src={imgUrl}
            alt="logo"
            width={48}
            height={48}
            className="rounded-full"/>
            <div className="flex-1 text-ellipsis">
                <h4 className="text-base-semibold text-light-1">{name}</h4>
                <p className="text-small-medium text-gray-1">@{username}</p>

            </div>
        </div>
        <Button onClick={()=>{
            router.push(`/profile/${id}`)
        }}
        className="bg-gradient-to-r from-green-400 to-blue-500 px-7">
            View
        </Button>

    </article>
  )
}

export default UserCard
