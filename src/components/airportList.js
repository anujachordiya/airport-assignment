import React ,{useState, useEffect, useMemo} from "react";
import Pagination from './Pagination';
import Search from "./Search";
import CheckList from "./checkList";
import '../css/airportList.css';

const AirportList = (props) =>{



    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filtersType, setFiltersType] = useState([]);    

    const ITEMS_PER_PAGE = 4;
  

    const getData=()=>{
        fetch('data/airports.json')
          .then(res => res.json())
          .then(json =>{
            console.log(json);
            setComments(json);}
          );
      }
      useEffect(()=>{
        getData()
      },[])



      const commentsData = useMemo(() => {
        let computedComments = comments;

        //for searching
        if (search) {
            computedComments = computedComments.filter(
                comment =>{
                    return(
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.type.toLowerCase().includes(search.toLowerCase()) 
             ) }   );
        }

        setTotalItems(computedComments.length);


        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search]);
      

    return(
        <div className="airportList-container">
            <h1 className="title-container">Filter <span className="title"> airports</span></h1>
            
            <div className="search-container">
                <p>Filter by search</p>    

                <Search className="search" onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                />
            </div>


            <div className="checklist-container">
                <p className="checklist-title"    style={{ left:"0"}}> Type</p>

                 <CheckList className="checklist" 
                 />
            </div>
            
            <div className="table table-striped table-responsive">
            <table class="table">
                    <thead>
                            <tr>
                                <th>Name</th>
                                <th>ICAO</th>
                                <th>IATA</th>
                                <th>Elev.</th>
                                <th>Lat.</th>
                                <th>Long.</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                    <tbody>
                        {

                            commentsData.map(comment =>(<tr>
                                <td>{comment.name}</td>
                                <td>{comment.icao}</td>
                                <td>{comment.iata}</td>
                                <td>{comment.elevation}</td>
                                <td>{comment.latitude}</td>
                                <td>{comment.longitude}</td>
                                <td>{comment.type}</td>
                            </tr>

                            ))
                        }

                    </tbody>
                </table>
            
            </div>
            
                <div class="pagination-container"> 
                <Pagination total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                    />
        
                </div>
               


        </div>
    )

}

export default AirportList;
