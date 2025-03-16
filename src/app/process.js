import Chart from 'chart.js/auto'
import { Bar } from 'chart.js';
import { Chart as ChartJS } from 'chart.js';

function generateRandomProcess(numProcesses) {
    const processes = [];
    for (let i = 0; i < numProcesses; i++) {
        const arrivalTime = Math.floor(Math.random() * 10);
        const burstTime = Math.floor(Math.random() * 10) + 1;
        processes.push({ id: i, arrivalTime, burstTime });
    }
    return processes;
}

async function fifo(processes) {
    let result = [];
    let time = 0;
    processes.forEach(process => {
        result.push({
            processId: process.id,
            startTime: time,
            endTime: time + process.burstTime,
        });
        time += process.burstTime;
    });
    return (new Chart(document.getElementById('fifo')), {
        type: 'bar',
        data: {
            labels: result.map(row => row.processId),
            datasets: [
                {
                    label: 'Turnaround Time',
                    data: result.map(row => row.endTime),
                },
                   ],
            }
        }
    )
}

async function sjf(processes) {
    let result = [];
    let time = 0;
    let sorted = processes.toSorted(function(a, b){return b - a});
    processes.forEach(sorted => {
        result.push({
            processId: process.id,
            startTime: time,
            endTime: time + process.burstTime,
        });
        time += process.burstTime;
    });
    return (new Chart(document.getElementById('sjf')), {
        type: 'bar',
        data: {
            labels: result.map(row => row.processId),
            datasets: [
                {
                    label: 'Turnaround Time',
                    data: result.map(row => row.endTime),
                },
                   ],
            }
        }
    )
}

async function stcf(processes) {
    let result = [];
    let time = 0;
    let sorted = processes.toSorted(function(a, b){return b - a});
    processes.forEach(process => {
        result.push({
            processId: process.id,
            startTime: time,
            endTime: time + process.burstTime,
        });
        time += process.burstTime;
    });
    return (new Chart(document.getElementById('stcf')), {
        type: 'bar',
        data: {
            labels: result.map(row => row.processId),
            datasets: [
                {
                    label: 'Turnaround Time',
                    data: result.map(row => row.endTime),
                },
                   ],
            }
        }
    )
}

async function rr(processes, timeQuantum) {
    let result = [];
    let time = 0;
    let limit = 0;
    limit = limit + processes.forEach(processes)
    while (time <= limit) {
        processes.forEach(process => {
            result.push({
            processId: process.id,
            startTime: time,
            endTime: time + process.burstTime,
            });
            time += process.burstTime;
        });
    }
    return (new Chart(document.getElementById('rr')), {
        type: 'bar',
        data: {
            labels: result.map(row => row.processId),
            datasets: [
                {
                    label: 'Turnaround Time',
                    data: result.map(row => row.endTime),
                },
                   ],
            }
        }
    )
}

async function mlfq(processes) {
    let result = [];
    let time = 0;
    processes.forEach(process => {
        result.push({
            processId: process.id,
            startTime: time,
            endTime: time + process.burstTime,
        });
        time += process.burstTime;
    });
    return (new Chart(document.getElementById('mlfq')), {
        type: 'bar',
        data: {
            labels: result.map(row => row.processId),
            datasets: [
                {
                    label: 'Turnaround Time',
                    data: result.map(row => row.endTime),
                },
                   ],
            }
        }
    )
}

export {fifo, sjf, stcf, rr, mlfq, generateRandomProcess}
