import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Pic from '../assets/Images/pic.jpg';

export default function Home() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };
  const clickHandler = () => {
    if (name === '123456' && password === '123456') {
      localStorage.setItem('userAcepted', true);
      router.push('/adminPanel');
    } else console.log('نام کاربری یا رمز عبور اشتباه است');
  };

  useEffect(() => {
    localStorage.removeItem('userAcepted');
  });

  return (
    <div className={styles.Main}>
      <div className={styles.Container}>
        <div className={styles.SiteTitle}>
          <p>سامانه پایش ستاد انتخاباتی ...</p>
        </div>
        <div className={styles.Login}>
          <div className={styles.LoginPic}>
            <Image className={styles.Image} src={Pic} alt="pic" width={0} />
          </div>
          <div className={styles.LoginForm}>
            <div className={styles.LoginFormContainer}>
              <div>
                <label className={styles.Label}>نام کاربری</label>
                <input
                  type="text"
                  value={name}
                  className={styles.Input}
                  onChange={nameChangeHandler}
                />
              </div>
              <div>
                <label className={styles.Label}>رمز عبور</label>
                <input
                  type="text"
                  value={password}
                  className={styles.Input}
                  onChange={passwordChangeHandler}
                />
              </div>
              <div>
                <button className={styles.Button} onClick={clickHandler}>
                  ورود
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
