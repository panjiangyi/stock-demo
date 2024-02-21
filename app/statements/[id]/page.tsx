'use server'
async function getData() {
    const res = await fetch('http://calapi.inadiutorium.cz/api/v0/en/calendars/general-en/today')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.



    return res.json()
}
export default async function Test({ params }: { params: { id: string } }) {
    const data = await getData();
    return <>
        <h1>{params.id}</h1>
        <h1>{JSON.stringify(data)}</h1></>
}