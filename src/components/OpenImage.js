

export const OpenImage = ({fullScreenImage,setFullScreenImage}) =>{
    return(
        <div className={`open-image-background ${fullScreenImage === null ? 'not-visible' : ''}`} 
        onClick={()=>setFullScreenImage(null)}>
            <img className="open-image" src={fullScreenImage}></img>
        </div>
    )
}