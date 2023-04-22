import './App.css';
import { useState, useEffect } from 'react';

// Function that returns a number with 2 digits after 0 every time
function displayNum(num, force) {
	let rounded = (Math.floor(parseFloat(num) * 100) / 100).toString()
	const dot_index = rounded.indexOf('.');
	if (dot_index !== -1) {
		const digits_after = rounded.length - dot_index;
		if (digits_after === 2) {
			rounded += '0';
		}
	} else if (force) {
		rounded += '.00';
	}
	return rounded;
}

function Money(props) {
	return <span className="money">{displayNum(props.count)}$</span>
}

function Strength(props) {
	return <span className="strength">+{displayNum(props.count)}$/click</span>
}

function Passive(props) {
	return <span className="passive">+{displayNum(props.count)}$/sec</span>
}

function ValueProposition(props) {
	return <span>(<Money count={props.count}/> per)</span>
}

function UpgradeButton(props) {
	const [upgradeStrength] = useState(props.amount);
	const [upgradePrice, setUpgradePrice] = useState(props.price);

	// Calculates how worth the upgrade is so you can see which one makes most sense to buy
	const getValueProposition = () => {
		return Math.floor(upgradePrice / upgradeStrength * 10) / 10
	}

  	return <button 
		className="interactionButton" 
		onClick={() => {
			if (props.func(upgradePrice, upgradeStrength)) {
				setUpgradePrice(Math.ceil(upgradePrice * 1.2))
			}
		}}>
		Get <Strength count={upgradeStrength}/> for <Money count={upgradePrice}/>
		<br></br>
		<ValueProposition count={getValueProposition()}/>
	</button>
}

function UpgradePassiveButton(props) {
	const [upgradeStrength] = useState(props.amount);
	const [upgradePrice, setUpgradePrice] = useState(props.price);

	// Calculates how worth the upgrade is so you can see which one makes most sense to buy
	const getValueProposition = () => {
		return Math.floor(upgradePrice / upgradeStrength * 10) / 10
	}

  	return <button 
		className="interactionButton" 
		onClick={() => {
			if (props.func(upgradePrice, upgradeStrength)) {
				setUpgradePrice(Math.ceil(upgradePrice * 1.2))
			}
		}}>
		Get <Passive count={upgradeStrength}/> for <Money count={upgradePrice}/>
		<br></br>
		<ValueProposition count={getValueProposition()}/>
	</button>
}

function Counter() {
 	const [money, setMoney] = useState(0);
  	const [clickStrength, setClickStrength] = useState(1);
	const [moneyPerSecond, setMoneyPerSound] = useState(0);

	// Passive income 60 times a second
	useEffect(() => {
		const times_a_second = 60;
		const interval = setInterval(() => { 
			setMoney(money + moneyPerSecond / times_a_second)
		}, 1000 / times_a_second);
		return () => clearInterval(interval);
	}, [money, moneyPerSecond]);

	// Main click button that increases the money
	const increaseMoney = () => {
		setMoney(money + parseInt(clickStrength));
	};

	// Function that decreases balance by "price" and increases click strength by "amount", returns true if bought
	const buyClickerUpgrade = (price, amount) => {
		if (money >= price) {
			setMoney(money - price);
			setClickStrength(clickStrength + parseInt(amount));
			return true;
		} else {
			return false;
		}
	};

	// Same as above just increases a seperate statistic, that being money per second
	const buyPassiveUpgrade = (price, amount) => {
		if (money >= price) {
			setMoney(money - price);
			setMoneyPerSound(moneyPerSecond + parseFloat(amount));
			return true;
		} else {
			return false;
		}
	}

	return <div>
		<h1 className="counter money">{displayNum(money, true)}$</h1>
		<button className="interactionButton" onClick={increaseMoney}>Increase Money by <Money count={clickStrength}/></button>
		<p><Passive count={moneyPerSecond}/> automatically</p>
		<hr/>
		<div class="upgradeContainer">
			<UpgradeButton func={buyClickerUpgrade} amount="1" price="10"/>
			<UpgradeButton func={buyClickerUpgrade} amount="5" price="100"/>
			<UpgradeButton func={buyClickerUpgrade} amount="15" price="1000"/>
			<UpgradeButton func={buyClickerUpgrade} amount="50" price="5000"/>
		</div>
		<div class="upgradeContainer">
			<UpgradePassiveButton func={buyPassiveUpgrade} amount="2" price="10"/>
			<UpgradePassiveButton func={buyPassiveUpgrade} amount="10" price="100"/>
			<UpgradePassiveButton func={buyPassiveUpgrade} amount="50" price="1000"/>
			<UpgradePassiveButton func={buyPassiveUpgrade} amount="300" price="5000"/>
		</div>
	</div>
}

function App() {
	return (
		<div className="App">
			<Counter/>
		</div>
	);
}

export default App;
