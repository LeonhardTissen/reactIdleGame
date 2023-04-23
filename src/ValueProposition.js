import Money from "./Span";

function ValueProposition(props) {
	return <span>(<Money count={props.count}/> per)</span>
}
export default ValueProposition;