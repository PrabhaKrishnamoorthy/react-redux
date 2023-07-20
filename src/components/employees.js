import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
//import { ToastContainer,  } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import { deleteEmployeeById, fetchEmployees } from '../reducer/employeeReducer';

function Employeedet() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.data);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployeeById(id))
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-70 bg-white rounded p-3">
        <h2>Employee Details</h2>
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Create +
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>employee_id</th>
              <th>name</th>
              <th>email</th>
              <th>mobile_no</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.employee_id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile_no}</td>
                <td>
                  <Link to={`/edit/${employee.id}`} className="btn btn-sm btn-primary mx-2">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(employee.id)} className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employeedet;
