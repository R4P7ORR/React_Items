interface CategoryDisplayProps {
    name: string;
    handleClick: () => void;
}

function CategoryDisplay(props: CategoryDisplayProps) {
    return (
        <button onClick={props.handleClick}>{props.name}</button>
    )

}

export default CategoryDisplay;