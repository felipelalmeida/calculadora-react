import './style.css';

export default function Button(props) {
    const buttonClass = props.className
    return (

        <button onClick={e => props.onClick(props.label)} className={buttonClass}>
            {props.label}
        </button>

    )
}