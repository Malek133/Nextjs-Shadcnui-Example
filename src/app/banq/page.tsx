import BankTransactions from '@/components/bank-transactions'
import { Header } from '@/components/Header'
import React from 'react'

const page = () => {
  return (
    <div className='w-1/2 mx-auto my-5'>
        <Header />
      <BankTransactions />
    </div>
  )
}

export default page
