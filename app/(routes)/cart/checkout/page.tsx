"use client";  

import { useEffect, useState } from 'react'
import Container from "@/components/ui/container";
import ListSummary from './components/listSummary';
import UserForm from './components/userForm';

const CheckoutPage = () => {
    const [isMounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if(!isMounted) {
        return null;
    }

  return (
    <div>
        <div className="bg-white">
            <Container>
                <div className="px-4 py-5 sm:px-6 lg:px-8">
                    {/* <h1 className="text-3xl font-bold text-black"> Details </h1> */}
                    <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
                        <div className="lg:col-span-5">
                            <ListSummary />
                        </div>
                        <UserForm />
                    </div>
                        
                </div>
            </Container>
        </div>
    </div>
  )
}

export default CheckoutPage;
