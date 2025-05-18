'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from "@emailjs/browser";
import { Toaster, toast } from 'sonner'

type EmailParams = {
    to_name: string;
    from_name: string;
    reply_to: string;
    message: string;
};

type FormInput = {
    name: string;
    email: string;
    message: string;
};

export default function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();
    const sendEmail = (params: EmailParams) => {

        const toastId = toast.loading("メッセージを送信中です。")
        emailjs
            .send(
                process.env.NEXT_PUBLIC_SERVICE_ID!,
                process.env.NEXT_PUBLIC_TEMPLATE_ID!,
                params, {
                publicKey: process.env.NEXT_PUBLIC_KEY!,
                limitRate: {
                    throttle: 5000,
                }
            })
            .then(
                () => {
                    toast.success("メッセージを送信しました。返信までしばらくお待ちください。", {
                        id: toastId
                    });
                },
                (error) => {
                    toast.error("メッセージ送信に失敗しました。もう一度お試しください。", {
                        id: toastId
                    });
                },
            );
    }


    const onSubmit: SubmitHandler<FormInput> = (data) => {
        const templateParams = {
            to_name: "Aigake",
            from_name: data.name,
            reply_to: data.email,
            message: data.message,

        }

        sendEmail(templateParams);
    };
    console.log(errors);

    return (
        <>
            <Toaster richColors={true} />
            <form onSubmit={handleSubmit(onSubmit)}
                className='max-w-md w-full flex flex-col items-center justify-center space-y-4'
            >
                <input type="text" placeholder="お名前" {...register("name", {
                    required: 'この項目は入力必須項目です',
                    minLength: {
                        value: 1,
                        message: '最低1文字以上入力してください'
                    },
                    maxLength: {
                        value: 80,
                        message: '80文字以下で入力してください'
                    },
                })}
                    className='w-full p-2 rounded-md shadow-lg text-foregfound focus:outline-none focus:ring-2 focus:ring-accent/50 custom-bg'
                />
                {
                    errors.name && <span className='inline-block self-start text-accent'>{errors.name.message}</span>
                }
                <input type="email" placeholder="Email" {...register("email", { required: 'この項目は入力必須項目です', pattern: /^\S+@\S+$/i })} className='w-full p-2 rounded-md shadow-lg text-foregfound focus:outline-none focus:ring-2 focus:ring-accent/50 custom-bg' />
                {
                    errors.email && <span className='inline-block self-start text-accent'>{errors.email.message}</span>
                }
                <textarea placeholder="メッセージ" {...register("message", {
                    required: 'この項目は入力必須項目です',
                    maxLength: {
                        value: 300,
                        message: "300文字以下でメッセージを入力してください"
                    },
                    minLength: {
                        value: 10,
                        message: "10文字以上でメッセージを入力してください"
                    },
                })} className='w-full p-2 rounded-md shadow-lg text-foregfound focus:outline-none focus:ring-2 focus:ring-accent/50 custom-bg' />
                {
                    errors.message && <span className='inline-block self-start text-accent'>{errors.message.message}</span>
                }
                <input
                    value="✉メッセージ送信"
                    className='px-10 py-4 rouded-md shadow-lg bg-background border border-accent/30 border-solid hover:shadow-glass-xs backdrop-blur-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer capitalize' type="submit" />

            </form>
        </>
    );
}