import classNames from "classnames/bind";

import styles from './User.module.scss'
import Button from '../../components/Button'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import {useSelector} from 'react-redux'

const cx = classNames.bind(styles)

const payment_methods = [
    {
        display:'Chuyển khoản',
        image:'https://phongtro123.com/images/bank-transfer.png',
    },
    {
        display:'Thẻ ATM Internet Banking',
        image:'https://phongtro123.com/images/payment-method.svg',
    },
    {
        display:'Thẻ tín dụng quốc tế',
        image:'https://phongtro123.com/images/credit-card.png',
    },
    {
        display:'MOMO',
        image:'https://phongtro123.com/images/momo.png',
    },
    {
        display:'ZaloPay',
        image:'https://phongtro123.com/images/zalopay.png',
    },
    {
        display:'ShopeePay',
        image:'https://phongtro123.com/images/shopeepay2.svg',
    },
    {
        display:'Điển giao dịch, cửa hàng tiện lợi',
        image:'https://phongtro123.com/images/online-store.svg',
    },
    {
        display:'Quét mã QRCode',
        image:'https://phongtro123.com/images/qr-code.png',
    },
]


function Reaharge() {

    const user = useSelector(state => state.auth.currentUser)

    return ( 
        <div className={cx('reaharge')}>
            <h2 className={cx('section__title')}>Nạp tiền vào tài khoản</h2>
            <div className={cx('reaharge__content')}>
                <div className={cx('reaharge__content__left')}>
                    <h2 className={cx('reaharge__content__left__title')}>Mời bạn phương thức thanh toán</h2>
                    <div className={cx('reaharge__content__left__content')}>
                        {
                            payment_methods.map((item,index) => {
                                return (
                                    <div className={cx('reaharge__content__left__content__item')} key={index}>
                                        <div className={cx('reaharge__content__left__content__item__img')}>
                                            <img src={item.image}/>
                                        </div>
                                        <p>{item.display}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className={cx('reaharge__content__right')}>
                    <div className={cx('your__money')}>
                        <p>Số dư tài khoản</p>
                        <span>0đ</span>
                    </div>
                    <Button className={cx('reaharge__content__right__item')} iconRight={faChevronRight} to={`/user/${user._id}/lich-su-nap-tien`}>Lịch sử nạp tiền</Button>
                    <Button className={cx('reaharge__content__right__item')} iconRight={faChevronRight}>Lịch sử thanh toán</Button>
                    <Button className={cx('reaharge__content__right__item')} iconRight={faChevronRight} to='/bang-gia-dich-vu'>Bảng giá dịch vụ</Button>
                </div>
            </div>
        </div>
     );
}

export default Reaharge;