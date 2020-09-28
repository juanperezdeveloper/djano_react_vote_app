import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userActions } from '../_actions';

function AdminPage() {
  const users = useSelector(state => state.users);
  const user = useSelector(state => state.authentication.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.getAll());
  }, []);

  function handleDeleteUser(id) {
    dispatch(userActions.delete(id));
  }

  return (
    <div className="col-lg-12">
      <h5>Welcome to Shopvote Admin!</h5>
      {users.loading && <em>Loading users...</em>}
      {users.error && <span className="text-danger">ERROR: {users.error}</span>}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Action</th>
          </tr>
        </thead>
        {users.items &&
          <tbody>
            {users.items.map((user, index) =>
              <Fragment key={user.id}>
                <tr>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>
                    {
                      user.deleting ? <em> - Deleting...</em>
                        : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                          : <span> <a onClick={() => handleDeleteUser(user.id)} className="text-primary">Delete</a></span>
                    }
                  </td>
                </tr>
              </Fragment>
            )}
          </tbody>
        }
      </table>
    </div>
  );
}

export { AdminPage };