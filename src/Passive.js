import { displayNum } from "./general";

function Passive(props) {
	return <span className="passive">+{displayNum(props.count)}$/sec</span>
}
export default Passive;