import { Button } from 'react-bootstrap';
import Header from '../header/Header';

const CoverPage = () => {
  return (
    <div>
      <Header />
      <h1>Saturno</h1>
      <h2>Cinema</h2>
      <p>Experimenta el cine como en los años 80. Donde cada película es una aventura y cada proyección una experiencia única.</p>
      <Button variant='danger rounded-pill'>VER CARTELERA</Button>  <Button variant='outline-primary rounded-pill'>CONOCE MAS</Button>
    </div>
  )
}

export default CoverPage;