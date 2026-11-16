import { redirect } from "next/navigation";

export default function GuestRedirect() {
  redirect("/login?tab=guest");
}
