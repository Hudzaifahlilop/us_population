import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import background from './assets/background.png';
import { useEffect, useState } from 'react';


function Hero () {
    const fetchData = async () => {
        const url = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';
    
        try{
          const response = await fetch(url);
          const result = await response.json()
          console.log(result);
          const header = result.source[0].annotations.source_name;
          console.log(header);
          setHeaderName(header);
          const descriptionValue = result.source[0].annotations.source_description;
          console.log(descriptionValue);
          setTextDescriptions(descriptionValue);
        } catch(error){
          console.error(error);
        }
      }
    
      useEffect(() => {
        fetchData();
      }, []);
    
      const [headerName, setHeaderName] = useState('');
      const [textDescriptions, setTextDescriptions] = useState('');


    return (
    <section id="hero" className='d-flex align-items-center' style={{
        height:'100vh'
    }}>
    <Container fluid="md" className=''>
        <Row className='border'
            style={
                { borderRadius: '15px',
                  backgroundColor: '#EBF3FE',
            
            }}
        >
          <Col md={6} className='d-flex align-items-center justify-content-start' >
        
            <div className="header" >
            <h1 className='text-center'>{headerName}</h1>
            <p className='px-3 my-4'>{textDescriptions}</p>
            </div>

          </Col>
          <Col md={6} className='text-center p-3' >
            <img src={background} className='img-fluid' alt="" />
          </Col>
        </Row>
    </Container>
    </section>
    )
}

export default Hero;