

export const Collection = ({name, images,setFullScreenImage}) =>{
    return(
        <div className='showcase-card'> 
          <div className='showcase'>
            <div className={`left-side-showcase ${images.length == 1 ? 
              'onepic' : images.length == 2 ? 'twopic' : ''}`}>
              {images.map((image,index) => (
                <div key={index} className={`showcase-${index+1}`}>
                <img className={`default-photo-${index+1}`} src={image} onClick={()=>setFullScreenImage(image)}/>
              </div>
              ))}
            </div>
          </div>
          <hr></hr>
          <p>{name}</p>
        </div>
    )
}