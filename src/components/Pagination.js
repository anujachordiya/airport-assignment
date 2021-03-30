import React,{useState,useEffect, useMemo} from "react";
import Pagination  from "react-bootstrap/Pagination";
//import Pagination from "react-js-pagination";
//import '../css/Pagination.css';

const PaginationComponent = ({total = 0, itemsPerPage = 10 , currentPage = 1, onPageChange,pageNeighbours = 0 }) =>{

    const[totalPages,setTotalPages] = useState(0);

    useEffect(()=>{
        if(total> 0 && itemsPerPage)
            setTotalPages(Math.ceil(total/itemsPerPage));
    },[total,itemsPerPage]);

    const paginationItems = useMemo( () => {
        const pages = [];
        for(let i=1;i<=totalPages;i++)
        {
            pages.push(
                <Pagination.Item
                    key={i}
                    active ={i===currentPage}
                    onClick = {()=>onPageChange(i)}
                >
                    {i}                    
                </Pagination.Item>
            );
        }
        return pages;
    },[totalPages,currentPage]);

    if(totalPages === 0) return null;
    return(
        <Pagination className="pagination">
            <Pagination.Prev
            onClick = {() => onPageChange(currentPage -1)}
                        disabled={currentPage===1}/>
            {paginationItems}
            <Pagination.Next   
            onClick = {() => onPageChange(currentPage =1)}
                        disabled={currentPage===totalPages}/>
          
        </Pagination>
        
    )
}

export default PaginationComponent;