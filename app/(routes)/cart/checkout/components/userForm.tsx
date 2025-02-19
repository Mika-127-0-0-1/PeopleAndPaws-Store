"use client";

import React, { useEffect } from 'react'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Input } from "@/components/ui/input";
import Button from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useSearchParams } from 'next/navigation';
import useCart from '@/hooks/use-cart';
import crypto from "crypto";

const formSchema = z.object({
    firstname: z.string().min(1),
    lastname: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(10).max(10),
    company: z.string().optional(),
    vatNumber: z.string().optional(),
    streetAddress: z.string().min(1),
    flatNO: z.string().optional(),
    country: z.string().min(1),
    province: z.string().min(1),
    city: z.string().min(1),
    suburb: z.string().min(1),
    postal: z.string().min(4).max(4),
    SHstreetAddress: z.string().min(1).optional(),
    SHflatNO: z.string().optional().optional(),
    SHcountry: z.string().min(1).optional(),
    SHprovince: z.string().min(1).optional(),
    SHcity: z.string().min(1).optional(),
    SHsuburb: z.string().min(1).optional(),
    SHpostal: z.string().min(4).max(4).optional(),
    message: z.string().optional(),
    shipping: z.string(),
});

const provinces = [
    { id: "EC", name: "Eastern Cape" },
    { id: "FS", name: "Free State" },
    { id: "GP", name: "Gauteng" },
    { id: "KZN", name: "KwaZulu-Natal" },
    { id: "LP", name: "Limpopo" },
    { id: "MP", name: "Mpumalanga" },
    { id: "NC", name: "Northern Cape" },
    { id: "NW", name: "North West" },
    { id: "WC", name: "Western Cape" }
  ];
  
type ContactFormValues = z.infer<typeof formSchema>;

