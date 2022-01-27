import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react'
import Posts from './components/Posts'
import Pagination from './components/Pagination'
import Footer from './components/Footer'
import About from './components/About'
import Landing from './components/Landing'
import { Navbar, NavDropdown, Nav, Container} from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
 

function App() {

  const [tasks, setTasks] = useState([]);
  var [posts, setPosts] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');
  const [loading, setloading] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [postsPerPage] = useState(10);


  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
 





 
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
      setPosts(tasksFromServer)   
      setloading(false);
      }
      
    getTasks()
    console.log('use effect fired')
    console.log(tasks)
    

  }, [])

  // val.id.toString(). use string search for id 

  if (searchTerm !== ""){

    console.log(searchTerm) 
  
 
    posts = posts.filter((val) =>{

      console.log(val)

      if (val.testName.toLowerCase().includes(searchTerm.trim().toLowerCase()) || val.passage1.toLowerCase().includes(searchTerm) || val.blurb.toLowerCase().includes(searchTerm)     ){
          return val
        }



 
    
  })

    
   

  }  

   
 
 

  const fetchTasks = async () => {
    setloading(true);
    const res = await fetch('http://pertinacity1.pythonanywhere.com/satapi')
    const data = await res.json()

    return data.reverse()

  }

const indexOfLastPost = currentPage * postsPerPage;
const indexofFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexofFirstPost, indexOfLastPost)

const paginate = (pageNumber)=> setcurrentPage(pageNumber);
const goStart = (pageNumber)=> {setcurrentPage(1);
  setmaxPageNumberLimit(5)
  setminPageNumberLimit(0)


};

const goEnd = (pageNumber)=> {setcurrentPage(pageNumber);

  var pagRem = pageNumber % 5
 

 
  
  
  if(pagRem !== 0 ) {
    setmaxPageNumberLimit(pageNumber + (5-pagRem))
    setminPageNumberLimit(pageNumber-pagRem)

  } else{
    setmaxPageNumberLimit(pageNumber)
    setminPageNumberLimit(pageNumber-5)
    
  }
  


};
console.log(currentPage % 5)

const alertPost = (id) => { console.log('postid: ', id)}

const nextBtn = ()=> {
  setcurrentPage(currentPage+1);

  if(currentPage + 1 > maxPageNumberLimit){
    setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
  }
};

const prevBtn = ()=> {
  setcurrentPage(currentPage - 1);

  if((currentPage - 1) % pageNumberLimit === 0){
    setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);

  }
};

 




  return (

      <Router>

    <div className="App">


            <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">EVO3W<span className='text-danger'> SAT</span>.</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>





      <hr className='bg-secondary my-1' />
      <Routes>  
         <Route path='/' element={<Landing />}></Route>
       
        </Routes>
      <Container className="text-start text-light">
        <Container className='py-2 px-0'>
      <input type='text' placeholder='Search...'
                onChange={(e) => {

                  // if (e.target.value == "") {
                  //     setcurrentPage(1)
                  // } 
                  
                  setcurrentPage(1)
                  setmaxPageNumberLimit(5)
                  setminPageNumberLimit(0)
                  setsearchTerm(e.target.value);
                  
                
                }}
            /> 
       
       </Container>  
        <Posts posts={currentPosts} loading={loading} alertPost={alertPost}/>
        <Pagination postsPerPage={postsPerPage} 
        totalPosts={posts.length} 
        paginate={paginate}
        currentPage={currentPage}
        minPageNumberLimit={minPageNumberLimit}
        maxPageNumberLimit={maxPageNumberLimit}
        nextBtn={nextBtn}
        prevBtn={prevBtn}
        goStart={goStart} 
        goEnd={goEnd} 
     
      

        
        />
       
       <Routes>  
         <Route path='/about' element={<About />}></Route>
       
        </Routes>

         <Footer />
          </Container>
    

          
    </div>
    </Router>
  );
}

export default App;
document.body.style = 'background: black;';
