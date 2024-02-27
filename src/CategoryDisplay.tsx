interface CategoryDisplayProps {
    name: string;
    handleClick: () => void;
}

function CategoryDisplay(props: CategoryDisplayProps) {
    return (
        <li>
            <button onClick={props.handleClick}>{props.name}</button>
        </li>
    )

}

export default CategoryDisplay;