import style from "@/css/Lowerheader.module.css"
import Link from "next/link"
import Image from "next/image"
export default function Home() {
  return(  <>
    <header className={style.header}>
    <div className={style.container}>
        <h1 className={style.logo}>Hekto</h1>

        <ul className={style.ul}>
            <li className={style.li}> <Link className={style.links} href="../" > Home </Link></li>
            <li className={style.li}> <Link className={style.links} href="../ShopGrid" > Products </Link></li>
            <li className={style.li}> <Link className={style.links} href="../About" > About</Link></li>
            <li className={style.li}> <Link className={style.links} href="../Contact" > Contact </Link></li>
            <li className={style.li}> <Link className={style.links} href="../Faqs" > FAQs </Link></li>
        </ul>
        <div className={style.search}>
            <input className={style.input} type="search" placeholder="Search..."/>
      <Image className={style.image} src="/img/sear.png" alt="image" width="20" height={20} ></Image>
            
        </div>
    </div>
    </header>
    </>
  )
}