import React from 'react'
import { useStyles } from "./styles";
import cs from "classnames";

const Pagination = ({entityPerPage, selected, totalEntities, paginate}) => {
    const classes = useStyles()
    const pageNumbers = []

    const entities =  entityPerPage > totalEntities? totalEntities: entityPerPage

    for(let i = 1; i <= Math.ceil(totalEntities/entities ); i++)
      pageNumbers.push(i)

  return (
    <nav>
        <ul className='pagination'>
          {pageNumbers.map((number)=>{
            return (
            <li key={number} className={classes.pageItem}
              >
              <a className={cs(classes.pageLink, {
              [classes.selected]: selected === number,
              })} onClick={()=>paginate(number)}  >
                {number}
              </a>
            </li>
            )
          })}
        </ul>
    </nav>
  )
}

export default Pagination;
