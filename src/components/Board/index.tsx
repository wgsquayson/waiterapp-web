import { useState } from 'react';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { Container, OrdersContainer, Centered } from './styles';
import { api } from '../../utils/api';
import { toast } from 'react-toastify';

type BoardProps = {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onOrderStatusChange: (orderId: string, status: Order['status']) => void;
}

function OrdersSection({
  orders,
  onCancelOrder,
  onOrderStatusChange

}: Pick<BoardProps, 'orders' | 'onCancelOrder' | 'onOrderStatusChange'>) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    return () => {
      setSelectedOrder(order);
      setIsModalVisible(true);
    };
  }

  function handleCloseModal() {
    setIsModalVisible(false);
  }

  async function handleChangeOrderStatus() {
    if (!selectedOrder) return;

    setIsLoading(true);

    const status: Order['status'] = selectedOrder.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    await api.patch(`/orders/${selectedOrder._id}`, { status: status });

    onOrderStatusChange(selectedOrder._id, status);
    setIsLoading(false);
    handleCloseModal();
    toast.success(`O pedido da mesa ${selectedOrder.table} teve o status alterado!`);
  }

  async function handleCancelOrder() {
    if (!selectedOrder) return;

    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder._id}`);

    onCancelOrder(selectedOrder._id);
    setIsLoading(false);
    handleCloseModal();
    toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado!`);
  }

  if (orders.length === 0) {
    return (
      <Centered>
        <span>Não há pedidos</span>
      </Centered>
    );
  }

  return  (
    <>
      <OrderModal
        selectedOrder={selectedOrder}
        visible={isModalVisible}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
        isLoading={isLoading}
      />
      <OrdersContainer>
        {
          orders.map((order) => (
            <button onClick={handleOpenModal(order)} key={order._id} type="button">
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))
        }
      </OrdersContainer>
    </>
  );
}

export function Board({
  icon,
  title,
  orders = [],
  onCancelOrder,
  onOrderStatusChange
}: BoardProps) {
  return (
    <Container>
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>
      <OrdersSection
        orders={orders}
        onCancelOrder={onCancelOrder}
        onOrderStatusChange={onOrderStatusChange}
      />
    </Container>
  );
}
