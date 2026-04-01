'use client';

import { useRsvpForm } from '@/presentation/hooks/use-rsvp-form';
import styles from './rsvp.module.css';

export function Rsvp() {
    const { form, errors, submitting, submitted, updateField, handleSubmit } = useRsvpForm();

    if (submitted) {
        return (
            <div className="container">
                <h2 className="section-title">Xác Nhận Tham Dự</h2>
                <div className={styles.rsvp}>
                    <div className={styles.success}>
                        <div className={styles.successIcon}>✓</div>
                        <h3 className={styles.successTitle}>Cảm ơn bạn!</h3>
                        <p className={styles.successText}>Chúng tôi đã nhận được xác nhận của bạn.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h2 className="section-title">Xác Nhận Tham Dự</h2>
            <p className="section-subtitle">Xin hãy xác nhận sự hiện diện của bạn</p>
            <div className={styles.rsvp}>
                <form
                    className={styles.form}
                    noValidate
                    onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
                >
                    {/* Name + Phone */}
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label className={styles.label}>Họ và tên *</label>
                            <input
                                className={styles.input}
                                type="text"
                                value={form.name}
                                onChange={(e) => updateField('name', e.target.value)}
                                required
                            />
                            {errors.name && <span className={styles.error}>{errors.name}</span>}
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label}>Số điện thoại *</label>
                            <input
                                className={styles.input}
                                type="tel"
                                value={form.phone}
                                onChange={(e) => updateField('phone', e.target.value)}
                                required
                            />
                            {errors.phone && <span className={styles.error}>{errors.phone}</span>}
                        </div>
                    </div>

                    {/* Attendance */}
                    <div className={styles.row}>
                        <div className={`${styles.field} ${styles.fieldFull}`}>
                            <label className={styles.label}>Bạn sẽ tham dự chứ?</label>
                            <div className={styles.toggle}>
                                {[
                                    { value: true, label: 'Có, tôi sẽ tham dự' },
                                    { value: false, label: 'Tôi bận, rất tiếc không thể tham dự' },
                                ].map(({ value, label }) => (
                                    <label key={String(value)} className={styles.radio}>
                                        <input
                                            className={styles.radioInput}
                                            type="radio"
                                            name="attendance"
                                            checked={form.attending === value}
                                            onChange={() => updateField('attending', value)}
                                        />
                                        <span className={styles.radioLabel}>{label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Location — only when attending */}
                    {form.attending && (
                        <div className={styles.row}>
                            <div className={`${styles.field} ${styles.fieldFull}`}>
                                <label className={styles.label}>Tham dự tại</label>
                                <div className={styles.toggle}>
                                    {[
                                        { value: 'groom', label: 'Nhà trai' },
                                        { value: 'bride', label: 'Nhà gái' },
                                        { value: 'both', label: 'Cả hai' },
                                    ].map(({ value, label }) => (
                                        <label key={value} className={styles.radio}>
                                            <input
                                                className={styles.radioInput}
                                                type="radio"
                                                name="location"
                                                checked={form.location === value}
                                                onChange={() => updateField('location', value)}
                                            />
                                            <span className={styles.radioLabel}>{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Guests + Dietary — only when attending */}
                    {form.attending && (
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label}>Số khách</label>
                                <select
                                    className={`${styles.input} ${styles.select}`}
                                    value={form.guests}
                                    onChange={(e) => updateField('guests', parseInt(e.target.value))}
                                >
                                    {[1,2,3,4,5,6,7,8,9,10].map((n) => (
                                        <option key={n} value={n}>{n}</option>
                                    ))}
                                </select>
                                {errors.guests && <span className={styles.error}>{errors.guests}</span>}
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label}>Ghi chú</label>
                                <input
                                    className={styles.input}
                                    type="text"
                                    placeholder="Dị ứng, ăn chay..."
                                    value={form.dietary}
                                    onChange={(e) => updateField('dietary', e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {errors.form && <span className={styles.error}>{errors.form}</span>}

                    <button className={styles.submit} type="submit" disabled={submitting}>
                        {submitting ? 'Đang gửi...' : 'Xác Nhận Tham Dự'}
                    </button>
                </form>
            </div>
        </div>
    );
}
