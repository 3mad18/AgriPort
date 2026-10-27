import { redirect } from "next/navigation";

export default function SecureLoginRedirect() {
  redirect("/ops/login");
}
