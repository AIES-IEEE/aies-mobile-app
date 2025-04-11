"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

interface FormData {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export async function signin(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email as string,
    password: formData.password as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  // Ganti Redirect kalau udh ada
  if (error) {
    redirect("/informasi");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email as string,
    password: formData.password as string,
  };

  const { error } = await supabase.auth.signUp(data);

  // Ganti Redirect kalau udh ada
  if (error) {
    redirect("#");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}
