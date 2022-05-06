//https://github.com/recharts/recharts
//https://lodash.com/

import React, {Fragment, useState, useContext} from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';

function TrainingStatistics()   {

    const [trainings, setTrainings] = useState([]);


    const data = [
        {name: 'Geeksforgeeks', students: 400},
        {name: 'Technical scripter', students: 700},
        {name: 'Geek-i-knack', students: 200},
        {name: 'Geek-o-mania', students: 1000}
    ];

    //Simplified fetch of trainings with custom info 
    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.log(err))
    } 
     
    return ( 
        <>
            <b>Select a customer in the overview to see their training statistics</b>
            <BarChart width={600} height={600} data={data}>
                <Bar dataKey="students" fill="green" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
            </BarChart>
        </>
    );
}

export default TrainingStatistics;