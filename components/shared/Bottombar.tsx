"use client"
import Link from "next/link";
import Image from "next/image"
import {sidebarLinks} from "@/constants"
import {usePathname,useRouter} from "next/navigation"
import { SignOutButton, SignedIn } from "@clerk/nextjs";
 
function Bottombar(){
    const Pathname=usePathname();
    const Router =useRouter();
    return (
        <section className=" bottombar">
            <div className="bottombar_container ">
            {sidebarLinks.map((link)=>{
                    const isActive= (Pathname.includes(link.route) && link.route.length>1) 
                    || Pathname===link.route;
           
                    return(
                    <Link href={link.route}
                    key={link.label}
                    className={`bottombar_link
                    ${isActive && 'bg-primary-500'}`}> 

                        <Image
                        src={link.imgURL}
                        alt={link.label}
                        height={25}
                        width={25}
                        />
                        <p className='text-subtle-medium text-light-1 max-sm:hidden  '>
                {link.label.split(/\s+/)[0]}
              </p>
                    
                    </Link>
                )}
        

                )}
            </div>
        </section>
    )
}
export default Bottombar;