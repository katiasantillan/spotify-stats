import { Chart } from "react-google-charts"
import styles from './googleChart.module.css';

const GoogleChart = (props) => {
    return (
        <Chart
            className={styles.chart}
            width={props.width}
            height={props.height}
            chartType={props.chartType}
            loader={<div>Loading Chart</div>}
            data={props.data}
            options={{
              // Material design options
              colors: [`${props.color}`],
              chart: {
                title: 'Spotify 2024',
              },
            }}
        />
    );
};

export default GoogleChart;