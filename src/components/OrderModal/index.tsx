import { Actions, ModalBody, OrderDetails, Overlay } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
import { useEffect } from 'react';

type OrderModalProps = {
  visible: boolean;
  onClose: () => void;
  selectedOrder: Order | null;
  onCancelOrder: () => Promise<void>
  onChangeOrderStatus: () => Promise<void>
  isLoading: boolean;
}

export function OrderModal({
  visible,
  onClose,
  selectedOrder: order,
  onCancelOrder,
  onChangeOrderStatus,
  isLoading
}: OrderModalProps) {
  useEffect(() => {
    const unsubscribe = document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    );

    return unsubscribe;
  }, []);

  if (!(visible && order)) {
    return null;
  }

  function renderOrderStatus() {
    let icon = '';
    let status = '';

    switch (order?.status) {
    case 'IN_PRODUCTION':
      icon = '🧑‍🍳';
      status = 'Em produção';
      break;
    case 'DONE':
      icon = '✅';
      status = 'Pronto!';
      break;
    default:
      icon = '⏱️';
      status = 'Fila de espera';
      break;
    }

    return { icon, status };
  }

  const total = order.products.reduce((acc, { product, quantity }) =>
    acc + (product.price * quantity), 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order?.table}</strong>
          <button onClick={onClose} type='button'>
            <img src={closeIcon} alt='Fechar' />
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>
          <div>
            <span>{renderOrderStatus().icon}</span>
            <strong>{renderOrderStatus().status}</strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {
              order?.products.map(({ _id, product, quantity }) => (
                <div className='item' key={_id}>
                  <img width='56' height='28.51' src={`http://localhost:3001/uploads/${product.imagePath}`} alt={product.name} />
                  <span className="quantity">{quantity}x</span>
                  <div className="product-details">
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.price)}</span>
                  </div>
                </div>
              ))
            }
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        <Actions>
          {
            order.status !== 'DONE' && (
              <button
                className='primary'
                type="button"
                disabled={isLoading}
                onClick={onChangeOrderStatus}
              >
                <span>{order.status ==='WAITING' ? '🧑‍🍳' : '✅'}</span>
                <span>{order.status ==='WAITING' ? 'Iniciar produção' : 'Finalizar pedido'}</span>
              </button>
            )
          }
          <button
            className='secondary'
            type="button"
            onClick={onCancelOrder}
            disabled={isLoading}
          >
            <strong>{order.status === 'DONE' ? 'Apagar pedido' : 'Cancelar pedido'}</strong>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
