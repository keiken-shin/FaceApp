import React from 'react';

const Header = ({ onRouteChange, setImgURL }) => {
    return(
        <header className="flex justify-between sticky top-0 py-4 px-6 bg-dark2 z-30">
            <div>
                <p className="text-lg font-bold">FaceApp</p>
            </div>

            <nav>
                <ul className="flex">
                    <li 
                        onClick={() => {onRouteChange('signin'); setImgURL('')}} 
                        className="px-3 py-1 text-sm font-medium border border-gray-300 cursor-pointer"
                    >Logout</li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;