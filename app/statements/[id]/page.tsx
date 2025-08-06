import StockDetail from './[years]/page'

export default async function Page({ params }: { params: { id: string } }) {
  return <StockDetail />
}
