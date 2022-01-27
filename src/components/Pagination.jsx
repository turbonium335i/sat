import React from 'react'

const Pagination = ({nextBtn, prevBtn, postsPerPage, 
    totalPosts, paginate, currentPage, maxPageNumberLimit, minPageNumberLimit, goStart, goEnd}) => {
    const pageNumbers = [];

    for(let i=1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pageNumbers.push(i);
    }  
    
    console.log(currentPage,  minPageNumberLimit, maxPageNumberLimit)
 
    var pageNum = pageNumbers.map((number) =>{

        if(number <maxPageNumberLimit+1 && number>minPageNumberLimit){
            return(

        <li key={number} className='page-item'>
                       
            <button onClick={()=> paginate(number)} 
            className={currentPage === number ? 'page-link  bg-light text-dark border-secondary'
            :'page-link  bg-dark text-warning border-secondary'
            }>{number}</button>
            </li>)}

            else{
                return null;
            }
    })

   

    let pageInc = null;
    if (pageNumbers.length > maxPageNumberLimit){
        pageInc =  <button onClick={nextBtn}  className='text-warning bg-dark'>&#187;</button> 

    }

    let pageDec = null;
    if (minPageNumberLimit >=1){
        pageDec =  <button onClick={prevBtn} className='text-warning bg-dark'>&#171;</button> 

    }


    return (
        <div>
            <nav>
                <ul className='pagination'>
                <button className='text-warning bg-dark' onClick={()=> goStart()}>FIRST</button>
                <button onClick={prevBtn} disabled={currentPage === pageNumbers[0] ? true : false} className='text-warning bg-dark'>PREV</button>

                    {pageDec}
                    {pageNum}  
                    {pageInc}
               
    
               <button onClick={nextBtn} disabled={currentPage === pageNumbers[pageNumbers.length-1] ? true : false } className='text-warning bg-dark'>NEXT</button>
                <button className='text-warning bg-dark' onClick={()=> goEnd(pageNumbers[pageNumbers.length -1])}>END</button>
                </ul>
                
            </nav>
            Ref Tests: {totalPosts} &nbsp; {currentPage}/{pageNumbers.length} 

        </div>
        
    )
}

export default Pagination