"use client";
import React, {FormEvent, useRef} from 'react';
import {signIn} from "next-auth/react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const LoginWithCredentials = () => {
    const email = useRef("");
    const password = useRef("");
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signIn("credentials", {
            redirect: true,
            email: email.current,
            password: password.current,
            callbackUrl: "/"
        })
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true"/>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            ელ.ფოსტა
                        </label>
                        <input id="email-address" name="email" type="email" autoComplete="email"
                               required
                               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm fira-go"
                               placeholder="ელ.ფოსტა"
                               onChange={(e) => (email.current = e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input id="password" name="password" type="password" autoComplete="current-password"
                               required
                               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"
                               placeholder="******"
                               onChange={(e) => (password.current = e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember_me" name="remember_me" type="checkbox"
                               className="h-4 w-4 text-secondary focus:ring-secondary border-gray-300 rounded"/>
                        <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900 fira-go">
                            დამიმახსოვრე
                        </label>
                    </div>
                    <div className="text-sm">
                        <Link href="#" className="font-medium text-secondary hover:text-secondary fira-go">
                            პაროლის აღდგენა
                        </Link>
                    </div>
                </div>
                <div>
                    <Button
                        variant="secondary"
                        size="default"
                        type="submit"
                        className={"w-full"}
                    >
                        ავტორიზაცია
                    </Button>
                </div>
            </form>
        </>
    );
};

export default LoginWithCredentials;
