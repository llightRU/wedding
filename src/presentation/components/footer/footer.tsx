import { wedding } from '@/domain/models/wedding';
import { asset } from '@/utils/base-path';
import styles from './footer.module.css';

export function Footer() {
    return (
        <div className={`container ${styles.footer}`}>
            <div className={styles.ornament}>&#10086;</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/assets/images/thankyou.webp')} alt="Thank you" className={styles.thankyouImg} />

            <p className={styles.giftTitle}>Mừng Cưới</p>
            <p className={styles.giftSubtitle}>Sự hiện diện của bạn là món quà quý giá nhất</p>
            <div className={styles.qrGrid}>
                <div className={styles.qrCard}>
                    <span className={styles.qrRole}>Chú Rể</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset('/assets/images/qr_quang.jfif')} alt={`QR ${wedding.groom}`} className={styles.qrImg} />
                    <span className={styles.qrName}>{wedding.groom}</span>
                </div>
                <div className={styles.qrCard}>
                    <span className={styles.qrRole}>Cô Dâu</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset('/assets/images/qr_nhung.jfif')} alt={`QR ${wedding.bride}`} className={styles.qrImg} />
                    <span className={styles.qrName}>{wedding.bride}</span>
                </div>
            </div>

            <p className={styles.date}>07 . 04 . 2026</p>
            <p className={styles.thanks}>Cảm ơn bạn đã đến chung vui cùng chúng tôi</p>
            <p className={styles.credit}>Made with &#9829;</p>
        </div>
    );
}
