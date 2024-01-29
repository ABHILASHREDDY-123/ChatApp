import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import "../styles/search.css";

const Search = () =>{
    return (
        <div className='search'>
           <SearchIcon 
            fontSize="medium"
            color="primary"
            style={{ paddingTop: "3%", marginRight: "2%", marginLeft: "2%" }}
           />
           <Input type="text" placeholder='search' />
        </div>
    )
}
export default Search;