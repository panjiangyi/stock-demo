
export default async function Page({ params }: { params: { id: string } }) {

    return <>
        <h1>Updates</h1>
        <h1>{params.id}</h1>
    </>

}