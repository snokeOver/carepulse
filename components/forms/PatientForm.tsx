"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import CustomFormField from "../shared/CustomFormField";
import { FormFieldTypes } from "@/interfaces/enums";
import SubmitButton from "../shared/SubmitButton";
import { useState } from "react";
import { UserFormSchema } from "@/lib/schemas";
import { useRouter } from "next/navigation";

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async ({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormSchema>) => {
    setIsLoading(true);

    try {
      const user = await createSecureServer({ name, email, phone });
      if (user) {
        router.push(`/patients/${user.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormField
          control={form.control}
          inputType={FormFieldTypes.INPUT}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          control={form.control}
          inputType={FormFieldTypes.INPUT}
          name="email"
          label="Email"
          placeholder="dohndoe@gmail.com "
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          control={form.control}
          inputType={FormFieldTypes.PHONE_INPUT}
          name="phone"
          label="Phone Number"
          placeholder="(555) 123-4567"
        />

        <SubmitButton isLoading={isLoading}>Get Sarted</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
