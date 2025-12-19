// 960d1f7e4849e1d224de3dc082034e17

import logo from '../assets/logo.png';
import search1 from '../assets/search1.png';
import location from '../assets/location.jpg';
const Nav = () => {
  return (
    <div className="m-4">
        <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            {/* Logo Section */}
            <img src={logo} alt='logo' className='w-15 select-none '/>
            {/* search bar*/}
            <form className='relative flex items-center w-full max-w-md bg-white rounded-lg shadow-md '>
                <img src={search1} alt='search' className='absolute left-3 w-4 h-4 text-gray-400 select-none'/>
                <input 
                  type="text" 
                  placeholder="Search for city or country" 
                  className="w-full py-2 pl-10 pr-4 text-sm text-black placeholder-gray-400 border-none rounded-lg outline-none"
                />
                <button className='bg-[#050e1fde] text-white px-5 py-2'>Search</button>
            </form>
            {/* current location button */}
            <div className="flex gap-3 items-center px-4 py-2 text-sm font-medium text-white bg-green-500 rounded cursor-pointer">
                <img src={location} alt='location' className='w-5 h-5'/>
                <p>Current Location</p>
            </div>
        </div>
         
    </div>
  )
}

export default Nav