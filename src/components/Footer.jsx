import { Link } from 'react-router-dom'

const Footer = () => {
  return <footer className='bg-dark text-center'>
      <p>copyright</p>
      <Link to='/about'>footer about</Link>



  </footer>;
};

export default Footer;
