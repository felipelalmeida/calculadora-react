import './style.css';


export default function Display(props) {
    return (
        <div className='display'>
            <span>
                {(props.history.length > 0 && !props.result) && <span >{`${props.values[0]} ${props.operator}`}</span>}
                {(props.result) && <span>{`${props.history[0]} ${props.operator} ${props.history[1]} =`}</span>}
            </span>
            <div>
                {props.display}
            </div>
        </div>

    )
}