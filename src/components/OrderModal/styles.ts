import styled from 'styled-components';

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBody = styled.div`
  background-color: #FFF;
  width: 100%;
  max-width: 480px;
  border-radius: 0.5rem;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 1.5rem;
    }

    button {
      line-height: 0;
      border: 0;
      background: transparent;
    }
  }

  .status-container {
    margin-top: 2rem;

    small {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    div {
      margin-top: 0.5rem;
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
  }
`;

export const OrderDetails = styled.div`
  margin-top: 2rem;

  > strong {
    font-weight: 500;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  .order-items {
    margin-top: 1rem;

    .item {
      display: flex;
      gap: 0.75rem;

      img {
        border-radius: 0.375rem;
      }

      & + .item {
        margin-top: 1rem;
      }

      .quantity {
        font-size: 0.9rem;
        color: #666;
      }

      .product-details {
        strong {
          display: block;
          margin-bottom: 0.25rem;
        }

        span {
          font-size: 0.9rem;
          color: #666;
        }
      }
    }
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-top: 1.5rem;

    span {
      font-size: 0.9rem;
      font-weight: 500;
      opacity: 0.8;
    }
  }
`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  gap: .75rem;

  margin-top: 2rem;

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .primary {
    background-color: #333;
    border-radius: 4rem;
    border: 0;
    color: #FFF;
    font-size: 1rem;
    font-weight: 600;
    padding: .75rem 1.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
  }

  .secondary {
    border: none;
    padding: .75rem 1.5rem;
    color: #D73035;
    background-color: transparent;
  }
`;
