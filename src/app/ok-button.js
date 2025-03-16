'use client'

import React, { useState } from 'react';

function SchedulerInputForm({ onSubmit }) {
    // State to manage the input values
    const [numProcesses, setNumProcesses] = useState(1);
    const [timeQuantum, setTimeQuantum] = useState(4);
    const [selectedAlgorithms, setSelectedAlgorithms] = useState({
        fifo: false,
        sjf: false,
        stcf: false,
        rr: false,
        mlfq: false,
    });

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(numProcesses, timeQuantum, selectedAlgorithms);
    };

    // Handle checkbox change
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSelectedAlgorithms((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Number of Processes:
                    <input
                        type="number"
                        value={numProcesses}
                        onChange={(e) => setNumProcesses(e.target.value)}
                        min="1"
                    />
                </label>
            </div>

            <div>
                <label>
                    Time Quantum (for RR):
                    <input
                        type="number"
                        value={timeQuantum}
                        onChange={(e) => setTimeQuantum(e.target.value)}
                        min="1"
                    />
                </label>
            </div>

            <div>
                <h4>Select Scheduling Algorithms:</h4>
                <label>
                    <input
                        type="checkbox"
                        name="fifo"
                        checked={selectedAlgorithms.fifo}
                        onChange={handleCheckboxChange}
                    />
                    FIFO (First In First Out)
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        name="sjf"
                        checked={selectedAlgorithms.sjf}
                        onChange={handleCheckboxChange}
                    />
                    SJF (Shortest Job First)
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        name="stcf"
                        checked={selectedAlgorithms.stcf}
                        onChange={handleCheckboxChange}
                    />
                    STCF (Shortest Time-to-Completion First)
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        name="rr"
                        checked={selectedAlgorithms.rr}
                        onChange={handleCheckboxChange}
                    />
                    RR (Round Robin)
                </label>
                <br />
                <label>
                    <input
                        type="checkbox"
                        name="mlfq"
                        checked={selectedAlgorithms.mlfq}
                        onChange={handleCheckboxChange}
                    />
                    MLFQ (Multi-Level Feedback Queue)
                </label>
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default SchedulerInputForm;
