import ProjectForm from "@/components/ProjectForm"
import { redirect } from "next/navigation"

export default async function EditProjectPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const { id } = await searchParams
    if (!id) redirect("/")
    return <ProjectForm type="edit" projectId={id} />
}