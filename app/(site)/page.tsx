import Image from "next/image";
import AuthForm from "@/app/(site)/components/AuthForm";

export default function Home() {
    return (
        <div
        className="flex min-h-full flex-col justify-center py-12 bg-gray-100
        sm:px-6
        lg:px-8
        ">
            <div className="
            sm:mx-auto
            sm:w-full
            sm:max-w-md">
                <Image height="48" width="48" className="mx-auto w-auto pointer-events-none" src="/images/logo-cine.png" alt="Logo"/>
                <h2 className="select-none draggable-false mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            {/* Auth */}
            <AuthForm/>
        </div>
    )
}
