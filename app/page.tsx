import { redirect } from 'next/navigation'
import { mainPage } from './menu';


export default function Home() {
  redirect(mainPage.path);
}
