"use client"
import Link from "next/link";
import Image from "next/image"
import {sidebarLinks} from "@/constants"
import {usePathname,useRouter} from "next/navigation"
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";

function LeftSidebar(){
    const Pathname=usePathname();
    const Router =useRouter();
    const {userId}=useAuth()
    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex flex-1 w-full flex-col gap-6 px-6">
                {sidebarLinks.map((link)=>{
                    const isActive= (Pathname.includes(link.route) && link.route.length>1) 
                    || Pathname===link.route;
                    if(link.route==="/profile"){
                      link.route=`${link.route}/${userId}`
                    }
                    
                    return(
                    <Link href={link.route}
                    key={link.label}
                    className={`leftsidebar_link
                    ${isActive && 'bg-primary-500'}`}> 

                        <Image
                        src={link.imgURL}
                        alt={link.label}
                        height={25}
                        width={25}
                        />
                    <p className="text-light-1 max-lg:hidden">{link.label}</p>
                    </Link>
                )}
        

                )}


            </div>
            <div className="mt-10 flex justify-start px-6 ">
            <SignedIn>
            <SignOutButton signOutCallback={()=>Router.push("/sign-in")}>
              <div className='flex cursor-pointer gap-4 p-4'>
                <Image
                  src='/assets/logout.svg'
                  alt='logout'
                  width={24}
                  height={24}
                />
                <p className="text-light-2 max-lg:hidden ">Logout</p>
              </div>
            </SignOutButton>
          </SignedIn>
            </div>
        </section>
    )
}
export default LeftSidebar;