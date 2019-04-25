import React from 'react';
import { Link } from 'react-router-dom';

export default function BookItem({
  book: { id, name, year, isbn }
}) {
  return (
    <div className="card card-body mb-3 w-50 centered" style={{marginLeft:'auto',marginRight:'auto'}}>
      <div className="row">
        <div className="col-md-6">
          <h4>
           {name}
          </h4>
          <div>
            Year: {year}
          </div>
          <div>
            ISBN: {isbn}
          </div>
         
          
        </div>
        <div className="col-md-3">
          <Link to={`/book/${id}`} className="btn btn-secondary" style={{marginLeft:'100px'}}>
            Book Detail
          </Link>
        </div>
      </div>
    </div>
  );
}
