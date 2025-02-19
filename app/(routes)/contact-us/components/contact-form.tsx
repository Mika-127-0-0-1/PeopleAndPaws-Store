'use client';

import Button from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Input } from "@/components/ui/input";
import { MailIcon, PhoneIcon, PinIcon, SendIcon } from "lucide-react";
import { Heading } from "@/components/ui/Heading";

const formSchema = z.object({
    email: z.string().email(),
    subject: z.string().min(1),
    message: z.string().min(1),
    name: z.string().min(1),
  });
  
  type ContactFormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        
      });

      const onSubmit = async (data: ContactFormValues) => {
        try {
        //   setLoading(true);
          console.log(data);
        } catch (error) {
          toast.error('Something went wrong.');
        } finally {
        //   setLoading(false);
        }
      };

    return (
        <>
            <div className="flex flex-row justify-around">
                <div className="flex flex-col gap-y-2">
                    <div className="flex flex-1 gap-x-2">
                        <PhoneIcon size={20}/> <span><u>Phone number:</u> (+27)76 953 0163</span>
                    </div>
                    <div className="flex flex-1 gap-x-2">
                        <MailIcon size={20}/><span><u>Email:</u> sonet.browne@gmail.com</span>
                    </div>
                    <div className="flex flex-1 gap-x-2">
                        <PinIcon size={20}/> <span><u>Address:</u> Shop 11, Oudewerf, <br/>
                        Galloway St, Sybrand Van Niekerk Park, <br/>
                        Meyerton, 1960</span> 
                    </div>
                </div>
                <div className="flex flex-col">
                    <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3568.2866795846226!2d28.00980552617883!3d-26.575174429186795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e94fbfd62060417%3A0xf1043e7d152db1a1!2sFire%20Fly%20Hobbies!5e0!3m2!1sen!2sza!4v1728802519588!5m2!1sen!2sza" 
                    width="500" 
                    height="400" 
                    className="border-0 hidden lg:inline-block" 
                    // allowFullScreen="" 
                    loading="lazy" 
                    // referrerpolicy="no-referrer-when-downgrade"
                    >
                    </iframe>
                </div>
            </div>
            
            <Heading 
            title="Concats Us form"
            description="Please feel free to send us a message."/>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <div className=" grid grid-cols-2 gap-8 sm:grid-cols-1">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input 
                                        // disabled={loading}
                                        className="w-96" 
                                        placeholder="Jhon Doe "{...field}/>
                                    </FormControl>
                                    <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email address</FormLabel>
                                    <FormControl>
                                        <Input 
                                        // disabled={loading} 
                                        className="w-96"
                                        placeholder="example@mail.com"{...field}/>
                                    </FormControl>
                                    <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input 
                                        // disabled={loading} 
                                        className="w-96"
                                        placeholder="The message Subject"{...field}/>
                                    </FormControl>
                                    <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Message</FormLabel>
                            <FormControl>
                            <textarea
                                {...field}
                                // disabled={loading}
                                placeholder="Your message here..."
                                className="textarea w-full h-32 border border-black rounded-md p-2"
                            />
                            </FormControl>
                            <FormMessage />
                    </FormItem>
                    )}
                />
                <Button 
                // disabled={loading} 
                className="ml-auto flex flex-1" type="submit">
                <SendIcon size={20}/> Send message
                </Button>
            </form>
            </Form>
        </>
    )
}

export default ContactForm;