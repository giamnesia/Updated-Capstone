import { useState } from 'react';
import { MongoClient } from 'mongodb';

function ChartFilter({ chartData }) {
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [filteredData, setFilteredData] = useState(chartData);

    async function handleFilterChange() {
        const client = await MongoClient.connect('mongodb://localhost:27017');
        const db = client.db('mydb');
        const collection = db.collection('chartdata');
        let query = {};
        
        if(colors.length > 0) {
            query = {...query, color: { $in: colors }};
        }
        if(sizes.length > 0) {
            query = {...query, size: { $in: sizes }};
        }
        
        const filteredData = await collection.find(query).toArray();
        setFilteredData(filteredData);
        client.close();
    }

    return (
        <div>
            <select multiple onChange={e => setColors(e.target.value)}>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
            </select>
            <select multiple onChange={e => setSizes(e.target.value)}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
            <button onClick={handleFilterChange}>Filter</button>
            <Chart data={filteredData} />
        </div>
    );
}
