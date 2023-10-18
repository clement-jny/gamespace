"use client"
import Link from 'next/link'
import Image from 'next/image'
import logo from '../images/logo_gamespace.png'


export default function Footer() {

    return (
        <>
            <div className="bg-black flex flex-col items-center absolute bottom-0 w-full  border-2 border-red-950 text-white underline font-bold pt-16 pr-0 pb-8 pl-0   " >

                <div className='flex items-center'>

                    <div className='flex flex-col items-center ml-10'>
                        <h2 className='text-white font-bold mb-2.5'>Nos jeux</h2>
                        <div className='flex flex-col ml-10'>
                            <Link href='/Playstation' > Jeux playstation</Link>
                            <Link href='/Nintendo' > Jeux NINTENDO</Link>
                            <Link href='/XBOX' > Jeux XBOX</Link>

                        </div >
                    </div >

                    <div className='flex flex-col items-center ml-10 '>
                        <h2 className='text-white font-bold mb-2.5'>Aide</h2>

                        <Link href='/Playstation' > Vendre</Link>

                        <Link href='/Playstation' > Acheter</Link>

                    </div>
                </div>

                <section className='w-full items-center'>
                    <div>
                        <Link href='/'>

                            <Image
                                src={logo}
                                height={100}
                                width={100}
                                alt=''
                                className=' ml-20'
                            />

                        </Link>
                    </div>


                </section>




            </div >
        </>
    )

}

