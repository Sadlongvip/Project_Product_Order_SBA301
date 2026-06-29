import { Button, Table, Image } from 'react-bootstrap';

export default function TableShop({ listItem = [], onEdit, onDelete }){
    return (
        <>
        <Table striped bordered hover className='mt-5'>
            <thead className='table-dark'>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th>Image</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {listItem.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.price}</td>
                        <td>{item.stock}</td>
                        <td>{item.category?.name || "N/A"}</td>
                        <td>
                            {item.image ? (
                                <Image src={item.image} alt={item.name} width={100} height={100} style={{ objectFit: 'contain' }} />
                            ) : (
                                "No Image"
                            )}
                        </td>
                        <td>{item.description}</td>
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