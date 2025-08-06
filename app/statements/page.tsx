import StockDetail from './[id]/[years]/page'

export default async function Page({ params }: { params: { id: string } }) {
  return <StockDetail />
}
