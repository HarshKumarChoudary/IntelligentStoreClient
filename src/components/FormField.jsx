import React from 'react'

const FormField = ({ labelName, placeholder, inputType, isTextArea, selectType, value, handleChange }) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">{labelName}</span>
      )}
      {isTextArea ? (
        <textarea 
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      ) : selectType ? (
          <>
            <select
              className="bg-[#1c1c24] mt-4 py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
              name="cars"
              id="cars"
              required
              value={value}
              onChange={handleChange}
            >
              <option value="" disabled className='bg-[#1c1c24]'>Choose the Category</option>
              <option value="image" className='bg-[#1c1c24]'>Image</option>
              <option value="video" className='bg-[#1c1c24]'>Video</option>
              <option value="audio" className='bg-[#1c1c24]'>Audio</option>
            </select>
          </>
      ) :(
        <input 
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  )
}

export default FormField