import { BarItem, BarLabelContext, barLabelClasses } from "@mui/x-charts/BarChart";
import { pieArcLabelClasses } from "@mui/x-charts/PieChart";

const minimumCharWidth = 7;
const minimumBarHeight = 18;

export const formatChartAmount = (amount: number) =>
	amount >= 1000
		? `${(amount / 1000).toFixed(1).replace('.', ',')} mil`
		: amount.toFixed(0);

export const amountBarLabel = (item: BarItem, context: BarLabelContext) => {
	if (!item.value) {
		return null;
	}
	const label = formatChartAmount(item.value);
	return context.bar.width >= label.length * minimumCharWidth && context.bar.height >= minimumBarHeight
		? label
		: null;
}

export const chartLabelStyle = {
	[`& .${barLabelClasses.root}, & .${pieArcLabelClasses.root}`]: {
		fill: "#ffffff",
		fontWeight: "bold",
		fontSize: 12
	}
};