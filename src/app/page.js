'use client'

import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


// Generate random processes
const generateRandomProcesses = (numProcesses) => {
  const processes = [];
  for (let i = 0; i < numProcesses; i++) {
    const arrivalTime = Math.floor(Math.random() * 10);
    const burstTime = Math.floor(Math.random() * 10) + 1;
    processes.push({ id: i, arrivalTime, burstTime, completionTime: -1 });
  }
  return processes;
};

// FIFO Algorithm with Animation
const fifoAnimation = (processes, updateChart) => {
  let totalTime = 0, completed = 0, progress = [];

  const step = () => {
    if (completed < processes.length) {
      const process = processes[completed];
      totalTime += process.burstTime;
      progress.push({
        label: `Process ${process.id}`,
        start: totalTime - process.burstTime,
        end: totalTime,
      });
      completed++;
      updateChart(progress);
      setTimeout(step, 500); // Step every 500ms (adjust for speed)
    }
  };
  step(); // Start animation
};

// SJF Algorithm with Animation
const sjfAnimation = (processes, updateChart) => {
  let sjf = processes.toSorted((a, b) => a.burstTime - b.burstTime);
    fifoAnimation(sjf, updateChart);
};



// STCF Algorithm with Animation
const stcfAnimation = (processes, updateChart) => {
    let queue = [...processes];
    queue = queue.sort((a, b) => ((a.arrivalTime + a.burstTime) - (b.arrivalTime + b.burstTime)));

    fifoAnimation(queue, updateChart);
};

 // RR Algorithm with Animation
 const rrAnimation = (processes, timeQuantum, updateChart) => {
     let queue = [...processes], currentTime = 0, rr = [];
      while (queue.length > 0) {
          let currentProcess = queue.shift();
          
          if (currentProcess.burstTime > timeQuantum) {
              currentProcess.burstTime -= timeQuantum;
              currentTime += timeQuantum;
              queue.push(currentProcess);
              rr.push(currentProcess);
          } else {
              currentTime += currentProcess.burstTime;
         currentProcess.completionTime = currentTime;
         rr.push(currentProcess);
     }
 }
     fifoAnimation(rr, updateChart);
 };
 
 // MLFQ Algorithm with Animation
 const mlfqAnimation = (processes, timeQuantum, updateChart) => {
     let queue = [...processes], currentTime = 0, mlfq = [];
//     let priority = {priorityId: [1, 2, 3, 4, 5], process = []}
     while (queue.length > 0) {
         let currentProcess = queue.shift();
         
         if (currentProcess.burstTime > timeQuantum) {
             currentProcess.burstTime -= timeQuantum;
             currentTime += timeQuantum;
             queue.push(currentProcess);
             mlfq.push(currentProcess);
         } else {
             currentTime += currentProcess.burstTime;
             currentProcess.completionTime = currentTime;
             mlfq.push(currentProcess);
         }
     }
     fifoAnimation(mlfq, updateChart);
 };



const CpuSchedulerApp = () => {
  const [numProcesses, setNumProcesses] = useState(5);
    const [timeQuantum, setTimeQuantum] = useState(5);
  const [processes, setProcesses] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Process Execution',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  });

    // Function to export the chart as PDF
    const exportToPDF = () => {
      const chartCanvas = document.querySelector('canvas');  // Get the canvas element
      const chartImage = chartCanvas.toDataURL('image/png');  // Convert chart to image

      const doc = new jsPDF();  // Create a new jsPDF instance
      doc.addImage(chartImage, 'PNG', 10, 10, 180, 100);  // Add the chart image to the PDF
        // Prepare table data
        const tableData = processes.map((process) => [
          process.id, process.arrivalTime, process.burstTime
        ]);

        // Add table to PDF using autoTable
        doc.autoTable({
          startY: 130,  // Y position to start the table
          head: [['Process ID', 'Arrival Time', 'Burst Time']],  // Table headers
          body: tableData,  // Table rows (the process data)
        });
    };
    
  // Update the chart with new progress data
  const updateChart = (progress) => {
    const labels = progress.map((p) => p.label);
    const data = progress.map((p) => p.end - p.start);
    
    setChartData({
      labels: labels,
      datasets: [{
        label: 'Process Execution',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }]
    });
  };

  const handleGenerateProcesses = () => {
    setProcesses(generateRandomProcesses(numProcesses));
  };

  const handleRunAlgorithm = (algorithm) => {
    if (algorithm === 'FIFO') {
      fifoAnimation(processes, updateChart);
    }
      if (algorithm === 'SJF') {
          sjfAnimation(processes, updateChart);
      }
      if (algorithm === 'STCF') {
          stcfAnimation(processes, updateChart);
      }
      if (algorithm === 'RR') {
          rrAnimation(processes, timeQuantum, updateChart);
      }
      if (algorithm === 'MLFQ') {
          mlfqAnimation(processes, timeQuantum, updateChart);
      }
  };

  return (
    <div>
      <h1>CPU Scheduling Simulator</h1>

      <div>
        <label>Number of Processes:</label>
        <input
          type="number"
          value={numProcesses}
          onChange={(e) => setNumProcesses(e.target.value)}
        />
          <input
            type="timeQuantum"
            value={timeQuantum}
            onChange={(e) => setTimeQuantum(e.target.value)}
          />
        <button onClick={handleGenerateProcesses}>Generate Processes</button>
      </div>
          
          <div>
            {/* Display the generated processes */}
            <h2>Generated Processes</h2>
            <table border="1">
              <thead>
                <tr>
                  <th>Process ID</th>
                  <th>Arrival Time</th>
                  <th>Burst Time</th>
                </tr>
              </thead>
              <tbody>
                {processes.map((process) => (
                  <tr key={process.id}>
                    <td>{process.id}</td>
                    <td>{process.arrivalTime}</td>
                    <td>{process.burstTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
      <div>
        <p><button onClick={() => handleRunAlgorithm('FIFO')}>Run FIFO</button></p>
          <p><button onClick={() => handleRunAlgorithm('SJF')}>Run SJF</button></p>
          <p><button onClick={() => handleRunAlgorithm('STCF')}>Run STCF</button></p>
          <p><button onClick={() => handleRunAlgorithm('RR')}>Run RR</button></p>
          <p><button onClick={() => handleRunAlgorithm('MLFQ')}>Run MLFQ</button></p>
      </div>
          
          
          
          <div>
            <button onClick={exportToPDF}>Download PDF</button>
          </div>


      <div>
          
          
        <Bar data={chartData} options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Process Execution Progress',
            },
          },
        }} />
      </div>
    </div>
  );
};

export default CpuSchedulerApp;

