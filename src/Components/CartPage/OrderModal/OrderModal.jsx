import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../../const';
import s from './OrderModal.module.scss';
import { clearCart } from '../../../Features/cartSlice';

export const OrderModal = () => {
  const {
    order: {
      order: { values, order, id, totalPrice },
    },
    goods: { goodList },
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(clearCart());
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div className={s.modal} onClick={handleCloseModal}>
      <div className={s.body} onClick={handleModalClick}>
        <h2 className={s.title}>Заказ оформлен №{id}</h2>
        <div className={s.description}>
          <p>Спасибо за выбор нашего магазина!</p>
          <p>Здесь вы можете посмотреть все детали вашего заказа</p>
        </div>

        <ul className={s.customer}>
          <li className={s.customerItem}>
            <span className={s.customerTitle}>Получатель</span>
            <span className={s.customerData}>{values.fio}</span>
          </li>
          {order.delivery === 'delivery' && (
            <li className={s.customerItem}>
              <span className={s.customerTitle}>Адрес доставки</span>
              <span className={s.customerData}>{values.address}</span>
            </li>
          )}
          <li className={s.customerItem}>
            <span className={s.customerTitle}>Телефон</span>
            <span className={s.customerData}>{values.phone}</span>
          </li>
          <li className={s.customerItem}>
            <span className={s.customerTitle}>E-mail</span>
            <span className={s.customerData}>{values.email}</span>
          </li>
          <li className={s.customerItem}>
            <span className={s.customerTitle}>Способ получения</span>
            <span className={s.customerData}>
              {values.delivery === 'delivery' ? 'Доставка' : 'Самовывоз'}
            </span>
          </li>
        </ul>

        <ul className={s.goods}>
          {order.map((item) => {
            const product = goodList.find((product) => product.id === item.id);
            return (
              <li
                className={s.goodsItem}
                key={`${item.id}${item.color}${item.size}`}>
                <img
                  className={s.goodsImg}
                  src={`${API_URL}${product.pic}`}
                  alt={product.title}
                />
                <p className={s.goodsCount}>X{item.count}</p>
              </li>
            );
          })}
        </ul>
        <div className={s.total}>
          <p>Итого:</p>
          <p>{totalPrice} tenge</p>
        </div>
        <button className={s.close} onClick={handleCloseModal}></button>
      </div>
    </div>
  );
};