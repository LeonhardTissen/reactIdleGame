function TimesUpgraded(props) {
    let text = '';
    if (parseInt(props.times) > 0) {
        text = `(Bought ${props.times})`
    }
    return <span class="TimesUpgraded">{text}</span>
}

export default TimesUpgraded;