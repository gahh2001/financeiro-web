import { BarChart } from '@mui/x-charts/BarChart';
import './GraficosMensais.scss';

interface GraficosMensaisProps {
	
}

const GraficosMensais: React.FC<GraficosMensaisProps> = ({}) => {

	return (
		<>
			<div className="card-graficos" style={{ marginRight: "0.5%" }}>
				<div className="titulo">Gráfico de rendimentos</div>
				<div className='grafic'>
					<BarChart
						xAxis={[
							{
							id: 'barCategories',
							data: ['bar A', 'bar B', 'bar C', 'bar D'],
							scaleType: 'band',
							},
						]}
						series={[
							{
							data: [2, 5, 3, 15.5],
							color: "#49CC51"
							},
						]}
						margin={{
							left: 30,
							right: 20,
							top: 20,
							bottom: 20,
						}}
					/>
				</div>
			</div>
			<div className="card-graficos">
				<div className="titulo">Gráfico de gastos</div>
				<div className='grafic'>
					<BarChart
						xAxis={[
							{
							id: 'barCategories',
							data: ['bar A', 'bar B', 'bar C', 'bar D'],
							scaleType: 'band',
							},
						]}
						series={[
							{
							data: [2, 5, 3, 15.5],
							color: "#AD4331"
							},
						]}
						margin={{
							left: 30,
							right: 20,
							top: 20,
							bottom: 20,
						}}
					/>
				</div>
			</div>
		</>
	);
};

export default GraficosMensais;