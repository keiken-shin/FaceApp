import React from 'react';

const FaceRecognition = ({ box, imgURL }) => {
    return(
        <div className="flex justify-center relative" style={{height: "calc(100vh - 332px)"}}>
            <div className="relative h-full">
                <img 
                    id="inputImg"
                    className="object-contain h-full"
                    src={imgURL} 
                    alt="url_image" 
                />
            </div>
            <div className="absolute top-0 margin-auto" style={{width: box.width, height: box.height}}>
                <div className="relative w-full h-full">
                    <div 
                        className="bounding_box flex flex-wrap justify-center absolute"
                        style={{
                            boxShadow: "0 0 0 3px #149df2 inset", 
                            top: box.topRow,
                            right: box.rightCol,
                            bottom: box.bottomRow, 
                            left: box.leftCol}}    
                    >
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FaceRecognition;