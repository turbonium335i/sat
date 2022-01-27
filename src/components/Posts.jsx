import React from 'react'
import {   Popover, OverlayTrigger  } from 'react-bootstrap'



const Example = ({memo, memo2}) => (
    
    <OverlayTrigger trigger="click" placement="top" overlay={
        <Popover id="popover-basic">
        {/* <Popover.Header as="h3" className='bg-dark text-warning'>Memo</Popover.Header> */}
        <Popover.Body className='bg-secondary text-warning'>
        <li>{memo}</li>
      
        <li>{memo2}</li>
        </Popover.Body>
      </Popover>

    }>
        <a style={{cursor:"pointer", color: "red"}} > Notes </a>
    </OverlayTrigger>
  );

const Posts = ({posts, loading, alertPost}) => {
    
   
    if (loading) {
        return <h2>Loading...</h2>;

    }

 
    
        return (
            <ul className='list-group mb-4 '>
                {posts.map((post, x) => (
                        <li key={post.id} className='list-group-item text-light border border-secondary py-1' 
                        style={{backgroundColor:"#080808", cursor:"pointer"}} >
                            <span className='text-warning'>{post.testName}</span> &#8594; {post.passage4}  
                            
                            <hr className='mb-1'/>
                           
                            {post.blurb}
                            <Example memo={post.passage5} memo2={post.passage4}/>
                        </li>
                        
    
                )
                        
                )}
            </ul>
        )
  

}


export default Posts;
