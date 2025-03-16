'use client'

import React from 'react';
import styles from "./chartstyle.module.css";
import SchedulerInputForm from "./ok-button.js";
import {fifo, sjf, stcf, rr, mlfq, generateRandomProcess} from './process';



export default function HomePage() {
    // Callback function to handle the form submission
    const handleFormSubmit = (numProcesses, timeQuantum, selectedAlgorithms) => {
        console.log('Number of Processes:', numProcesses);
        console.log('Time Quantum:', timeQuantum);
        console.log('Selected Algorithms:', selectedAlgorithms);
        let processes = generateRandomProcess(numProcesses)
        // Call your scheduling algorithm functions based on user input
        if (selectedAlgorithms.fifo) {
            fifo(processes)
        }
        if (selectedAlgorithms.sjf) {
            sjf(processes)
        }
        if (selectedAlgorithms.stcf) {
            stcf(processes)
        }
        if (selectedAlgorithms.rr) {
            rr(processes)
        }
        if (selectedAlgorithms.mlfq) {
            mlfq(processes)
        }
    };
    const processes = ['First In, First Out','Shortest Job First','Shortest Time-To-Completion First','Round Robin','Multi-Level Feedback Queue'];
    
    return (
            <div>
            <body>
                <h1>CPU Scheduling Simulator</h1>
                <SchedulerInputForm onSubmit={handleFormSubmit} />
            <h2>FIFO</h2>
            <p><canvas id="fifo" width="200" height="100"></canvas></p>
            <hr>
            <h2>SJF</h2>
            <p><canvas id="sjf" width="200" height="100"></canvas></p>
            <hr>
            <h2>STCF</h2>
            <p><canvas id="stcf" width="200" height="100"></canvas></p>
            <hr>
            <h2>RR</h2>
            <p><canvas id="rr" width="200" height="100"></canvas></p>
            <hr>
            <h2>MLFQ</h2>
            <p><canvas id="mlfq" width="200" height="100"></canvas></p>
            </body>
            </div>
            )
}
