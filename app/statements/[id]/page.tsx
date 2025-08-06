import StockDetail from '@/components/stock-detail'

export default async function Page({ params }: { params: { id: string } }) {
  return <StockDetail />
}
