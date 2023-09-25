"use client"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form";
import { ThreadValidation } from "@/lib/validations/thread";
import { Button } from "@/components/ui/button"
import {createThread} from "@/lib/actions/thread.actions";
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
import { Textarea } from "@/components/ui/textarea"
import { usePathname,useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";
import Community from "@/lib/models/community.model";
interface Props{
    user:{
        id:string;
        objectId:string;
        username:string;
        name:string;
        bio:string;
        image:string;
    };
    btnTitle:string;


}

    
function PostThread({userId}:{userId:string}) {
    const pathname=usePathname()
    const router=useRouter()
    const {organization} =useOrganization()
    const form =useForm(
      {
        
        resolver:zodResolver(ThreadValidation),
        defaultValues:{
            thread:"",
            accountId:userId,

      },
    })
    const onSubmit=async(values: z.infer<typeof ThreadValidation>)=> 
    {
      if(!organization){
        await createThread({
          text:values.thread,
          author:userId,
          communityId:null,
          path:pathname
      });
     }
     else{
        await createThread({
          text:values.thread,
          author:userId,
          communityId:organization.id,
          path:pathname
      });
      }
      router.push("/")
      };
    return (
       <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 ">
        <FormField 
            control={form.control}
            name="thread"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start  gap-4 mx-5 ">
                <FormLabel className="text-base-semibold text-light-2">
                Thread 
                </FormLabel>
                <FormControl className="flex-1 text-base text-gray-200 bg-slate-900 no-focus">
                <textarea
                rows={10}
                className="account-form-input no-focus w-full"
                {...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <Button type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 ">Post </Button>

        </form>

       </Form>
    )
}
export default PostThread;  

