import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import searchimg from './assets/searchimg.png'

function PopulationPerYear(){
    const fetchData = async () => {
        const url = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';
    
        try{
          const response = await fetch(url);
          const result = await response.json()
          const dataValue = result.data.reverse();
          setData(dataValue);
          const filterDataYear = dataValue.map((e: any) => e.Year);
          setYear(filterDataYear);
          console.log(filterDataYear);
        } catch(error){
          console.error(error);
        }
      }
    
      useEffect(() => {
        fetchData();
        console.log(filteredData);
      }, []);

      const [year, setYear] = useState([]);
      const [data, setData] = useState([]);
      const [selectedYear, setSelectedYear] = useState('2013');

      const filteredData = data.filter((e: any) => e.Year === selectedYear);
      

      const handleChangeYear = (e: any) => {
        setSelectedYear(e.target.value);
      }

    return (

<section>
  <Container>
    <Row>
      <Col md={6}>
        <div className="heading">
            <h3>Population per Year</h3>
            <p><em>Please select year population</em></p>
        </div>
        <select className='mb-3 p-1' value={selectedYear} onChange={handleChangeYear}
         style={
            {width:'100px',
             borderRadius:'10px',
             border: '2px solid #ccc'}}
             onMouseEnter={(e: any) => e.target.style.border = '2px solid blue'}
             onMouseLeave={(e: any) => e.target.style.border = '2px solid #ccc'}>
          {year.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
        <div className="display-chart">
        <BarChart 
          width={500}
          height={300}
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
          barSize={50}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis domain={[0, 340000000]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Population" fill="#5479F7" />
        </BarChart>
        </div>
      </Col>
      <Col md={6} className='text-center'>
      <img src={searchimg} className='img-fluid' alt="" />
      </Col>
    </Row>
  </Container>
</section>


    )
    
    
    
}

export default PopulationPerYear;

