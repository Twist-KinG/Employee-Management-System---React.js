import React from 'react'

const summaryCard = ({ icon, text, number, color }) => {
    return (
        <div className='flex bg-white rounded h-20'>

            <div className={`text-3xl flex justify-center items-center ${color} text-white px-4`}> {icon} </div>

            <div className='pl-4 py-1'>
                <p className='text-lg font-semibold'>{text}</p>
                <p className='text-xl font-bold'>{number}</p>
            </div>
        </div>
    )
}

export default summaryCard
