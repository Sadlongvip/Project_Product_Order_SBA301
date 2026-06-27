import { Button, Table, Image } from 'react-bootstrap';

export default function TableShop({ listItem = [], onEdit, onDelete }){
    return (
        <>
        <Table striped bordered hover className='mt-5'>
            <thead className='table-dark'>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Logo</th>
                    <th>Banner</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {listItem.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>
                            {item.logo ? (
                                <Image src={item.logo} alt="Logo" width={100} height={100} />
                            ) : (
                                "No Image"
                            )}
                        </td>
                        <td>
                            {item.banner ? (
                                <Image src={item.banner} alt="Banner" width={100} height={100} />
                            ) : (
                                "No Image"
                            )}
                        </td>
                        <td>{item.description}</td>
                        <td>{item.status}</td>
                        <td className='d-flex flex-row justify-content-between w-100'>
                            <Button className='me-3' variant="primary" onClick={() => onEdit(item)}>
                                Edit
                            </Button>
                            <Button variant="danger" onClick={() => onDelete(item)}>
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    );
}