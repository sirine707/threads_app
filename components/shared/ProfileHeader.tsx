import Image from "next/image";

interface Params{
    accountId:string;
    authUserId:string;
    name:string;
    username:string;
    imgUrl:string;
    bio:string;
    type?:'User' | 'Community';

}
const ProfileHeader=({
    accountId,
    authUserId,
    name,
    username,
    imgUrl,
    bio,
    type
}:Params)=>{
    return(
        <div className='flex w-full flex-col justify-start'>
            <div className='flex items-center justify-between'>
            <div className="flex gap-4 items-center">
                <div className="relative w-20 h-20 object-cover">
                <Image
                src={imgUrl}
                alt="profile photo"
                fill
                className="rounded-full object-cover shadow-2xl"/>
                </div>
                <div className="flex-1">
                    <h2 className="text-light-1 text-left text-heading3-bold">{name}</h2>
                    <p className="text-gray-1 text-base-medium">@{username}</p> 
                </div>
            </div>
            </div>
            <p className="mt-6 maw-w-lg text-base-regular text-light-2">{bio}</p>
            <div className="mt-12 h-0.5 w-full bg-dark-3"/>
        </div>

    )

}
export default ProfileHeader;