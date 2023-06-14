import React, { PureComponent } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';


const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
];

const data02 = [
    { name: 'Group A', value: 2400 },
    { name: 'Group B', value: 4567 },
    { name: 'Group C', value: 1398 },
    { name: 'Group D', value: 9800 },
    { name: 'Group E', value: 3908 },
    { name: 'Group F', value: 4800 },
];

const Colors = ['#1792a4', '#44b4c4', '#4dd0e1', '#80c9c6','#a3d5d1','#c8e5e3']
// const Colors = ['#ce93d8', '#5c6bc0', '#b39ddb', '#4dd0e1', '#f48fb1', 'pink']
const GraficoTorta = () => {

    return (
        <div style={{ width:"50%", height:200 }} >
            <ResponsiveContainer >
                <PieChart>
                    <Pie
                    isAnimationActive={false}
                    dataKey="value"
                    data={data01}
                    fill='red'
                        label
                        align='left'
                    >
                        {data01.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={Colors[index % Colors.length]}/>
                        ))}

                    </Pie>
                    <Tooltip />
                    <div style={{ height: 200 }}></div>
                    <Legend layout="vertical" align='left' verticalAlign='middle'  />
                </PieChart>
            </ResponsiveContainer>
        </div>
        // <ResponsiveContainer width="100%" height="100%">
        //     <PieChart width={400} height={400}>
        //         <Pie
        //             dataKey="value"
        //             isAnimationActive={false}
        //             data={data01}
        //             cx="50%"
        //             cy="50%"
        //             outerRadius={80}
        //             fill="#8884d8"
        //             label
        //         />
        //         <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
        //         <Tooltip />
        //     </PieChart>
        // </ResponsiveContainer>
    );
}

export default GraficoTorta
