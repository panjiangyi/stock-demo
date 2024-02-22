'use server'

import { fetchWithQueryParams } from "@/utils/fetch";


export default async function Test({ params }: { params: { id: string } }) {
    return <>
        <h1>{params.id}</h1>
    </>
}