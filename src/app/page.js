import OkButton from './ok-button';
import styles from "./chartstyle.module.css";
import chart from "./process.js";
function Header({ title }) {
    return <h1>{title ? title : 'ok'}</h1>;
}
            


export default function HomePage() {
    const processes = ['First In, First Out','Shortest Job First','Shortest Time-To-Completion First','Round Robin','Multi-Level Feedback Queue'];
    return (
            <div>
            <Header title="CPU Scheduling Algorithms"/>
            <div>
            <form id="userInput">
            <label htmlFor="number">Enter # of processes: </label>
            <input type="int" id="number" name="number"></input>
            <label htmlFor="timeQuantum"> Enter Time Quantum (for RR): </label>
            <input type="int" id="timeQuantum" name="timeQuantum"></input>
            <OkButton />
            </form>
            </div>
            <script>
                const number = document.getElementById('number').value;
                const timeQuantum = document.getElementById('timeQuantum').value;
                </script>
            <ul>
            {processes.map((process) => (
                                         <li key={process}><h3>{process}</h3>
                                         <canvas id="FIFO"></canvas>
                                         </li>
                                         ))}
            </ul>
            
            </div>
            
            );
}