const UserForm = () => {
    const items = useCart((state) => state.items);
    const searchParams = useSearchParams();
    const removeAll = useCart((state) => state.removeAll);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            shipping: "Billing",
        },
    });

    const Wshipping = form.watch("shipping"); // Watch the selected shipping value


    useEffect(() => {
        if(searchParams.get("success")) {
            toast.success("Order Placed.");
            removeAll();
        }

        if(searchParams.get("canceled")) {
            toast.error("Something went wrong.");
        }
    }, [searchParams, removeAll]);

    // Ensure a 256-bit (32-byte) encryption key
    const secretKey = crypto.createHash("sha256").update(process.env.ENCRYPTION_SECRET || "sk_test_ThDgaPIeTfMIWmoijn4MHEoCi8zH6g1mb80WQuYBfg").digest(); // Converts to 32-byte Buffer
    const iv: Buffer = crypto.randomBytes(16); // 16-byte IV for AES-256
    // Encryption function
    const encryptData = (data: object): { encrypted: string; iv: string } => {
        if (!Buffer.isBuffer(secretKey) || secretKey.length !== 32) {
        throw new Error("Invalid encryption key: Must be a 32-byte Buffer");
        }
        // console.log(secretKey);
        if (!Buffer.isBuffer(iv) || iv.length !== 16) {
        throw new Error("Invalid IV: Must be a 16-byte Buffer");
        }
    
        const cipher = crypto.createCipheriv("aes-256-ctr", secretKey, iv); // ✅ Correct mode & params
        let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
        encrypted += cipher.final("hex");
    
        return { encrypted, iv: iv.toString("hex") }; // Store IV as hex
    };

    const onSubmit = async (data: ContactFormValues) => {
        try {
            // Encrypt user-sensitive data
            const encryptedData = encryptData(data);
            // console.log(data);

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
                productIds: items.map((item) => item.id),
                encryptedData
            });

            window.location = response.data.url;

        } catch (error) {
            toast.error('Something went wrong.');
        } finally {
        //   setLoading(false);
        }
    };
    // Perhaps auto generated invoises and Quotes? 
    // Admin panel accepting Invoice will then lead to products being subtracted...?

  return (
    <div className='w-full lg:col-span-7'>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                <h1 className='text-xl font-bold text-black'> Contact Details</h1>
                <div className="grid grid-cols-2 gap-8">
                    <FormField 
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                                <Input 
                                    // disabled={loading} 
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField 
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                                <Input 
                                    // disabled={loading} 
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField 
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                    // disabled={loading} 
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField 
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            {/* TODO: Phone number dropdown list */}
                            <FormControl>
                                <Input 
                                    // disabled={loading} 
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                <h1 className='text-xl font-bold text-black'> Company Details (Optional)</h1>
                <div className="grid grid-cols-2 gap-8">
                    <FormField 
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company Name</FormLabel>
                            <FormControl>
                                <Input 
                                    // disabled={loading} 
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField 
                    control={form.control}
                    name="vatNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Vat Number</FormLabel>
                            <FormControl>
                                <Input 
                                    // disabled={loading} 
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                <h1 className='border-t text-xl font-bold text-black'> Shipping method</h1>
                <Controller
                    name="shipping"
                    control={form.control}
                    render={({ field }) => (
                    <RadioGroup 
                        value={field.value} // Ensure value is controlled
                        onValueChange={field.onChange} // Handle state change
                    >
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Billing" id="option-one" />
                        <Label htmlFor="option-one">
                            Shipping address is the same as billing address
                        </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Shipping" id="option-two" />
                        <Label htmlFor="option-two">
                            Shipping address differs from billing address
                        </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Collect" id="option-three" />
                        <Label htmlFor="option-three">Collect at...</Label>
                        </div>
                    </RadioGroup>
                    )}
                />
                
                {/* Conditionally Render Address Fields if "Shipping" is selected */}
                {Wshipping === "Shipping" && (
                    <>
                        <h1 className='text-xl font-bold text-black'> Shipping Address (for invoice)</h1>
                        <FormField 
                            control={form.control}
                            name="SHstreetAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Street Address</FormLabel>
                                    <FormControl>
                                        <Input 
                                            // disabled={loading} 
                                            {...field}
                                            // {...form.register("streetAddress")}
                                            />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        <FormField 
                            control={form.control}
                            name="SHflatNO"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Appartment, Suit, Flat no. (optional)</FormLabel>
                                    <FormControl>
                                        <Input 
                                            // disabled={loading} 
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        <div className="grid grid-cols-2 gap-8">
                        <FormField 
                            control={form.control}
                            name="SHcountry"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input 
                                            // disabled={loading} 
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField 
                            control={form.control}
                            name="SHprovince"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Province</FormLabel>
                                    <FormControl>
                                    <Select 
                                        // disabled={loading} 
                                        value={field.value} 
                                        onValueChange={field.onChange} 
                                        defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} placeholder="Select a Province" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {provinces.map((province) => (
                                                    <SelectItem
                                                    key={province.id}
                                                    value={province.name}>
                                                        {province.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField 
                            control={form.control}
                            name="SHcity"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                        <Input 
                                            // disabled={loading} 
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField 
                            control={form.control}
                            name="SHsuburb"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Suburb</FormLabel>
                                    <FormControl>
                                        <Input 
                                            // disabled={loading} 
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField 
                            control={form.control}
                            name="SHpostal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal code</FormLabel>
                                    <FormControl>
                                        <Input 
                                            // disabled={loading} 
                                            {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                    </>
                )}
                <h1 className='text-xl font-bold text-black'> Billing Address (for invoice)</h1>
                <FormField 
                    control={form.control}
                    name="streetAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                                <Input 
                                    // disabled={loading} 
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                <FormField 
                    control={form.control}
                    name="flatNO"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Appartment, Suit, Flat no. (optional)</FormLabel>
                            <FormControl>
                                <Input 
                                    // disabled={loading} 
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                <div className="grid grid-cols-2 gap-8">
                <FormField 
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input 
                                    // disabled={loading} 
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField 
                    control={form.control}
                    name="province"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Province</FormLabel>
                            <FormControl>
                            <Select 
                                // disabled={loading} 
                                value={field.value} 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue defaultValue={field.value} placeholder="Select a Province" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {provinces.map((province) => (
                                            <SelectItem
                                            key={province.id}
                                            value={province.name}>
                                                {province.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField 
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input 
                                    // disabled={loading} 
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField 
                    control={form.control}
                    name="suburb"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Suburb</FormLabel>
                            <FormControl>
                                <Input 
                                    // disabled={loading} 
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField 
                    control={form.control}
                    name="postal"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Postal code</FormLabel>
                            <FormControl>
                                <Input 
                                    // disabled={loading} 
                                    {...field}/>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                </div>
                <h1 className='text-xl font-bold text-black border-t'>Message to seller or Cuirier (Optional)</h1>
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
                    className="ml-auto" type="submit">
                    Continue
                </Button>
            </form>
        </Form>  
    </div>
  )
}

export default UserForm;