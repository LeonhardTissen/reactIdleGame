import { displayNum } from "./general";

function Money(props) {
	return <span className="money">{displayNum(props.count)}$</span>
}
export default Money;