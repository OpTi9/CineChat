'use client';

import {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";

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
                    <input/>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;