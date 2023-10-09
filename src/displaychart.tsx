import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



export default function Chart(){

    const fetchData = async () => {
        const url = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';
    
        try{
          const response = await fetch(url);
          const result = await response.json()
          console.log(result);
          const descriptionValue = result.source[0].annotations.source_description;
          console.log(descriptionValue);
          const dataValue = result.data.reverse();
          setData(dataValue);
        } catch(error){
          console.error(error);
        }
      }
    
      useEffect(() => {
        fetchData();
      }, []);
    
      const [data, setData] = useState([]);

      const colors = ['#FF5733', '#FFB533', '#33FF57', '#33B5FF', '#A733FF', '#FF33A7', '#FF3384', '#33FFC6'];
      data.forEach((entry: any, index) => {
        entry.fill = colors[index];
      });

    return (
<section id="chart">
  <Container>
    <Row>
      <Col md={6}>
        <h5 className='text-center'>Line Chart</h5>
        <p className='text-center'><em>Line chart visualizing the population from the year 2013 to 2020.</em></p>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis domain={[0, 400000000]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Population" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </Col>
      <Col md={6}>
        <h5 className='text-center'>Pie Chart</h5>
        <p className='text-center'><em>Pie chart visualizing the population from the year 2013 to 2020.</em></p>
        <PieChart width={600} height={300}>
          <Pie
            dataKey="Population"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label={({ value, payload }) => `Year ${payload.Year} : ${value}`}
          />
          <Tooltip formatter={(value, _name, props) => [`Year : ${props.payload.Year}`, `Population : ${value}`]} />
        </PieChart>
      </Col>
    </Row>
  </Container>
</section>

    )
}