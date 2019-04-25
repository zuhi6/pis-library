import React from 'react';
import { Link } from 'react-router-dom';

export default function ChangeRequestItem({
  changerequest: { id, book_id, user_id, year, isbn, language, pages, description, additional_info, status }
}) {
  return (
    <div className="card card-body mb-3 w-50 centered" style={{marginLeft:'auto',marginRight:'auto'}}>
      <div className="row">
        <div className="col-md-6">
          <h4>
            Change Request - {id}
          </h4>
          <div>
            User ID: {user_id}
          </div>
          <div>
            Book ID: {book_id}
          </div>
          <div>
            Status:
            <span className={`${status}`}>{status}</span> 
          </div>
        </div>
        <div className="col-md-3">
        {status === 'Pending' && 
        <Link to={`/changerequestdetail/${id}`} className="btn btn-secondary" style={{marginLeft:'100px'}}>
            Change Request Detail
          </Link>
        }
          
        </div>
      </div>
    </div>
  );
}
