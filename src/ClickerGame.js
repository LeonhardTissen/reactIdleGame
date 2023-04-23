import { useState, useEffect } from 'react';
import { displayNum } from './general';
import Passive from "./Passive";
import Money from './Span';
import UpgradeButton from "./Upgrade";
import UpgradePassiveButton from "./UpgradePassive";

function ClickerGame() {
    const [money, setMoney] = useState(0);
    const [moneyPerClick, setMoneyPerClick] = useState(1);
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
        setMoney(money + parseInt(moneyPerClick));
    };

    // Function that decreases balance by "price" and increases click strength by "amount", returns true if bought
    const buyClickerUpgrade = (price, amount) => {
        if (money >= price) {
            setMoney(money - price);
            setMoneyPerClick(moneyPerClick + parseInt(amount));
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
        <button className="interactionButton" onClick={increaseMoney}>Increase Money by <Money count={moneyPerClick}/></button>
        <p><Passive count={moneyPerSecond}/> automatically</p>
        <hr/>
        <div className="upgradeContainer">
            <UpgradeButton func={buyClickerUpgrade} amount="1" price="10"/>
            <UpgradeButton func={buyClickerUpgrade} amount="5" price="100"/>
            <UpgradeButton func={buyClickerUpgrade} amount="15" price="1000"/>
            <UpgradeButton func={buyClickerUpgrade} amount="50" price="5000"/>
        </div>
        <div className="upgradeContainer">
            <UpgradePassiveButton func={buyPassiveUpgrade} amount="2" price="10"/>
            <UpgradePassiveButton func={buyPassiveUpgrade} amount="10" price="100"/>
            <UpgradePassiveButton func={buyPassiveUpgrade} amount="50" price="1000"/>
            <UpgradePassiveButton func={buyPassiveUpgrade} amount="300" price="5000"/>
        </div>
    </div>
}

export default ClickerGame;