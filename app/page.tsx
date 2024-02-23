import { queryStockInfo } from '@/api';
import { redirect } from 'next/navigation'


export default async function Home() {
  const stocks = await queryStockInfo();
  redirect(`/statements/${stocks[0].stock_id}/3`);
}
