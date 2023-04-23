import { displayNum } from "./general";

function MoneyPerClick(props) {
	return <span className="moneyperclick">+{displayNum(props.count)}$/click</span>
}
export default MoneyPerClick;