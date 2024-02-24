"use client";
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "../ui/modal";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerStep1Schema, registerStep2Schema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import Button from "../ui/button";
import useLoginModal from "@/hooks/useLoginModal";
function RegisterModal() {
  const [step, setStep] = useState(1);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [data, setData] = useState({ name: "", email: "" });

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);
  const body =
    step === 1 ? (
      <RegisterStep1 setData={setData} setStep={setStep} />
    ) : (
      <RegisterStep2 />
    );
  const footer = (
    <div className=" text-neutral-400 text-center mb-4">
      <p>
        Already have an account?
        <span
          className=" text-white cursor-pointer hover:underline pl-2"
          onClick={onToggle}
        >
          Sign in
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      body={body}
      footer={footer}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      step={step}
      totalSteps={2}
    />
  );
}

export default RegisterModal;

function RegisterStep1({
  setData,
  setStep,
}: {
  setData: Dispatch<SetStateAction<{ name: string; email: string }>>;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const form = useForm<z.infer<typeof registerStep1Schema>>({
    resolver: zodResolver(registerStep1Schema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerStep1Schema>) {
    setData(values);
    setStep(2);
  }
  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-0 md:px-12"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-3">
          <Button
            label={"Next"}
            type="submit"
            secondary
            fullWidth
            disabled={isSubmitting}
          />
        </div>
      </form>
    </Form>
  );
}

function RegisterStep2() {
  const form = useForm<z.infer<typeof registerStep2Schema>>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues: {
      password: "",
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerStep2Schema>) {
    console.log(values);
  }
  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-0 md:px-12"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="pt-3">
          <Button
            label={"Register"}
            type="submit"
            secondary
            fullWidth
            disabled={isSubmitting}
          />
        </div>
      </form>
    </Form>
  );
}
