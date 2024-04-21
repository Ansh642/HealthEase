import React, { useState } from 'react';

export default function Question() {
    const [activeIndex, setActiveIndex] = useState(null);

	const handleClick = (index) => {
		setActiveIndex(index === activeIndex ? null : index);
	};

	const accordionData = [
		{
			title: "How Do I book an appointment ?",
			content: "To Book an appointment you need to first login then search for a doctor according to your category and then enter your suitable appointment timings.",
		},
		{
			title: "Can I book an appointment for someone else ?",
			content: "Yes, of course you can book an appointment for someone else you just need to enter their email address and phone number.",
		},
		{
			title: "Can I view past/upcomings appointments",
			content: "Yes to view your upcoming or past appointments you need to click on your profile picture in the navbar section and then go to dashboard.",
		},
	];

  return (
    <div>

        <div className='bg-blue-400 h-[180px] mt-12 w-full mb-16'>
            <div className='flex flex-row justify-evenly items-center'>

            <div className='mt-14'>
            <p className='text-3xl font-inter font-semibold'>2000+</p>
            <p className='text-richblack-300'>Satisfied Patients</p>
            </div>

            <div className='mt-14'>
            <p className='text-3xl font-inter font-semibold'>50+</p>
            <p className='text-richblack-300'>Specialized Services</p>
            </div>

            <div className='mt-14'>
            <p className='text-3xl font-inter font-semibold'>80+</p>
            <p className='text-richblack-300'>Nursing Staff</p>
            </div>

            <div className='mt-14'>
            <p className='text-3xl font-inter font-semibold'>24/7</p>
            <p className='text-richblack-300'>Emergency Care</p>
            </div>

            </div>
        </div>


        <div>
            <p className='font-semibold text-4xl  text-center'>Frequently Asked <span className='text-blue-500'>Questions</span></p>
            <p className='text-gray-600 text-center mx-auto mt-1 w-[40%]'>Find solutions to your common queries about signing up , booking methods , appointment timings and payment related doubts.</p>
        </div>
        <div className="w-[60%] mx-auto mt-9 mb-20">
			{accordionData.map((item, index) => (
				<div className="border-gray-300 mb-3 rounded border-b-[2px]" key={index}>

					<div className="accordion-header bg-white cursor-pointer px-4 py-2" onClick={() => handleClick(index)}>
						{item.title}
					</div>

					<div
						className={`accordion-content bg-white ml-2 font-normal text-blue-600 px-4 pb-4 pt-2 ${
							activeIndex === index ? "block" : "hidden"
						}`}
					>
						{item.content}
					</div>
				</div>
			))}
		</div>
    </div>
  )
}
