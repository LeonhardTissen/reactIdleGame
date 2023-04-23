import { useState } from "react";
import Money from "./Span";
import MoneyPerClick from "./MoneyPerClick";
import ValueProposition from "./ValueProposition";
import Passive from "./Passive";
import TimesUpgraded from "./TimesUpgraded";

function UpgradeButton(props) {
	const [upgradeAmount] = useState(props.amount);
	const [upgradePrice, setUpgradePrice] = useState(props.price);
	const [timesUpgraded, setTimesUpgraded] = useState(0);

	// Calculates how worth the upgrade is so you can see which one makes most sense to buy
	const getValueProposition = () => {
		return Math.floor(upgradePrice / upgradeAmount * 10) / 10
	};

	let type;
	if (props.currency >= parseInt(upgradePrice)) {
		type = 'affordable';
	} else if (props.currency * 50 >= parseInt(upgradePrice)) {
		type = 'notaffordable'
	} else {
		type = 'notvisible'
	}

	let buy_type;
	if (props.item === 'click') {
		buy_type = <MoneyPerClick count={upgradeAmount}/>
	} else {
		buy_type = <Passive count={upgradeAmount}/>
	}

  	return <button 
		className="interactionButton"
		type={type}
		onClick={() => {
			if (props.func(upgradePrice, upgradeAmount)) {
				setTimesUpgraded(timesUpgraded + 1);
				setUpgradePrice(Math.ceil(upgradePrice * 1.2));
			}
		}}>
		Get {buy_type} for <Money count={upgradePrice}/>
		<br></br>
		<ValueProposition count={getValueProposition()}/> <TimesUpgraded times={timesUpgraded}/>
	</button>
}
export default UpgradeButton;