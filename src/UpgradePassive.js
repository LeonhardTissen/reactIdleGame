import { useState } from "react";
import Money from "./Money";
import Passive from "./Passive";
import ValueProposition from "./ValueProposition";

function UpgradePassiveButton(props) {
	const [upgradeAmount] = useState(props.amount);
	const [upgradePrice, setUpgradePrice] = useState(props.price);

	// Calculates how worth the upgrade is so you can see which one makes most sense to buy
	const getValueProposition = () => {
		return Math.floor(upgradePrice / upgradeAmount * 10) / 10
	}

  	return <button 
		className="interactionButton" 
		onClick={() => {
			if (props.func(upgradePrice, upgradeAmount)) {
				setUpgradePrice(Math.ceil(upgradePrice * 1.2))
			}
		}}>
		Get <Passive count={upgradeAmount}/> for <Money count={upgradePrice}/>
		<br></br>
		<ValueProposition count={getValueProposition()}/>
	</button>
}
export default UpgradePassiveButton;