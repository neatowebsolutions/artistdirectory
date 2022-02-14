// import useDropdown from "../hooks";
import useDropdown from "../hooks/dropdown";
// import useProducts from "../hooks";


const Test = () => {

const { data, error, loading } = useDropdown("categories")

// console.log(data, error)

    return (
        <div>TEST</div>
    )
}

export default Test