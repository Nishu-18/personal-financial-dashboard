export function Menu({image,menuName,link}){
    return <div className="flex ml-2 p-2 mt-2">
        
        {image}
        <a href={`/${link}`} className="ml-5 ">{menuName}</a>
        

    </div>

}