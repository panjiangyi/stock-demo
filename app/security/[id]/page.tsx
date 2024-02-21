
export default async function Page({ params }: { params: { id: string } }) {

    return <>
        <h1>Security</h1>
        <h1>{params.id}</h1>
    </>

}