'use client';

import {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "@/app/(site)/components/AuthSocialButton";
import {BsGithub, BsGoogle} from "react-icons/bs";

type Variant = 'login' | 'register';

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('login');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const toggleVariant = useCallback(() => {
        if (variant === 'login') {
            setVariant('register');
        } else {
            setVariant('login');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'register') {
            // Register
        }

        if (variant === 'login') {
            // Login
        }
    };

    const socialAction = (action: string) => {
        setIsLoading(true);
        // social sign in
    };

    return (
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                <form
                    className='space-y-6'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'register' && (
                        <Input
                            errors={errors}
                            label="Name"
                            register={register}
                            id='name'
                            disabled={isLoading}
                        />
                    )}
                    <Input
                        errors={errors}
                        label="Email"
                        register={register}
                        type="email"
                        id='email'
                        disabled={isLoading}
                    />
                    <Input
                        errors={errors}
                        type="password"
                        label="Password"
                        register={register}
                        id='password'
                        disabled={isLoading}
                    />
                    <div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type='submit'
                        >
                            {variant === 'login' ? 'Sign in' : 'Register'}
                        </Button>
                    </div>
                </form>
                <div className='mt-6'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className="w-full border-t border-gray-300"/>
                        </div>
                        <div className="relative flex justify-center text-sm leading-5 px-2">
                            <span className="bg-white px-2 text-gray-500 select-none">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />
                    </div>

                    <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                        <div className='select-none'>
                            {variant === 'login' ? 'Don\'t have an account?' : 'Already have an account?'}
                        </div>
                        <div
                            onClick={toggleVariant}
                            className="cursor-pointer hover:text-gray-900 font-bold select-none"
                        >
                            {variant === 'login' ? 'Register' : 'Sign in'}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AuthForm;