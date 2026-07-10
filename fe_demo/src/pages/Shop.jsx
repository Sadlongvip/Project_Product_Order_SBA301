import { useState } from 'react';
import { Button, Container, Modal } from 'react-bootstrap';
import { useShop } from '../context/ShopContext';
import TableShop from '../components/TableShop';
import { useAccount } from '../hooks/useAccount';
import FormShop from '../components/FormShop';
import { createShop } from '../service/ShopService';
import { ValidateShopInput } from '../validation/Validation';
import FormItem from '../components/FormItem';
import { createItem, updateItem, deleteItem } from '../service/ItemService';
import ShopOrdersModal from '../components/ShopOrdersModal';
import { useToast } from '../context/ToastContext';




export default function Shop(){
    const { state, dispatch, listItem, fetchData } = useShop();
    const [show, setShow] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [showItemForm, setShowItemForm] = useState(false);
    const [showOrdersModal, setShowOrdersModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);
    const user = useAccount();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate toàn bộ form
        dispatch({ type: "SUBMIT" });

        const validationErrors = ValidateShopInput(state.data);
        const hasError = Object.values(validationErrors).some((err) => err !== "");
        
        if(hasError){
            console.log('Error validation');
            return;
        }

        // Gọi API
        try {
            const shopDataToSubmit = {
                ...state.data,
                account: { id: user?.id }
            };
            await createShop(shopDataToSubmit);
            dispatch({ type: "SUBMIT_SUCCESS" });
            setShowCreate(false);
            toast.success("Tạo cửa hàng mới thành công!");
            fetchData(); // Tự động load lại dữ liệu Shop thay vì F5 trình duyệt
        } catch (error) {
            dispatch({ type: "SUBMIT_ERROR", payload: error.message });
            toast.error("Có lỗi xảy ra khi tạo cửa hàng: " + error.message);
        }
    }

    const handleCancelCreate = () => {
        dispatch({ type: "CANCEL" });
        setShowCreate(false);
    }

    const handleShowItemForm = () => {
        setEditingItem(null);
        setShowItemForm(true);
    }
    
    const handleItemEdit = (item) => {
        setEditingItem(item);
        setShowItemForm(true);
    }

    const handleDelete = (item) => {
        setDeletingItem(item);
        setShow(true);
    }

    const handleConfirmDelete = async () => {
        if (!deletingItem) return;
        try {
            const res = await deleteItem(deletingItem.id);
            if (res !== null) {
                toast.success("Xóa sản phẩm thành công!");
                fetchData();
            } else {
                toast.error("Đã xảy ra lỗi khi xóa sản phẩm! (Có thể sản phẩm đang thuộc một đơn hàng)");
            }
        } catch (error) {
            console.error("Lỗi xóa sản phẩm:", error);
            toast.error("Đã xảy ra lỗi hệ thống khi xóa sản phẩm!");
        } finally {
            setShow(false);
            setDeletingItem(null);
        }
    }

    const handleItemCreate = async (data) => {
        try {
            const itemDataToSubmit = {
                ...data,
                shopId: state.data.id,
                categoryId: data.categoryId
            };
            const res = await createItem(itemDataToSubmit);
            if (res) {
                toast.success("Tạo sản phẩm thành công!");
                fetchData(); // Tự động load lại danh sách Item
                setShowItemForm(false);
            } else {
                toast.error("Đã xảy ra lỗi khi tạo sản phẩm!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Đã xảy ra lỗi hệ thống khi tạo sản phẩm!");
        }
    }


    const handleItemUpdate = async (data) => {
        try {
            const itemDataToSubmit = {
                ...data,
                shopId: state.data.id,
                categoryId: data.categoryId
            };
            const res = await updateItem(itemDataToSubmit);
            if (res) {
                toast.success("Cập nhật sản phẩm thành công!");
                fetchData(); // Tự động load lại danh sách Item
                setShowItemForm(false);
            } else {
                toast.error("Đã xảy ra lỗi khi cập nhật sản phẩm!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Đã xảy ra lỗi hệ thống khi cập nhật sản phẩm!");
        }
    }

    return (
        <>
        <Container>
            {!state.data?.id ? (
                <div className="text-center mt-5">
                    <h3>Bạn có muốn tạo cửa hàng?</h3>
                    <Button variant="success" className="mt-3" onClick={() => setShowCreate(true)}>
                        Tạo cửa hàng
                    </Button>
                </div>
            ) : (
                <>
                    <div className='d-flex justify-content-between my-3'>
                        <h1>{state.data.name}</h1>
                        <div>
                            <Button variant="info" className="me-2 text-white" onClick={() => setShowOrdersModal(true)}>
                                Quản lý Đơn hàng
                            </Button>
                            <Button variant="primary" onClick={handleShowItemForm}>
                                Add new Item
                            </Button>
                        </div>
                    </div>
                    <div>
                        <TableShop listItem={listItem} onEdit={handleItemEdit} onDelete={handleDelete}/>
                    </div>
                </>
            )}

            <Modal show={showCreate} onHide={() => setShowCreate(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Tạo cửa hàng mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormShop 
                        onCancel={() => handleCancelCreate()} 
                        onSuccess={(e) => {
                            handleSubmit(e);
                        }} 
                    />
                </Modal.Body>
            </Modal>

            <Modal show={showItemForm} onHide={() => setShowItemForm(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{editingItem ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormItem
                        itemData={editingItem}
                        onCancel={() => setShowItemForm(false)}
                        onSubmit={(data) => {
                            console.log(editingItem ? "Update item:" : "Create item:", data);
                            if(editingItem){
                                handleItemUpdate(data);
                            }else{
                                handleItemCreate(data);
                            }
                            // Bỏ setShowItemForm(false) ở đây vì nó sẽ chạy trước khi API hoàn thành
                        }}
                    />
                </Modal.Body>
            </Modal>

            <ShopOrdersModal 
                show={showOrdersModal} 
                onHide={() => setShowOrdersModal(false)} 
                shopId={state.data.id} 
            />

            {/* Modal xác nhận xóa sản phẩm */}
            <Modal show={show} onHide={() => { setShow(false); setDeletingItem(null); }} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xóa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa sản phẩm <strong>{deletingItem?.name}</strong>? Hành động này không thể hoàn tác.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShow(false); setDeletingItem(null); }}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Đồng ý xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
        </>
    );
}