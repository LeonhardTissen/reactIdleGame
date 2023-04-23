import { useState } from "react";
import Money from "./Span";
import MoneyPerClick from "./MoneyPerClick";
import ValueProposition from "./ValueProposition";
import Passive from "./Passive";

function UpgradeButton(props) {
	const [upgradeAmount] = useState(props.amount);
	const [upgradePrice, setUpgradePrice] = useState(props.price);

	// Calculates how worth the upgrade is so you can see which one makes most sense to buy
	const getValueProposition = () => {
		return Math.floor(upgradePrice / upgradeAmount * 10) / 10
	};

	let affordable = 'no';
	if (props.currency >= parseInt(upgradePrice)) {
		affordable = 'yes';
	};

	let buy_type;
	if (props.item === 'click') {
		buy_type = <MoneyPerClick count={upgradeAmount}/>
	} else {
		buy_type = <Passive count={upgradeAmount}/>
	}

  	return <button 
		className="interactionButton"
		affordable={affordable}
		onClick={() => {
			if (props.func(upgradePrice, upgradeAmount)) {
				setUpgradePrice(Math.ceil(upgradePrice * 1.2))
			}
		}}>
		Get {buy_type} for <Money count={upgradePrice}/>
		<br></br>
		<ValueProposition count={getValueProposition()}/>
	</button>
}
export default UpgradeButton;