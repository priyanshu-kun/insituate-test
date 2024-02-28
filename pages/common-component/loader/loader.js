'use client';
import Image from 'next/image'
import React from 'react'
import loader from '../../../public/images/loader.svg';

function Loader() {
  return (
    <Image src={loader} width={50} height={50} />        
  )
}

export default Loader