import StockDetail from '@/components/stock-detail'

export default async function Page({ params }: { params: { id: string; years: string } }) {
  return <StockDetail params={params} />
}
