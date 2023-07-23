'use client';

import {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";

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
                        />
                    )}
                    <Input
                        errors={errors}
                        label="Email"
                        register={register}
                        type="email"
                        id='email'
                    />
                    <Input
                        errors={errors}
                        type="password"
                        label="Password"
                        register={register}
                        id='password'
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
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;