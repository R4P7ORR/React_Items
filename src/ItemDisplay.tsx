interface ItemDisplayProps {
    name: string;
    handleClick: () => void;
}

function ItemDisplay(props: ItemDisplayProps) {
    return (
        <li>
            {props.name}
            <button onClick={props.handleClick}>X</button>
        </li>
    )

}

export default ItemDisplay;