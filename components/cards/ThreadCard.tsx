import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props{
    id:string;
    currentUserId:string;
    parentId:string |null;
    content:string;
    author: {
        name: string;
        image: string;
        id: string;
      };
    community:{
        id:string;
        name:string;
        image:string;
    }| null;
    createdAt:string;
    comments:{
        author:{
            image:string;
        }


    }[]
    isComment?:boolean;

}
function ThreadCard({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment
}:Props)
{
    return(
        <article className={`flex rounded-2xl flex-col p-7 ${isComment?'px-0 xs:px-7':'bg-dark-2 p-7'}`}>
            <div className=" flex items-start justify-between ">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                            <Image
                            src={author?.image}
                            alt="profile photo"
                            fill
                            className="rounded-full
                            cursor-pointer"
                            />
                        </Link>
                        <div className="thread-card_bar"></div>
                    </div>
                    <div className="flex flex-col w-full">
                    <Link href={`/profile/${author.id}`} className="w-fit">
                        <h4 className="cursor-pointer text-base-semibold text-light-2">{author.name}</h4>
                    </Link>
                        <p className="mt-2 text-small-regular text-light-2">{content}</p>
                        <div className={`{${isComment} && 'mb-5'} flex flex-col gap-3 mt-5`}>
                            <div className="flex gap-5">
                                <Image
                                src='/assets/heart-gray.svg'
                                alt='heart'
                                width={24}
                                height={24}
                                className='cursor-pointer object-contain'
                                />
                                <Link href={`/thread/${id}`}>
                                <Image
                                    src='/assets/reply.svg'
                                    alt='heart'
                                    width={24}
                                    height={24}
                                    className='cursor-pointer object-contain'
                                />
                                </Link>
                                <Image
                                src='/assets/repost.svg'
                                alt='heart'
                                width={24}
                                height={24}
                                className='cursor-pointer object-contain'
                                />
                                <Image
                                src='/assets/share.svg'
                                alt='heart'
                                width={24}
                                height={24}
                                className='cursor-pointer object-contain'
                                />
                            </div>
                            {isComment && comments.length>1 &&(
                                <Link href={`thread/${id}`}>
                                <p>{comments.length}replies</p>
                                </Link>
                                
                            )}

                            

                        </div>
                    </div>

                </div>
                {/*delete thread */}
                {/*show comments logos */}

            </div>
            {!isComment && community && (
                    <Link href={`/communities/${community.id}`}
                    className="mt-5 flex items-center">
                        <p className="text-subtle-medium text-gray-700">{formatDateString(createdAt)}{" "}- {community.name} community</p>
                        <Image
                        src={community.image}
                        alt={community.name}
                        width={12}
                        height={12}
                        className="rounded-full object-cover ml-2"/>
                    
                    </Link>
                )}
            
        </article>
    )


}
export default ThreadCard;