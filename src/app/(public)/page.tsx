import Image from "next/image";
import hopplaLogo from "@/assets/images/logo.png"
import {Button} from "@nextui-org/react";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-24">
            <Image src={hopplaLogo} alt="Hoppla Logo" width={200} height={200}/>
            Hoppla.ge - Coming Soon!!!
            <Button size="lg">
                გაემგზავრე
            </Button>
        </main>
    );
}
