"use client";  

import Container from "@/components/ui/container";
import { useRouter } from 'next/navigation';
import {
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import MyDocument from "./components/pdf";
import Button from "@/components/ui/button";
import { DownloadIcon, HouseIcon } from "lucide-react";

const InvoicePage = () => {
    const routes = useRouter();


  return (
    <div className="max-w-2xl mx-auto my-10">
      <div className="w-full h-[500px]">
        <PDFViewer width="100%" height="100%">
          <MyDocument />
        </PDFViewer>
      </div>
      <div className="mt-6 flex justify-center">
        <PDFDownloadLink document={<MyDocument />} fileName="invoice.pdf">
          <Button 
            className="ml-auto flex flex-1" type="submit">
            <DownloadIcon size={20}/> Download PDF
          </Button>
        </PDFDownloadLink>
        <Button 
            className="ml-auto flex flex-1" type="submit">
            <HouseIcon size={20}/> Return to home page
        </Button>
      </div>
    </div>
  )
}

export default InvoicePage;