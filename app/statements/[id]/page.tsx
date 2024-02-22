import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    redirect(`/statements/${params.id}/3`);
}