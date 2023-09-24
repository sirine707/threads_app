"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form";
import { CommentValidation } from "@/lib/validations/thread";
import { Button } from "@/components/ui/button"
import {addCommentToThread} from "@/lib/actions/thread.actions";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { usePathname,useRouter } from "next/navigation";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
interface Params{
    threadId:string,
    currentUserImg:string,
    currentUserId:string

}
const Comment= ({threadId,currentUserImg,currentUserId}:Params)=>{
    
    const pathname=usePathname()
    const router=useRouter()
    const form =useForm(
      {
        
        resolver:zodResolver(CommentValidation),
        defaultValues:{
            thread:"",
           

      },
    })
    const onSubmit=async(values: z.infer<typeof CommentValidation>)=> 
    {
        await addCommentToThread(
            threadId,
            values.thread,
            JSON.parse(currentUserId),
            pathname)
        form.reset();
      }
    ;
    return(
        <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className='comment-form' >
        <FormField 
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex items-center w-full gap-3">
                <FormLabel>
                    <Image
                    src={currentUserImg}
                    alt="profile photo"
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                    />
                </FormLabel>
                <FormControl className=" border-none bg-transparent">
                <input
                type="text"
                placeholder="comment ..."
                className=" no-focus text-light-2 outline-none"
                {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
        />
          <Button type="submit"
          className="comment-form_btn bg-gradient-to-r from-green-400 to-blue-500">Reply</Button>

        </form>

       </Form>
        )

}
export default Comment;