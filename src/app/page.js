import WhatButton from './what-button';
import styles from "./chartstyle.module.css";
import chart from "./process.js";
function Header({ title }) {
    return <h1>{title ? title : 'ok'}</h1>;
}
            


export default function HomePage() {
    const names = ['holy','moly','guacamole'];
    
    return (
        <div>
            <Header title="Crazy"/>
            <div className={styles.chartsize}><canvas id="FIFO"></canvas></div>
            <script type="module" src="process.js"></script>
            <ul>
                {names.map((name) => (
                    <li key={name}>{names}</li>
                ))}
            </ul>
            <WhatButton />
        </div>
            
    );
}
